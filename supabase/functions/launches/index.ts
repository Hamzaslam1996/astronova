import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import { safeFetch, log } from '../_shared/fetcher.ts';
import { handleCors, corsHeaders } from '../_shared/cors.ts';
import { checkRateLimit } from '../_shared/rateLimit.ts';

const LaunchSchema = z.object({
  id: z.string(),
  name: z.string(),
  net: z.string().optional().nullable(),
  status: z.object({
    name: z.string().optional(),
  }).optional().nullable(),
  launch_service_provider: z.object({
    name: z.string().optional(),
  }).optional().nullable(),
  pad: z.object({
    name: z.string().optional(),
    location: z.object({
      name: z.string().optional(),
    }).optional().nullable(),
  }).optional().nullable(),
  mission: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }).optional().nullable(),
  image: z.string().optional().nullable(),
  infographic: z.string().optional().nullable(),
});

const LaunchLibraryResponseSchema = z.object({
  results: z.array(LaunchSchema),
});

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const rateLimit = checkRateLimit(`launches:${ip}`);
    
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
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetAt.toString(),
          },
        }
      );
    }

    log('info', 'Fetching launches', { ip });

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch from Launch Library API
    const fetchResult = await safeFetch<unknown>(
      'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=20&mode=detailed'
    );

    // Log fetch attempt
    await supabaseClient.from('fetch_logs').insert({
      source_slug: 'launch-library',
      url: 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=20&mode=detailed',
      status_code: fetchResult.statusCode,
      ok: fetchResult.ok,
      duration_ms: fetchResult.durationMs,
      error: fetchResult.error,
    });

    if (!fetchResult.ok || !fetchResult.data) {
      throw new Error(fetchResult.error || 'Failed to fetch launches');
    }

    // Validate and parse response
    const validated = LaunchLibraryResponseSchema.parse(fetchResult.data);
    
    // Map to our schema and upsert
    const launches = validated.results.map(launch => ({
      id: launch.id,
      name: launch.name,
      window_start: launch.net || null,
      status: launch.status?.name || null,
      provider: launch.launch_service_provider?.name || null,
      pad: launch.pad?.name || null,
      location: launch.pad?.location?.name || null,
      mission: launch.mission?.description || launch.mission?.name || null,
      image_url: launch.image || launch.infographic || null,
      details_url: `https://ll.thespacedevs.com/2.2.0/launch/${launch.id}/`,
      fetched_at: new Date().toISOString(),
    }));

    // Upsert launches
    const { error: upsertError } = await supabaseClient
      .from('launches')
      .upsert(launches, { onConflict: 'id' });

    if (upsertError) {
      log('error', 'Failed to upsert launches', { error: upsertError.message });
      throw upsertError;
    }

    log('info', 'Successfully cached launches', { count: launches.length });

    return new Response(
      JSON.stringify(launches),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300, s-maxage=600',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        },
      }
    );
  } catch (error: any) {
    log('error', 'Launches API error', { 
      error: error.message,
      stack: error.stack,
    });

    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
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
