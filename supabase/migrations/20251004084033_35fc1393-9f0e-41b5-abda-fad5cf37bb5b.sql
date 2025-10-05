-- Fix security warning: Revoke SELECT access on materialized view from API roles
-- Materialized views cannot use RLS, so we restrict access entirely from public API roles

-- Revoke from public role (sets defaults for all roles)
REVOKE SELECT ON public.kpi_latest FROM public;

-- Revoke from anon role (unauthenticated API users)
REVOKE SELECT ON public.kpi_latest FROM anon;

-- Revoke from authenticated role (authenticated API users)
REVOKE SELECT ON public.kpi_latest FROM authenticated;

-- Grant SELECT only to postgres and service_role for admin access
GRANT SELECT ON public.kpi_latest TO postgres, service_role;

-- Add comment explaining the access restriction
COMMENT ON MATERIALIZED VIEW public.kpi_latest IS 'Latest KPI values per key. Restricted to service_role only (no public API access). Use refresh_kpi_latest() to update concurrently.';