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
    console.log('Fetching CME data from NASA DONKI');
    
    // Get NASA API key from environment or use DEMO_KEY
    const apiKey = Deno.env.get('NASA_API_KEY') || 'DEMO_KEY';
    
    // Calculate date range (30 days ago to today)
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 30);
    
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    
    const url = `https://api.nasa.gov/DONKI/CME?startDate=${formatDate(startDate)}&endDate=${formatDate(today)}&api_key=${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`NASA DONKI returned ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Successfully fetched ${data.length || 0} CME events`);
    
    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=600, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching NASA DONKI data:', error);
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
