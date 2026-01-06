#!/bin/bash

# BigQuery Load Script
# Loads GCS bucket folders into BigQuery tables with schema autodetection
# Always does a full rebuild - drops and recreates all tables

set -uo pipefail
# Note: not using -e so script continues even if individual tables fail

# Configuration
PROJECT_ID="mixpanel-gtm-training"
DATASET="ak_cap_test" #CHANGE THIS TO YOURS
BUCKET="gs://se-capstone-2026"

# Parse command line arguments
DELETE_ONLY=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --delete)
            DELETE_ONLY=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --delete    Delete all tables in the dataset (does not load)"
            echo "  -h, --help  Show this help message"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Function to delete all tables in the dataset
delete_all_tables() {
    echo "Deleting all tables in ${PROJECT_ID}:${DATASET}..."

    tables=$(bq ls --project_id="${PROJECT_ID}" "${DATASET}" 2>/dev/null | tail -n +3 | awk '{print $1}')

    if [[ -z "$tables" ]]; then
        echo "No tables found in dataset."
        return 0
    fi

    for table in $tables; do
        echo "Deleting ${DATASET}.${table}..."
        bq rm -f -t "${PROJECT_ID}:${DATASET}.${table}"
    done

    echo "✓ All tables deleted."
}

# Handle --delete flag
if [ "$DELETE_ONLY" = true ]; then
    delete_all_tables
    exit 0
fi

# Ensure dataset exists
echo "Ensuring dataset ${DATASET} exists..."
bq --project_id="${PROJECT_ID}" mk --dataset --location=US "${DATASET}" 2>/dev/null || echo "Dataset already exists"

# Function to detect file format and load data
load_table() {
    local gcs_path=$1
    local table_name=$2

    echo "----------------------------------------"
    echo "Loading ${table_name} from ${gcs_path}"

    # Detect source format by probing actual files in GCS (skip folder entries)
    local sample_file
    sample_file=$(gsutil ls "${gcs_path}" 2>/dev/null | grep -v '/$' | head -1)
    local source_format
    local max_bad=0

    if [[ $sample_file == *.parquet ]]; then
        source_format="PARQUET"
    elif [[ $sample_file == *.json.gz ]] || [[ $sample_file == *.json ]]; then
        source_format="NEWLINE_DELIMITED_JSON"
        max_bad=100000
    elif [[ $sample_file == *.csv ]] || [[ $sample_file == *.tab ]]; then
        source_format="CSV"
        max_bad=100000
    else
        source_format="NEWLINE_DELIMITED_JSON"
        max_bad=100000
    fi

    echo "Detected format: ${source_format} (from ${sample_file##*/})"

    # Drop table first for clean rebuild
    echo "Dropping table if exists: ${DATASET}.${table_name}"
    bq rm -f -t "${PROJECT_ID}:${DATASET}.${table_name}" 2>/dev/null || true

    bq load \
        --project_id="${PROJECT_ID}" \
        --source_format="${source_format}" \
        --autodetect \
        --max_bad_records="${max_bad}" \
        --replace \
        "${DATASET}.${table_name}" \
        "${gcs_path}"

    if [ $? -eq 0 ]; then
        echo "✓ Successfully loaded ${table_name}"
    else
        echo "✗ Failed to load ${table_name}"
        return 1
    fi
}

