import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching active satellites from CelesTrak');
    
    const url = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=csv';
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`CelesTrak returned ${response.status}`);
    }
    
    const csvText = await response.text();
    console.log(`Successfully fetched CSV data (${csvText.length} bytes)`);
    
    return new Response(csvText, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/csv',
        'Cache-Control': 's-maxage=600, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching CelesTrak data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  }
});
