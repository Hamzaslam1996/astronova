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

    // Check database connectivity
    const { count, error } = await supabaseClient
      .from('data_sources')
      .select('*', { count: 'exact', head: true })
      .eq('enabled', true);

    const dbStatus = error ? 'error' : 'ok';
    
    return new Response(
      JSON.stringify({
        status: 'ok',
        time: new Date().toISOString(),
        db: dbStatus,
        sources: count || 0,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        status: 'error',
        time: new Date().toISOString(),
        error: error.message,
      }),
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
