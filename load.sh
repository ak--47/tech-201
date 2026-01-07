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
LOAD_IC3=false
LOAD_IC4=false
LOAD_IC5=false
LOAD_VENDOR=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --delete)
            DELETE_ONLY=true
            shift
            ;;
        --ic3)
            LOAD_IC3=true
            shift
            ;;
        --ic4)
            LOAD_IC4=true
            shift
            ;;
        --ic5)
            LOAD_IC5=true
            shift
            ;;
        --vendor)
            LOAD_VENDOR=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --ic3       Load only IC3 tables"
            echo "  --ic4       Load only IC4 tables"
            echo "  --ic5       Load only IC5 tables"
            echo "  --vendor    Load only vendor tables"
            echo "  --delete    Delete all tables in the dataset (does not load)"
            echo "  -h, --help  Show this help message"
            echo ""
            echo "If no dataset flags are specified, all datasets are loaded."
            echo "Multiple flags can be combined: ./load.sh --ic3 --ic5"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# If no dataset flags specified, load all
if [[ "$LOAD_IC3" == "false" && "$LOAD_IC4" == "false" && "$LOAD_IC5" == "false" && "$LOAD_VENDOR" == "false" ]]; then
    LOAD_IC3=true
    LOAD_IC4=true
    LOAD_IC5=true
    LOAD_VENDOR=true
fi

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

