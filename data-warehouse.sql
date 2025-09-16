-- =====================================================================
-- SNIPPET 01 — BOOTSTRAP: dataset + base data
-- Author: AK  |  Mode: BigQuery Standard SQL
-- 🧪 CUSTOMIZE: Set your project and dataset below, then find/replace throughout
-- =====================================================================

-- ⚙️ PROJECT & DATASET CONFIGURATION
--
-- TO CUSTOMIZE FOR YOUR PROJECT:
-- 1. Find/Replace 'mixpanel-gtm-training' → 'your-project-id'
-- 2. Find/Replace 'sandbox_ak' → 'your_dataset_name'
-- 3. Update the session variables below to match
--
-- Option 1: Set session variables (BigQuery Console/Colab)
SET @@dataset_project_id = 'mixpanel-gtm-training';
SET @@dataset_id = 'sandbox_ak';

-- Option 2: Declare variables (for scripting - uncomment if needed)
-- DECLARE project_id STRING DEFAULT 'mixpanel-gtm-training';
-- DECLARE dataset_id STRING DEFAULT 'sandbox_ak';

-- 0) Ensure your sandbox dataset exists (US multi‑region by default)
CREATE SCHEMA IF NOT EXISTS `mixpanel-gtm-training.sandbox_ak`
OPTIONS(default_table_expiration_days=30);

-- 1) Customers (small dimension)
CREATE OR REPLACE TABLE `mixpanel-gtm-training.sandbox_ak.customers` AS
SELECT * FROM UNNEST([
  STRUCT(1 AS customer_id, 'Alice'   AS name, DATE '2024-01-05' AS signup_date, 'US' AS country),
  STRUCT(2 AS customer_id, 'Bob'     AS name, DATE '2024-02-10' AS signup_date, 'CA' AS country),
  STRUCT(3 AS customer_id, 'Charlie' AS name, DATE '2024-02-15' AS signup_date, 'US' AS country),
  STRUCT(4 AS customer_id, 'Diana'   AS name, DATE '2024-03-01' AS signup_date, 'GB' AS country),
  STRUCT(5 AS customer_id, 'Eve'     AS name, DATE '2024-03-20' AS signup_date, 'US' AS country)
]);

-- 2) Orders (fact table, flat)
CREATE OR REPLACE TABLE `mixpanel-gtm-training.sandbox_ak.orders` AS
SELECT * FROM UNNEST([
  STRUCT(101 AS order_id, 1 AS customer_id, TIMESTAMP '2024-03-10 10:00:00+00' AS order_ts, NUMERIC '120.50' AS amount, 'paid'     AS status),
  STRUCT(102 AS order_id, 2 AS customer_id, TIMESTAMP '2024-03-11 14:20:00+00' AS order_ts, NUMERIC ' 45.00' AS amount, 'paid'     AS status),
  STRUCT(103 AS order_id, 1 AS customer_id, TIMESTAMP '2024-03-12 18:05:00+00' AS order_ts, NUMERIC '200.00' AS amount, 'refunded' AS status),
  STRUCT(104 AS order_id, 3 AS customer_id, TIMESTAMP '2024-03-12 19:30:00+00' AS order_ts, NUMERIC ' 75.25' AS amount, 'paid'     AS status),
  STRUCT(105 AS order_id, 4 AS customer_id, TIMESTAMP '2024-03-13 09:10:00+00' AS order_ts, NUMERIC ' 18.00' AS amount, 'paid'     AS status),
  STRUCT(106 AS order_id, 5 AS customer_id, TIMESTAMP '2024-03-14 16:00:00+00' AS order_ts, NUMERIC '305.99' AS amount, 'paid'     AS status),
  STRUCT(107 AS order_id, 5 AS customer_id, TIMESTAMP '2024-03-15 10:35:00+00' AS order_ts, NUMERIC ' 99.00' AS amount, 'canceled' AS status)
]);

-- 3) Orders with nested line items (ARRAY<STRUCT>)
-- This demonstrates BigQuery's native support for nested/repeated data structures
CREATE OR REPLACE TABLE `mixpanel-gtm-training.sandbox_ak.orders_nested` AS
SELECT * FROM UNNEST([
  STRUCT(201 AS order_id, 1 AS customer_id, TIMESTAMP '2024-03-10 10:00:00+00' AS order_ts,
         [STRUCT('Widget' AS product, 2 AS qty, NUMERIC '9.99'   AS price),
          STRUCT('Cable'  AS product, 1 AS qty, NUMERIC '3.50'   AS price)] AS items),
  STRUCT(202 AS order_id, 3 AS customer_id, TIMESTAMP '2024-03-12 19:30:00+00' AS order_ts,
         [STRUCT('Mouse'  AS product, 1 AS qty, NUMERIC '15.00'  AS price)] AS items),
  STRUCT(203 AS order_id, 5 AS customer_id, TIMESTAMP '2024-03-14 16:00:00+00' AS order_ts,
         [STRUCT('Laptop' AS product, 1 AS qty, NUMERIC '299.99' AS price),
          STRUCT('Stand'  AS product, 1 AS qty, NUMERIC '29.99'  AS price)] AS items)
]);

