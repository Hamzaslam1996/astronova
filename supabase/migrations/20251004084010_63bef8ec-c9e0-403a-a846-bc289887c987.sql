-- Drop existing materialized view if exists
DROP MATERIALIZED VIEW IF EXISTS public.kpi_latest;

-- Create materialized view showing latest KPI value for each key
CREATE MATERIALIZED VIEW public.kpi_latest AS
SELECT DISTINCT ON (kpi_key)
  kpi_key, 
  kpi_value, 
  source, 
  observed_at
FROM public.kpi_timeseries
ORDER BY kpi_key, observed_at DESC;

-- Create unique index required for REFRESH MATERIALIZED VIEW CONCURRENTLY
CREATE UNIQUE INDEX IF NOT EXISTS kpi_latest_unique_idx
  ON public.kpi_latest (kpi_key);

-- Helper function to refresh the materialized view concurrently when possible
CREATE OR REPLACE FUNCTION public.refresh_kpi_latest()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Concurrent refresh requires the unique index (created above)
  EXECUTE 'REFRESH MATERIALIZED VIEW CONCURRENTLY public.kpi_latest';
EXCEPTION
  WHEN feature_not_supported THEN
    -- Fallback if DB doesn't allow concurrent refresh (first time, or older PG)
    EXECUTE 'REFRESH MATERIALIZED VIEW public.kpi_latest';
END;
$$;

-- Add helpful comment
COMMENT ON MATERIALIZED VIEW public.kpi_latest IS 'Latest KPI values per key. Use refresh_kpi_latest() to update concurrently.';