# Function to load multiple tables from a folder where each unique entity is a separate table
# Extracts table name from file pattern like: ic5-capstone-ADSPEND-part-1.parquet -> ADSPEND
load_folder_by_entity() {
    local gcs_folder=$1
    local table_prefix=$2

    echo ""
    echo "========================================"
    echo "Scanning ${gcs_folder} for entities..."
    echo "========================================"

    # Get all files and extract unique entity names
    local entities
    entities=$(gsutil ls "${gcs_folder}" 2>/dev/null | grep -v '/$' | while read -r file; do
        # Extract just the filename
        filename=$(basename "$file")
        # Remove extension(s)
        name="${filename%.gz}"
        name="${name%.json}"
        name="${name%.csv}"
        name="${name%.parquet}"
        name="${name%.tab}"
        # Extract the entity name (between prefix and -part or -LOOKUP or -GROUPS or -SCD)
        # Pattern: prefix-capstone-ENTITY-suffix or just ENTITY.ext
        if [[ $name =~ -([A-Za-z0-9_]+(-SCD)?)-part ]]; then
            echo "${BASH_REMATCH[1]}"
        elif [[ $name =~ -([A-Za-z0-9_]+)-LOOKUP ]]; then
            echo "${BASH_REMATCH[1]}"
        elif [[ $name =~ -([A-Za-z0-9_]+)-GROUPS ]]; then
            echo "${BASH_REMATCH[1]}"
        else
            # Simple filename like product_id.csv
            echo "$name"
        fi
    done | sort -u)

    # Load each entity as its own table
    for entity in $entities; do
        # Clean entity name for table (replace - with _)
        clean_entity=$(echo "$entity" | tr '-' '_')
        table_name="${table_prefix}_${clean_entity}"

        # Build glob pattern to match this entity's files
        # Try different patterns
        local pattern=""
        local sample_file

        # Check which pattern matches
        sample_file=$(gsutil ls "${gcs_folder}*${entity}*" 2>/dev/null | grep -v '/$' | head -1)
        if [[ -n "$sample_file" ]]; then
            pattern="${gcs_folder}*${entity}*"
        fi

        if [[ -n "$pattern" ]]; then
            load_table "$pattern" "$table_name"
        else
            echo "Warning: Could not find files for entity ${entity}"
        fi
    done
}

# Load each folder into corresponding table
echo "Starting BigQuery load jobs (full rebuild)..."
echo "Project: ${PROJECT_ID}"
echo "Dataset: ${DATASET}"
echo ""

# IC3 - events and users are single tables, lookups split by entity
load_table "${BUCKET}/ic3/events/*" "ic3_events"
load_folder_by_entity "${BUCKET}/ic3/lookups/" "ic3_lookups"
load_table "${BUCKET}/ic3/users/*" "ic3_users"

# IC4 - events/sessions/users are single tables, dimensions and lookups split by entity
load_folder_by_entity "${BUCKET}/ic4/dimensions/" "ic4_dimensions"
load_table "${BUCKET}/ic4/events/*" "ic4_events"
load_folder_by_entity "${BUCKET}/ic4/lookups/" "ic4_lookups"
load_table "${BUCKET}/ic4/sessions/*" "ic4_sessions"
load_table "${BUCKET}/ic4/users/*" "ic4_users"

# IC5 - events/sessions/users are single tables, dimensions/groups/lookups split by entity
load_folder_by_entity "${BUCKET}/ic5/dimensions/" "ic5_dimensions"
load_table "${BUCKET}/ic5/events/*" "ic5_events"
load_folder_by_entity "${BUCKET}/ic5/groups/" "ic5_groups"
load_folder_by_entity "${BUCKET}/ic5/lookups/" "ic5_lookups"
load_table "${BUCKET}/ic5/sessions/*" "ic5_sessions"
load_table "${BUCKET}/ic5/users/*" "ic5_users"

# Vendors - Adobe
load_table "${BUCKET}/vendors/adobe/events/*" "vendors_adobe_events"
load_table "${BUCKET}/vendors/adobe/lookups/*" "vendors_adobe_lookups"

# Vendors - Amplitude
load_table "${BUCKET}/vendors/amplitude/*" "vendors_amplitude"

# Vendors - GA4
load_table "${BUCKET}/vendors/ga4/*" "vendors_ga4"

# Vendors - PostHog
load_table "${BUCKET}/vendors/posthog/events/*" "vendors_posthog_events"

echo ""
echo "========================================="
echo "Load jobs completed!"
echo "========================================="
echo ""
echo "To verify, run:"
echo "  bq ls ${PROJECT_ID}:${DATASET}"