-- 4) JSON events (semi-structured)
-- Raw JSON stored as STRING - common pattern for flexible schema evolution
CREATE OR REPLACE TABLE `mixpanel-gtm-training.sandbox_ak.json_events` (j STRING);
INSERT INTO `mixpanel-gtm-training.sandbox_ak.json_events` (j) VALUES
('{"user_id":1,"attrs":{"plan":"pro"},"items":[{"sku":"A","qty":2},{"sku":"B","qty":1}]}'),
('{"user_id":2,"attrs":{"plan":"free"},"items":[{"sku":"A","qty":1}]}'),
('{"user_id":3,"attrs":{"plan":"pro"},"items":[{"sku":"C","qty":5},{"sku":"A","qty":2}]}');

-- Friendly banner
SELECT '✅ Bootstrap complete: mixpanel-gtm-training.sandbox_ak.customers, orders, orders_nested, json_events' AS status;
-- TODO: WISDOM: Make bootstraps idempotent (CREATE OR REPLACE) so everyone can safely reset.


-- =======================================================
-- SNIPPET 02 — Projection, filtering, labeling, SAFE_CAST
-- =======================================================

CREATE SCHEMA IF NOT EXISTS `mixpanel-gtm-training.sandbox_ak`;

-- Basic projection
SELECT customer_id, name, signup_date
FROM `mixpanel-gtm-training.sandbox_ak.customers`
ORDER BY customer_id;

-- Label financial impact with CASE
SELECT
  order_id, customer_id, amount, status,
  CASE
    WHEN status = 'paid'     THEN '✅ revenue'
    WHEN status = 'refunded' THEN '↩️ negative'
    WHEN status = 'canceled' THEN '🚫 zero'
    ELSE '❓ review'
  END AS financial_label
FROM `mixpanel-gtm-training.sandbox_ak.orders`
WHERE amount >= 50
ORDER BY order_ts;

-- SAFE_CAST pattern (defensive analytics)
-- Returns NULL instead of erroring on bad casts - essential for dirty data
WITH dirty AS (
  SELECT '19.99' AS amt UNION ALL SELECT 'oops' UNION ALL SELECT NULL
)
SELECT amt, SAFE_CAST(amt AS NUMERIC) AS amt_num
FROM dirty;

-- TODO: WISDOM: Validate at ingest, defend in queries. SAFE_* prevents brittle pipelines.


-- ======================================
-- SNIPPET 03 — Aggregation & Grouping
-- ======================================

CREATE SCHEMA IF NOT EXISTS `mixpanel-gtm-training.sandbox_ak`;

-- Net revenue by day
SELECT
  DATE(order_ts) AS day,
  SUM(CASE WHEN status='paid' THEN amount
           WHEN status='refunded' THEN -amount
           ELSE 0 END) AS net_revenue
FROM `mixpanel-gtm-training.sandbox_ak.orders`
GROUP BY day
ORDER BY day;

-- Orders & revenue by customer country (join + group)
SELECT
  c.country,
  COUNT(*) AS orders,
  ROUND(SUM(CASE WHEN o.status='paid' THEN o.amount
                 WHEN o.status='refunded' THEN -o.amount
                 ELSE 0 END), 2) AS net_revenue
FROM `mixpanel-gtm-training.sandbox_ak.orders` AS o
JOIN `mixpanel-gtm-training.sandbox_ak.customers` AS c USING (customer_id)
GROUP BY c.country
ORDER BY net_revenue DESC;

-- TODO: WISDOM: Most BI visuals = GROUP BY + aggregate. Model to make these trivial.


-- ============================================
-- SNIPPET 04 — Joins: inner, left, anti (semi)
-- ============================================

CREATE SCHEMA IF NOT EXISTS `mixpanel-gtm-training.sandbox_ak`;

-- Inner join: only rows with matches
SELECT o.order_id, c.name, o.amount
FROM `mixpanel-gtm-training.sandbox_ak.orders` o
JOIN `mixpanel-gtm-training.sandbox_ak.customers` c USING (customer_id)
ORDER BY o.order_id;

-- Left join: keep all customers (nulls = meaningful)
SELECT c.customer_id, c.name, o.order_id, o.amount
FROM `mixpanel-gtm-training.sandbox_ak.customers` c
LEFT JOIN `mixpanel-gtm-training.sandbox_ak.orders` o USING (customer_id)
ORDER BY c.customer_id, o.order_id;

-- Anti-join: customers with NO paid orders
SELECT c.customer_id, c.name
FROM `mixpanel-gtm-training.sandbox_ak.customers` c
LEFT JOIN (
  SELECT DISTINCT customer_id
  FROM `mixpanel-gtm-training.sandbox_ak.orders`
  WHERE status = 'paid'
) p USING (customer_id)
WHERE p.customer_id IS NULL
ORDER BY c.customer_id;