# Function to load raw data as a single string column (for messy vendor data)
# Each line becomes one row with a single 'data' column
load_raw() {
    local gcs_path=$1
    local table_name=$2

    echo "----------------------------------------"
    echo "Loading ${table_name} (raw) from ${gcs_path}"

    # Drop table first for clean rebuild
    bq rm -f -t "${PROJECT_ID}:${DATASET}.${table_name}" 2>/dev/null || true

    bq load \
        --project_id="${PROJECT_ID}" \
        --source_format=CSV \
        --field_delimiter=$'\x01' \
        --quote="" \
        --schema="data:STRING" \
        --max_bad_records=100000 \
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

# Function to load a table from GCS
# Args: gcs_path, table_name, source_format (optional, auto-detected if not provided)
load_table() {
    local gcs_path=$1
    local table_name=$2
    local source_format=${3:-""}

    echo "----------------------------------------"
    echo "Loading ${table_name} from ${gcs_path}"

    # Auto-detect format if not provided
    if [[ -z "$source_format" ]]; then
        if [[ $gcs_path == *.parquet* ]] || [[ $gcs_path == *parquet* ]]; then
            source_format="PARQUET"
        elif [[ $gcs_path == *.json* ]]; then
            source_format="NEWLINE_DELIMITED_JSON"
        elif [[ $gcs_path == *.csv* ]]; then
            source_format="CSV"
        else
            # Probe the first file
            local sample_file
            sample_file=$(gsutil ls "${gcs_path}" 2>/dev/null | grep -v '/$' | head -1)
            if [[ $sample_file == *.parquet ]]; then
                source_format="PARQUET"
            elif [[ $sample_file == *.json.gz ]] || [[ $sample_file == *.json ]]; then
                source_format="NEWLINE_DELIMITED_JSON"
            elif [[ $sample_file == *.csv ]]; then
                source_format="CSV"
            else
                source_format="NEWLINE_DELIMITED_JSON"
            fi
        fi
    fi

    local max_bad=0
    if [[ "$source_format" != "PARQUET" ]]; then
        max_bad=100000
    fi

    echo "Format: ${source_format}, max_bad_records: ${max_bad}"

    # Drop table first for clean rebuild
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

# Load each folder into corresponding table
echo "Starting BigQuery load jobs (full rebuild)..."
echo "Project: ${PROJECT_ID}"
echo "Dataset: ${DATASET}"
echo ""

# ============================================
# IC3
# ============================================
if [[ "$LOAD_IC3" == "true" ]]; then
    echo ""
    echo "========================================"
    echo "Loading IC3 tables..."
    echo "========================================"

    load_table "${BUCKET}/ic3/events/*" "ic3_events"
    load_table "${BUCKET}/ic3/users/*" "ic3_users"

    # IC3 lookups - single file
    load_table "${BUCKET}/ic3/lookups/ic3-capstone-luckyNumber-LOOKUP-part-*.csv" "ic3_lookups_luckyNumber" "CSV"
fi

# ============================================
# IC4
# ============================================
if [[ "$LOAD_IC4" == "true" ]]; then
    echo ""
    echo "========================================"
    echo "Loading IC4 tables..."
    echo "========================================"

    load_table "${BUCKET}/ic4/events/*" "ic4_events"
    load_table "${BUCKET}/ic4/sessions/*" "ic4_sessions"
    load_table "${BUCKET}/ic4/users/*" "ic4_users"

    # IC4 dimensions - each entity separate
    load_table "${BUCKET}/ic4/dimensions/ic4-capstone-ADSPEND-part-*.json.gz" "ic4_dimensions_ADSPEND" "NEWLINE_DELIMITED_JSON"
    load_table "${BUCKET}/ic4/dimensions/ic4-capstone-NPS-SCD-part-*.json.gz" "ic4_dimensions_NPS_SCD" "NEWLINE_DELIMITED_JSON"
    load_table "${BUCKET}/ic4/dimensions/ic4-capstone-role-SCD-part-*.json.gz" "ic4_dimensions_role_SCD" "NEWLINE_DELIMITED_JSON"

    # IC4 lookups - simple filenames
    load_table "${BUCKET}/ic4/lookups/product_id.csv" "ic4_lookups_product_id" "CSV"
    load_table "${BUCKET}/ic4/lookups/video_id.csv" "ic4_lookups_video_id" "CSV"
fi

# ============================================
# IC5
# ============================================
if [[ "$LOAD_IC5" == "true" ]]; then
    echo ""
    echo "========================================"
    echo "Loading IC5 tables..."
    echo "========================================"

    load_table "${BUCKET}/ic5/events/*" "ic5_events"
    load_table "${BUCKET}/ic5/sessions/*" "ic5_sessions"
    load_table "${BUCKET}/ic5/users/*" "ic5_users"

    # IC5 dimensions - each entity separate
    load_table "${BUCKET}/ic5/dimensions/ic5-capstone-ADSPEND-part-*.parquet" "ic5_dimensions_ADSPEND" "PARQUET"
    load_table "${BUCKET}/ic5/dimensions/ic5-capstone-AccountHealthScore-SCD-part-*.parquet" "ic5_dimensions_AccountHealthScore_SCD" "PARQUET"
    load_table "${BUCKET}/ic5/dimensions/ic5-capstone-MRR-SCD-part-*.parquet" "ic5_dimensions_MRR_SCD" "PARQUET"
    load_table "${BUCKET}/ic5/dimensions/ic5-capstone-NPS-SCD-part-*.parquet" "ic5_dimensions_NPS_SCD" "PARQUET"
    load_table "${BUCKET}/ic5/dimensions/ic5-capstone-plan-SCD-part-*.parquet" "ic5_dimensions_plan_SCD" "PARQUET"
    load_table "${BUCKET}/ic5/dimensions/ic5-capstone-role-SCD-part-*.parquet" "ic5_dimensions_role_SCD" "PARQUET"

    # IC5 groups - each entity separate
    load_table "${BUCKET}/ic5/groups/ic5-capstone-company_id-GROUPS-part-*.parquet" "ic5_groups_company_id" "PARQUET"
    load_table "${BUCKET}/ic5/groups/ic5-capstone-room_id-GROUPS-part-*.parquet" "ic5_groups_room_id" "PARQUET"

    # IC5 lookups - each entity separate (video_id has multiple parts)
    load_table "${BUCKET}/ic5/lookups/ic5-capstone-product_id-LOOKUP-part-*.csv" "ic5_lookups_product_id" "CSV"
    load_table "${BUCKET}/ic5/lookups/ic5-capstone-video_id-LOOKUP-part-*.csv" "ic5_lookups_video_id" "CSV"
fi

# ============================================
# Vendors (loaded as raw single-column for flexibility)
# ============================================
if [[ "$LOAD_VENDOR" == "true" ]]; then
    echo ""
    echo "========================================"
    echo "Loading Vendor tables (raw)..."
    echo "========================================"

    load_raw "${BUCKET}/vendors/adobe/raw/*" "vendors_adobe_raw"
    load_raw "${BUCKET}/vendors/adobe/lookups/*" "vendors_adobe_lookups"
    load_raw "${BUCKET}/vendors/amplitude/*" "vendors_amplitude"
    load_raw "${BUCKET}/vendors/ga4/*" "vendors_ga4"
    # PostHog is parquet with stable schema, use normal load
    load_table "${BUCKET}/vendors/posthog/events/*" "vendors_posthog_events" "PARQUET"
fi

echo ""
echo "========================================="
echo "Load jobs completed!"
echo "========================================="
echo ""
echo "To verify, run:"
echo "  bq ls ${PROJECT_ID}:${DATASET}"
