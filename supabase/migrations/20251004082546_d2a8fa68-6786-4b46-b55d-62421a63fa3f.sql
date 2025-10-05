-- Create launches table for cached launch data
CREATE TABLE IF NOT EXISTS public.launches (
  id text PRIMARY KEY,
  name text NOT NULL,
  window_start timestamptz,
  status text,
  provider text,
  pad text,
  location text,
  mission text,
  image_url text,
  details_url text,
  fetched_at timestamptz DEFAULT now()
);

-- Create fetch_logs table for observability
CREATE TABLE IF NOT EXISTS public.fetch_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_slug text,
  url text NOT NULL,
  status_code integer,
  ok boolean NOT NULL,
  duration_ms integer,
  error text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.launches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fetch_logs ENABLE ROW LEVEL SECURITY;

-- Public read access for launches
CREATE POLICY "Anyone can view launches" 
  ON public.launches 
  FOR SELECT 
  USING (true);

-- Authenticated users can view fetch logs
CREATE POLICY "Authenticated users can view fetch logs" 
  ON public.fetch_logs 
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_launches_window_start ON public.launches(window_start DESC);
CREATE INDEX IF NOT EXISTS idx_launches_fetched_at ON public.launches(fetched_at DESC);
CREATE INDEX IF NOT EXISTS idx_fetch_logs_created_at ON public.fetch_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_fetch_logs_source_slug ON public.fetch_logs(source_slug);