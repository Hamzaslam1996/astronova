import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get the next upcoming launch (earliest window_start in the future)
    const { data, error } = await supabase
      .from("launches")
      .select("name, provider, pad, window_start, mission, details_url")
      .gte("window_start", new Date().toISOString())
      .order("window_start", { ascending: true })
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching next launch:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 404, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Transform to match NextLaunch type
    const response = {
      name: data.name,
      provider: data.provider,
      pad: data.pad,
      net: data.window_start,
      window_start: data.window_start,
      mission: data.mission,
      info_url: data.details_url,
    };

    return new Response(
      JSON.stringify(response),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300, s-maxage=600",
        },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
