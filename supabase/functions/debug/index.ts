import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';
import { handleCors, corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get counts from all tables
    const [launchesResult, fetchLogsResult, dataSourcesResult] = await Promise.all([
      supabaseClient.from('launches').select('*', { count: 'exact', head: true }),
      supabaseClient.from('fetch_logs').select('*', { count: 'exact', head: true }),
      supabaseClient.from('data_sources').select('*').order('updated_at', { ascending: false }).limit(10),
    ]);

    const response = {
      timestamp: new Date().toISOString(),
      counts: {
        launches: launchesResult.count || 0,
        fetch_logs: fetchLogsResult.count || 0,
        data_sources: dataSourcesResult.data?.length || 0,
      },
      latest_data_sources: dataSourcesResult.data?.map(ds => ({
        slug: ds.slug,
        name: ds.name,
        enabled: ds.enabled,
        last_status: ds.last_status,
        last_fetch_at: ds.last_fetch_at,
        last_error: ds.last_error,
      })) || [],
    };

    return new Response(
      JSON.stringify(response, null, 2),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
