import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';
import { safeFetch, log } from '../_shared/fetcher.ts';
import { handleCors, corsHeaders } from '../_shared/cors.ts';
import { checkRateLimit } from '../_shared/rateLimit.ts';

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const rateLimit = checkRateLimit(`health:${ip}`);
    
    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded',
          resetAt: new Date(rateLimit.resetAt).toISOString(),
        }),
        { 
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const url = new URL(req.url);
    const slug = url.searchParams.get('slug');

    if (!slug) {
      return new Response(
        JSON.stringify({ error: 'Missing slug parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    log('info', 'Health check requested', { slug, ip });

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch data source configuration
    const { data: dataSource, error: fetchError } = await supabaseClient
      .from('data_sources')
      .select('*')
      .eq('slug', slug)
      .single();

    if (fetchError || !dataSource) {
      log('error', 'Data source not found', { slug, error: fetchError?.message });
      return new Response(
        JSON.stringify({ error: 'Data source not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let fetchUrl = dataSource.base_url;

    // Handle authentication if needed
    if (dataSource.auth_type === 'api_key' && dataSource.secret_name) {
      const apiKey = Deno.env.get(dataSource.secret_name);
      if (apiKey) {
        const baseUrl = new URL(dataSource.base_url);
        if (!baseUrl.searchParams.has('api_key')) {
          baseUrl.searchParams.set('api_key', apiKey);
          fetchUrl = baseUrl.toString();
        }
      }
    }

    // Perform health check with safeFetch
    const fetchResult = await safeFetch(fetchUrl, { timeoutMs: 10000 });

    // Update data source status
    const { error: updateError } = await supabaseClient
      .from('data_sources')
      .update({
        last_fetch_at: new Date().toISOString(),
        last_status: fetchResult.ok ? 'ok' : 'error',
        last_error: fetchResult.error,
      })
      .eq('slug', slug);

    if (updateError) {
      log('error', 'Failed to update data source', { slug, error: updateError.message });
    }

    // Log fetch attempt
    await supabaseClient.from('fetch_logs').insert({
      source_slug: slug,
      url: fetchUrl,
      status_code: fetchResult.statusCode,
      ok: fetchResult.ok,
      duration_ms: fetchResult.durationMs,
      error: fetchResult.error,
    });

    log('info', 'Health check completed', {
      slug,
      status: fetchResult.ok ? 'ok' : 'error',
      durationMs: fetchResult.durationMs,
    });

    return new Response(
      JSON.stringify({
        slug,
        status: fetchResult.ok ? 'ok' : 'error',
        checked_at: new Date().toISOString(),
        duration_ms: fetchResult.durationMs,
        error: fetchResult.error,
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
    log('error', 'Health check error', { error: error.message, stack: error.stack });
    
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});