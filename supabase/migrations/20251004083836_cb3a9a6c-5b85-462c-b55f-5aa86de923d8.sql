-- Create KPI timeseries table for tracking metrics over time
CREATE TABLE IF NOT EXISTS public.kpi_timeseries (
  id          BIGSERIAL PRIMARY KEY,
  kpi_key     TEXT        NOT NULL,
  kpi_value   NUMERIC     NOT NULL CHECK (kpi_value >= 0),
  source      TEXT        NOT NULL,
  observed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.kpi_timeseries ENABLE ROW LEVEL SECURITY;

-- Index for time-window queries
CREATE INDEX IF NOT EXISTS kpi_timeseries_observed_idx
  ON public.kpi_timeseries (observed_at DESC);

-- Composite index for KPI key + time queries
CREATE INDEX IF NOT EXISTS kpi_timeseries_key_date_idx
  ON public.kpi_timeseries (kpi_key, observed_at DESC);

-- Unique index to prevent duplicate ticks from the same run
CREATE UNIQUE INDEX IF NOT EXISTS kpi_unique_tick_idx
  ON public.kpi_timeseries (kpi_key, source, observed_at);

-- RLS Policies
CREATE POLICY "Anyone can view KPI timeseries"
  ON public.kpi_timeseries
  FOR SELECT
  USING (true);

CREATE POLICY "Service can insert KPI timeseries"
  ON public.kpi_timeseries
  FOR INSERT
  WITH CHECK (true);

-- Add helpful comment
COMMENT ON TABLE public.kpi_timeseries IS 'Stores time-series data for key performance indicators (e.g., active satellites count). Optimized for time-window queries and prevents duplicate ticks.';