-- TODO: WISDOM: Join type communicates intent: exclude, keep, or only matches.


-- ================================================
-- SNIPPET 05 — Windows: running totals, rank, dedup
-- ================================================

CREATE SCHEMA IF NOT EXISTS `mixpanel-gtm-training.sandbox_ak`;

-- Running net per customer (no row collapse)
-- Window functions let you aggregate without GROUP BY - preserves detail rows
SELECT
  customer_id, order_id, amount, status,
  SUM(CASE WHEN status='paid' THEN amount
           WHEN status='refunded' THEN -amount
           ELSE 0 END)
  OVER (PARTITION BY customer_id ORDER BY order_ts
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_net
FROM `mixpanel-gtm-training.sandbox_ak.orders`
ORDER BY customer_id, order_ts;

-- Rank largest orders
SELECT
  order_id, customer_id, amount,
  RANK() OVER (ORDER BY amount DESC) AS rank_by_amount
FROM `mixpanel-gtm-training.sandbox_ak.orders`
ORDER BY rank_by_amount;

-- Deduplicate by order_id, keeping latest (QUALIFY keeps window logic inline)
WITH noisy AS (
  SELECT * FROM `mixpanel-gtm-training.sandbox_ak.orders`
  UNION ALL
  SELECT 106 AS order_id, 5 AS customer_id, TIMESTAMP '2024-03-14 16:00:00+00' AS order_ts,
         NUMERIC '305.99' AS amount, 'paid' AS status  -- intentional dup
)
SELECT *
FROM noisy
QUALIFY ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY order_ts DESC) = 1;

-- TODO: WISDOM: Windows let you “look around” a row. QUALIFY keeps filters with their windows.



-- ==========================================
-- SNIPPET 06 — Arrays/Structs (UNNEST FTW)
-- ==========================================

CREATE SCHEMA IF NOT EXISTS `mixpanel-gtm-training.sandbox_ak`;

-- Expand line items with UNNEST
-- CROSS JOIN UNNEST flattens arrays into separate rows - key pattern for nested data
SELECT
  o.order_id,
  i.product, i.qty, i.price,
  i.qty * i.price AS line_total
FROM `mixpanel-gtm-training.sandbox_ak.orders_nested` AS o
CROSS JOIN UNNEST(o.items) AS i
ORDER BY o.order_id, i.product;

-- Re-aggregate to order totals (round-trip proof)
WITH line_items AS (
  SELECT o.order_id, i.qty * i.price AS line_total
  FROM `mixpanel-gtm-training.sandbox_ak.orders_nested` o, UNNEST(o.items) i
)
SELECT order_id, ROUND(SUM(line_total), 2) AS recomputed_amount
FROM line_items
GROUP BY order_id
ORDER BY order_id;

-- TODO: WISDOM: Ingest nested → UNNEST to analyze → re-aggregate when needed.


-- =======================================
-- SNIPPET 07 — JSON extraction patterns
-- =======================================

CREATE SCHEMA IF NOT EXISTS `mixpanel-gtm-training.sandbox_ak`;

-- Pull scalars and array elements out of JSON
-- JSON_EXTRACT_SCALAR gets simple values; JSON_EXTRACT_ARRAY gets arrays for UNNEST
WITH exploded AS (
  SELECT
    CAST(JSON_EXTRACT_SCALAR(j, '$.user_id') AS INT64) AS user_id,
    JSON_EXTRACT_SCALAR(j, '$.attrs.plan') AS plan,
    JSON_EXTRACT_ARRAY(j, '$.items') AS items
  FROM `mixpanel-gtm-training.sandbox_ak.json_events`
)
SELECT
  user_id,
  plan,
  JSON_EXTRACT_SCALAR(item, '$.sku') AS sku,
  CAST(JSON_EXTRACT_SCALAR(item, '$.qty') AS INT64) AS qty
FROM exploded, UNNEST(items) AS item
ORDER BY user_id, sku;

-- TODO: WISDOM: JSON buys flexibility. Stabilize shape before high-value BI.


-- ==========================================
-- SNIPPET 08 — Cohorts & calendar grouping
-- ==========================================

CREATE SCHEMA IF NOT EXISTS `mixpanel-gtm-training.sandbox_ak`;

SELECT
  c.customer_id,
  c.name,
  FORMAT_DATE('%Y-%m', c.signup_date) AS cohort_month,
  COUNT(o.order_id) AS orders
FROM `mixpanel-gtm-training.sandbox_ak.customers` c
LEFT JOIN `mixpanel-gtm-training.sandbox_ak.orders` o USING (customer_id)
GROUP BY c.customer_id, c.name, cohort_month
ORDER BY cohort_month, c.customer_id;

-- TODO: WISDOM: Normalize dates early; keep calendar tables handy in real pipelines.


