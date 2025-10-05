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
    console.log('Fetching launches from Launch Library 2');
    
    const url = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=8&format=json';
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Launch Library 2 returned ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Successfully fetched ${data.results?.length || 0} launches`);
    
    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=180, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching launches:', error);
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
