export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export function getCorsHeaders(origin?: string): Record<string, string> {
  // In production, you'd validate against allowed origins
  // For now, allow all origins (set to * in corsHeaders)
  return corsHeaders;
}

export function handleCors(req: Request): Response | null {
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204,
      headers: corsHeaders 
    });
  }
  return null;
}