-- ==========================================================
-- SNIPPET 09 — Partitioned + Clustered events table (perma)
-- ==========================================================

CREATE SCHEMA IF NOT EXISTS `mixpanel-gtm-training.sandbox_ak`;

-- Create or replace events table (partitioned by DATE(event_ts), clustered by customer_id)
-- Partitioning by date enables time-based pruning; clustering by customer_id optimizes joins/filters
CREATE OR REPLACE TABLE `mixpanel-gtm-training.sandbox_ak.events_part`
PARTITION BY DATE(event_ts)
CLUSTER BY customer_id AS
WITH ids AS (SELECT * FROM UNNEST(GENERATE_ARRAY(1, 5)) AS customer_id),
days AS (SELECT DATE '2024-03-10' + i AS d FROM UNNEST(GENERATE_ARRAY(0, 14)) AS i)
SELECT
  TIMESTAMP(d + INTERVAL CAST(ROUND(RAND()*86399) AS INT64) SECOND) AS event_ts,
  customer_id,
  IF(RAND() < 0.7, 'view', 'purchase') AS event_type,
  CAST(ROUND(RAND()*100, 2) AS NUMERIC) AS value
FROM ids CROSS JOIN days;

-- Inspect partitions
SELECT partition_id, total_rows
FROM `mixpanel-gtm-training.sandbox_ak`.INFORMATION_SCHEMA.PARTITIONS
WHERE table_name = 'events_part'
ORDER BY partition_id;

-- Pruned query (reads few partitions + leverages clustering)
SELECT DATE(event_ts) AS day, COUNT(*) AS events
FROM `mixpanel-gtm-training.sandbox_ak.events_part`
WHERE DATE(event_ts) BETWEEN DATE '2024-03-12' AND DATE '2024-03-15'
  AND customer_id IN (2,5)
GROUP BY day
ORDER BY day;

-- EXPLAIN to see pruning & join/scan strategy
SELECT *
FROM `mixpanel-gtm-training.sandbox_ak.events_part`
WHERE DATE(event_ts) = DATE '2024-03-13' AND customer_id IN (2,5);

-- TODO: WISDOM: Partition by time; cluster by frequent filters/joins. Pruning saves $ and time.


-- ===============================================
-- SNIPPET 10A — De-dup “latest by key” (QUALIFY)
-- ===============================================

CREATE SCHEMA IF NOT EXISTS `mixpanel-gtm-training.sandbox_ak`;

-- A noisy copy to demonstrate dedup
CREATE OR REPLACE TABLE `mixpanel-gtm-training.sandbox_ak.noisy_orders` AS
SELECT * FROM `mixpanel-gtm-training.sandbox_ak.orders`
UNION ALL
SELECT 106 AS order_id, 5 AS customer_id, TIMESTAMP '2024-03-14 16:00:00+00' AS order_ts,
       NUMERIC '305.99' AS amount, 'paid' AS status;

-- Keep latest row per order_id
SELECT *
FROM `mixpanel-gtm-training.sandbox_ak.noisy_orders`
QUALIFY ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY order_ts DESC) = 1
ORDER BY order_id;

-- TODO: WISDOM: “Latest by key” is row_number + QUALIFY. Pin this pattern to muscle memory.


-- ==================================================
-- SNIPPET 10B — Sessionization by 30‑minute gap
-- ==================================================

CREATE SCHEMA IF NOT EXISTS `mixpanel-gtm-training.sandbox_ak`;

-- Synthetic clickstream
CREATE OR REPLACE TABLE `mixpanel-gtm-training.sandbox_ak.clicks` AS
WITH seq AS (SELECT * FROM UNNEST([1,1,1,2,2,2,3,3]) AS user_id WITH OFFSET pos),
ts AS (
  SELECT
    user_id,
    TIMESTAMP '2024-03-10 09:00:00+00'
      + INTERVAL (pos*CASE WHEN user_id=1 THEN 20 WHEN user_id=2 THEN 10 ELSE 45 END) MINUTE AS ts
  FROM seq
)
SELECT * FROM ts ORDER BY user_id, ts;

-- Mark session starts and roll them up
-- Classic "gaps and islands" problem: LAG finds gaps, cumulative SUM creates session groups
WITH marked AS (
  SELECT
    user_id,
    ts,
    LAG(ts) OVER (PARTITION BY user_id ORDER BY ts) AS prev_ts,
    CASE
      WHEN TIMESTAMP_DIFF(ts, LAG(ts) OVER (PARTITION BY user_id ORDER BY ts), MINUTE) >= 30
           OR LAG(ts) OVER (PARTITION BY user_id ORDER BY ts) IS NULL
      THEN 1 ELSE 0 END AS is_new_session
  FROM `mixpanel-gtm-training.sandbox_ak.clicks`
),
sessioned AS (
  SELECT
    user_id,
    ts,
    SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY ts) AS session_id
  FROM marked
)
SELECT user_id, session_id, MIN(ts) AS session_start, COUNT(*) AS events
FROM sessioned
GROUP BY user_id, session_id
ORDER BY user_id, session_id;

-- TODO: WISDOM: Gaps & islands = LAG + conditional cumulative SUM. 



-- ============================================================
-- SNIPPET 10C — SCD2: close old row, insert new current row
-- ============================================================

CREATE SCHEMA IF NOT EXISTS `mixpanel-gtm-training.sandbox_ak`;

-- Start a fresh SCD2 dimension
CREATE OR REPLACE TABLE `mixpanel-gtm-training.sandbox_ak.dim_customer_scd` (
  customer_id INT64,
  name        STRING,
  country     STRING,
  effective_from DATE,
  effective_to   DATE,
  is_current     BOOL
);

-- Seed as of 2024‑03‑01
INSERT INTO `mixpanel-gtm-training.sandbox_ak.dim_customer_scd`
(customer_id, name, country, effective_from, effective_to, is_current)
VALUES
(1, 'Alice', 'US', DATE '2024-03-01', DATE '9999-12-31', TRUE),
(2, 'Bob',   'CA', DATE '2024-03-01', DATE '9999-12-31', TRUE);

-- Incoming change set on 2024‑03‑10
CREATE OR REPLACE TABLE `mixpanel-gtm-training.sandbox_ak.incoming_changes` AS
SELECT * FROM UNNEST([
  STRUCT(1 AS customer_id, 'Alice'   AS name, 'GB' AS country, DATE '2024-03-10' AS effective_from),
  STRUCT(3 AS customer_id, 'Charlie' AS name, 'US' AS country, DATE '2024-03-10' AS effective_from)
]);

-- Step 1: Close out changed current rows
UPDATE `mixpanel-gtm-training.sandbox_ak.dim_customer_scd` T
SET T.effective_to = DATE_SUB(S.effective_from, INTERVAL 1 DAY), T.is_current = FALSE
FROM `mixpanel-gtm-training.sandbox_ak.incoming_changes` S
WHERE T.customer_id = S.customer_id
  AND T.is_current = TRUE
  AND (T.name != S.name OR T.country != S.country);

-- Step 2: Insert new current rows (new customers OR changed ones)
INSERT INTO `mixpanel-gtm-training.sandbox_ak.dim_customer_scd`
(customer_id, name, country, effective_from, effective_to, is_current)
SELECT
  S.customer_id, S.name, S.country, S.effective_from, DATE '9999-12-31', TRUE
FROM `mixpanel-gtm-training.sandbox_ak.incoming_changes` S
LEFT JOIN `mixpanel-gtm-training.sandbox_ak.dim_customer_scd` T
  ON T.customer_id = S.customer_id AND T.is_current = TRUE
WHERE T.customer_id IS NULL  -- Brand new customers
   OR (T.name != S.name OR T.country != S.country);  -- Existing customers with changes

-- Check result
SELECT * FROM `mixpanel-gtm-training.sandbox_ak.dim_customer_scd`
ORDER BY customer_id, effective_from;

-- TODO: WISDOM: SCD2 is two clean moves: update old row’s end date, insert new “current” row.



-- ======================================================
-- SNIPPET 11 — Views (abstraction) & Materialized Views
-- ======================================================

CREATE SCHEMA IF NOT EXISTS `mixpanel-gtm-training.sandbox_ak`;

-- A stable "raw" orders table for view demos
-- Separate from main orders table to demonstrate view/MV concepts cleanly
CREATE OR REPLACE TABLE `mixpanel-gtm-training.sandbox_ak.orders_raw` AS
SELECT * FROM UNNEST([
  STRUCT(101 AS order_id, 1 AS customer_id, TIMESTAMP '2024-03-10 10:00:00+00' AS order_ts, NUMERIC '120.50' AS amount, 'paid'     AS status),
  STRUCT(102 AS order_id, 2 AS customer_id, TIMESTAMP '2024-03-11 14:20:00+00' AS order_ts, NUMERIC ' 45.00' AS amount, 'paid'     AS status),
  STRUCT(103 AS order_id, 1 AS customer_id, TIMESTAMP '2024-03-12 18:05:00+00' AS order_ts, NUMERIC '200.00' AS amount, 'refunded' AS status),
  STRUCT(104 AS order_id, 3 AS customer_id, TIMESTAMP '2024-03-12 19:30:00+00' AS order_ts, NUMERIC ' 75.25' AS amount, 'paid'     AS status),
  STRUCT(105 AS order_id, 4 AS customer_id, TIMESTAMP '2024-03-13 09:10:00+00' AS order_ts, NUMERIC ' 18.00' AS amount, 'paid'     AS status)
]);

-- View: daily net revenue
CREATE OR REPLACE VIEW `mixpanel-gtm-training.sandbox_ak.v_daily_net_revenue` AS
SELECT DATE(order_ts) AS day,
       SUM(CASE WHEN status='paid' THEN amount
                WHEN status='refunded' THEN -amount
                ELSE 0 END) AS net_revenue
FROM `mixpanel-gtm-training.sandbox_ak.orders_raw`
GROUP BY day;

-- Materialized View: same logic, precomputed for speed
-- BigQuery MVs auto-refresh when base tables change - trades storage for query performance
CREATE OR REPLACE MATERIALIZED VIEW `mixpanel-gtm-training.sandbox_ak.mv_daily_net_revenue` AS
SELECT DATE(order_ts) AS day,
       SUM(CASE WHEN status='paid' THEN amount
                WHEN status='refunded' THEN -amount
                ELSE 0 END) AS net_revenue
FROM `mixpanel-gtm-training.sandbox_ak.orders_raw`
GROUP BY day;

-- Query both
SELECT * FROM `mixpanel-gtm-training.sandbox_ak.v_daily_net_revenue` ORDER BY day;
SELECT * FROM `mixpanel-gtm-training.sandbox_ak.mv_daily_net_revenue` ORDER BY day;

-- TODO: WISDOM: Views = abstraction boundary; MVs trade storage for fast reads on changing sources.


-- ==========================================
-- SNIPPET 12 — Reusable UDFs (SQL + JS)
-- ==========================================

CREATE SCHEMA IF NOT EXISTS `mixpanel-gtm-training.sandbox_ak`;

-- SQL UDF (persistent): plan normalization
-- SQL UDFs are fast and portable; use for simple transformations
CREATE OR REPLACE FUNCTION `mixpanel-gtm-training.sandbox_ak.norm_plan`(s STRING) AS (LOWER(TRIM(s)));

-- JS UDF (persistent): slugify
-- JavaScript UDFs handle complex logic SQL can't express easily
CREATE OR REPLACE FUNCTION `mixpanel-gtm-training.sandbox_ak.js_slugify`(s STRING)
RETURNS STRING
LANGUAGE js AS """
  return (s || '').toLowerCase().trim()
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/(^-|-$)/g,'');
""";

-- Use them
SELECT DISTINCT `mixpanel-gtm-training.sandbox_ak`.norm_plan(JSON_EXTRACT_SCALAR(j, '$.attrs.plan')) AS normed_plan
FROM `mixpanel-gtm-training.sandbox_ak.json_events`
ORDER BY normed_plan;

SELECT name, `mixpanel-gtm-training.sandbox_ak`.js_slugify(name) AS slug
FROM `mixpanel-gtm-training.sandbox_ak.customers`
ORDER BY customer_id;

-- TODO: WISDOM: UDFs = reuse + clarity. Watch portability/perf; prefer SQL UDFs when possible.


-- ===========================================
-- SNIPPET 13 — Read the plan (EXPLAIN)
-- ===========================================

CREATE SCHEMA IF NOT EXISTS `mixpanel-gtm-training.sandbox_ak`;

SELECT c.country, COUNT(*) AS orders
FROM `mixpanel-gtm-training.sandbox_ak.orders` o
JOIN `mixpanel-gtm-training.sandbox_ak.customers` c USING (customer_id)
GROUP BY country;

-- 🧠 Read for: partition pruning (if any), join strategy (broadcast/shuffle), bytes processed.
-- TODO: WISDOM: Prune partitions; filter on clustered keys; avoid functions around partition columns in WHERE.


-- ===============================================
-- BONUS SNIPPET — Funnel Analysis (Conversion Tracking)
-- ===============================================

CREATE SCHEMA IF NOT EXISTS `mixpanel-gtm-training.sandbox_ak`;

-- Create synthetic user journey events for funnel demo
CREATE OR REPLACE TABLE `mixpanel-gtm-training.sandbox_ak.user_events` AS
WITH base_events AS (
  SELECT * FROM UNNEST([
    -- User 1: Complete funnel
    STRUCT(1 AS user_id, 'page_view'    AS event_type, TIMESTAMP '2024-03-10 09:00:00+00' AS event_ts),
    STRUCT(1 AS user_id, 'sign_up'      AS event_type, TIMESTAMP '2024-03-10 09:05:00+00' AS event_ts),
    STRUCT(1 AS user_id, 'add_to_cart'  AS event_type, TIMESTAMP '2024-03-10 09:10:00+00' AS event_ts),
    STRUCT(1 AS user_id, 'checkout'     AS event_type, TIMESTAMP '2024-03-10 09:15:00+00' AS event_ts),
    STRUCT(1 AS user_id, 'purchase'     AS event_type, TIMESTAMP '2024-03-10 09:20:00+00' AS event_ts),

    -- User 2: Drops at checkout
    STRUCT(2 AS user_id, 'page_view'    AS event_type, TIMESTAMP '2024-03-10 10:00:00+00' AS event_ts),
    STRUCT(2 AS user_id, 'sign_up'      AS event_type, TIMESTAMP '2024-03-10 10:05:00+00' AS event_ts),
    STRUCT(2 AS user_id, 'add_to_cart'  AS event_type, TIMESTAMP '2024-03-10 10:10:00+00' AS event_ts),
    STRUCT(2 AS user_id, 'checkout'     AS event_type, TIMESTAMP '2024-03-10 10:15:00+00' AS event_ts),

    -- User 3: Drops at add_to_cart
    STRUCT(3 AS user_id, 'page_view'    AS event_type, TIMESTAMP '2024-03-10 11:00:00+00' AS event_ts),
    STRUCT(3 AS user_id, 'sign_up'      AS event_type, TIMESTAMP '2024-03-10 11:05:00+00' AS event_ts),
    STRUCT(3 AS user_id, 'add_to_cart'  AS event_type, TIMESTAMP '2024-03-10 11:10:00+00' AS event_ts),

    -- User 4: Only page view
    STRUCT(4 AS user_id, 'page_view'    AS event_type, TIMESTAMP '2024-03-10 12:00:00+00' AS event_ts),

    -- User 5: Complete funnel (different day)
    STRUCT(5 AS user_id, 'page_view'    AS event_type, TIMESTAMP '2024-03-11 09:00:00+00' AS event_ts),
    STRUCT(5 AS user_id, 'sign_up'      AS event_type, TIMESTAMP '2024-03-11 09:05:00+00' AS event_ts),
    STRUCT(5 AS user_id, 'add_to_cart'  AS event_type, TIMESTAMP '2024-03-11 09:10:00+00' AS event_ts),
    STRUCT(5 AS user_id, 'checkout'     AS event_type, TIMESTAMP '2024-03-11 09:15:00+00' AS event_ts),
    STRUCT(5 AS user_id, 'purchase'     AS event_type, TIMESTAMP '2024-03-11 09:20:00+00' AS event_ts)
  ])
)
SELECT * FROM base_events ORDER BY user_id, event_ts;

-- Method 1: Simple funnel with step completion flags
-- Shows which users completed each step
WITH funnel_steps AS (
  SELECT
    user_id,
    MAX(CASE WHEN event_type = 'page_view'   THEN 1 ELSE 0 END) AS step_1_page_view,
    MAX(CASE WHEN event_type = 'sign_up'     THEN 1 ELSE 0 END) AS step_2_sign_up,
    MAX(CASE WHEN event_type = 'add_to_cart' THEN 1 ELSE 0 END) AS step_3_add_to_cart,
    MAX(CASE WHEN event_type = 'checkout'    THEN 1 ELSE 0 END) AS step_4_checkout,
    MAX(CASE WHEN event_type = 'purchase'    THEN 1 ELSE 0 END) AS step_5_purchase
  FROM `mixpanel-gtm-training.sandbox_ak.user_events`
  GROUP BY user_id
)
SELECT
  'Step 1: Page View'   AS funnel_step, SUM(step_1_page_view)   AS users, ROUND(100.0 * SUM(step_1_page_view) / COUNT(*), 1)   AS pct_of_total
FROM funnel_steps
UNION ALL SELECT
  'Step 2: Sign Up'     AS funnel_step, SUM(step_2_sign_up)     AS users, ROUND(100.0 * SUM(step_2_sign_up) / COUNT(*), 1)     AS pct_of_total
FROM funnel_steps
UNION ALL SELECT
  'Step 3: Add to Cart' AS funnel_step, SUM(step_3_add_to_cart) AS users, ROUND(100.0 * SUM(step_3_add_to_cart) / COUNT(*), 1) AS pct_of_total
FROM funnel_steps
UNION ALL SELECT
  'Step 4: Checkout'    AS funnel_step, SUM(step_4_checkout)    AS users, ROUND(100.0 * SUM(step_4_checkout) / COUNT(*), 1)    AS pct_of_total
FROM funnel_steps
UNION ALL SELECT
  'Step 5: Purchase'    AS funnel_step, SUM(step_5_purchase)    AS users, ROUND(100.0 * SUM(step_5_purchase) / COUNT(*), 1)    AS pct_of_total
FROM funnel_steps
ORDER BY funnel_step;

-- Method 2: Sequential funnel (order matters)
-- Only counts users who completed steps in sequence
WITH sequential_funnel AS (
  SELECT
    user_id,
    -- Users must complete each step to qualify for the next
    MAX(CASE WHEN event_type = 'page_view'   THEN 1 ELSE 0 END) AS completed_step_1,

    CASE WHEN MAX(CASE WHEN event_type = 'page_view'   THEN 1 ELSE 0 END) = 1
         THEN MAX(CASE WHEN event_type = 'sign_up'     THEN 1 ELSE 0 END)
         ELSE 0 END AS completed_step_2,

    CASE WHEN MAX(CASE WHEN event_type = 'page_view'   THEN 1 ELSE 0 END) = 1
          AND MAX(CASE WHEN event_type = 'sign_up'     THEN 1 ELSE 0 END) = 1
         THEN MAX(CASE WHEN event_type = 'add_to_cart' THEN 1 ELSE 0 END)
         ELSE 0 END AS completed_step_3,

    CASE WHEN MAX(CASE WHEN event_type = 'page_view'   THEN 1 ELSE 0 END) = 1
          AND MAX(CASE WHEN event_type = 'sign_up'     THEN 1 ELSE 0 END) = 1
          AND MAX(CASE WHEN event_type = 'add_to_cart' THEN 1 ELSE 0 END) = 1
         THEN MAX(CASE WHEN event_type = 'checkout'    THEN 1 ELSE 0 END)
         ELSE 0 END AS completed_step_4,

    CASE WHEN MAX(CASE WHEN event_type = 'page_view'   THEN 1 ELSE 0 END) = 1
          AND MAX(CASE WHEN event_type = 'sign_up'     THEN 1 ELSE 0 END) = 1
          AND MAX(CASE WHEN event_type = 'add_to_cart' THEN 1 ELSE 0 END) = 1
          AND MAX(CASE WHEN event_type = 'checkout'    THEN 1 ELSE 0 END) = 1
         THEN MAX(CASE WHEN event_type = 'purchase'    THEN 1 ELSE 0 END)
         ELSE 0 END AS completed_step_5
  FROM `mixpanel-gtm-training.sandbox_ak.user_events`
  GROUP BY user_id
),
funnel_summary AS (
  SELECT
    SUM(completed_step_1) AS step_1_users,
    SUM(completed_step_2) AS step_2_users,
    SUM(completed_step_3) AS step_3_users,
    SUM(completed_step_4) AS step_4_users,
    SUM(completed_step_5) AS step_5_users
  FROM sequential_funnel
)
SELECT
  'Page View → Sign Up'     AS conversion_step,
  step_1_users AS entering_users,
  step_2_users AS converting_users,
  ROUND(100.0 * step_2_users / NULLIF(step_1_users, 0), 1) AS conversion_rate_pct
FROM funnel_summary
UNION ALL SELECT
  'Sign Up → Add to Cart'   AS conversion_step,
  step_2_users AS entering_users,
  step_3_users AS converting_users,
  ROUND(100.0 * step_3_users / NULLIF(step_2_users, 0), 1) AS conversion_rate_pct
FROM funnel_summary
UNION ALL SELECT
  'Add to Cart → Checkout'  AS conversion_step,
  step_3_users AS entering_users,
  step_4_users AS converting_users,
  ROUND(100.0 * step_4_users / NULLIF(step_3_users, 0), 1) AS conversion_rate_pct
FROM funnel_summary
UNION ALL SELECT
  'Checkout → Purchase'     AS conversion_step,
  step_4_users AS entering_users,
  step_5_users AS converting_users,
  ROUND(100.0 * step_5_users / NULLIF(step_4_users, 0), 1) AS conversion_rate_pct
FROM funnel_summary
ORDER BY conversion_step;

-- Method 3: Time-windowed funnel (events within 1 hour)
-- More realistic: users must complete next step within time window
WITH windowed_events AS (
  SELECT
    user_id,
    event_type,
    event_ts,
    MIN(CASE WHEN event_type = 'page_view' THEN event_ts END)
      OVER (PARTITION BY user_id) AS funnel_start_ts
  FROM `mixpanel-gtm-training.sandbox_ak.user_events`
),
qualified_events AS (
  SELECT
    user_id,
    event_type,
    event_ts,
    funnel_start_ts
  FROM windowed_events
  WHERE event_ts <= TIMESTAMP_ADD(funnel_start_ts, INTERVAL 1 HOUR)  -- 1-hour window
),
windowed_funnel AS (
  SELECT
    user_id,
    MAX(CASE WHEN event_type = 'page_view'   THEN 1 ELSE 0 END) AS step_1,
    MAX(CASE WHEN event_type = 'sign_up'     THEN 1 ELSE 0 END) AS step_2,
    MAX(CASE WHEN event_type = 'add_to_cart' THEN 1 ELSE 0 END) AS step_3,
    MAX(CASE WHEN event_type = 'checkout'    THEN 1 ELSE 0 END) AS step_4,
    MAX(CASE WHEN event_type = 'purchase'    THEN 1 ELSE 0 END) AS step_5
  FROM qualified_events
  GROUP BY user_id
)
SELECT
  'Within 1-Hour Window' AS funnel_type,
  SUM(step_1) AS page_views,
  SUM(step_2) AS sign_ups,
  SUM(step_3) AS add_to_carts,
  SUM(step_4) AS checkouts,
  SUM(step_5) AS purchases,
  ROUND(100.0 * SUM(step_5) / NULLIF(SUM(step_1), 0), 1) AS overall_conversion_pct
FROM windowed_funnel;

-- TODO: WISDOM: Funnels = business-critical metrics. Define time windows, sequence rules, and attribution clearly.
