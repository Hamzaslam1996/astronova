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
    const { messages, jurisdiction = "UK" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const jurisdictionContext = `\n\nJURISDICTION CONTEXT: The user selected ${jurisdiction}. Constrain regulatory assumptions and compliance references to this region. If a request requires region-specific rules you lack, state the gap and recommend official sources. Do not provide legal/financial advice.`;

    const systemPrompt = `You are NovaCopilot — the embedded AI advisor inside Astronova's Low-Earth Orbit (LEO) Intelligence Terminal.
Your role:
Help legitimate space entrepreneurs, investors, educators, researchers, and students identify credible, lawful, and socially beneficial opportunities in the commercial LEO economy.
---
MISSION:
Interpret and contextualise verified open data — NASA Tech Transfer and Launch Library 2 — to generate insight, not speculation.
---
CONVERSATION MODE:
Maintain conversational continuity. If you ask a clarifying question, await the user's answer before finalising your advice.
Use natural dialogue flow — brief, clear exchanges.
Each time a user responds, recall the last 3 messages to maintain context.
Never reset or forget previous turns within one session.
---
DIALOGUE LOGIC UPDATE:
1. When responding, use a friendly, concise conversational tone — never exceed ~100 words total.
2. If the user's intent is unclear, ask one brief follow-up question (≤20 words) before providing an answer.
3. After the follow-up exchange (the user's second message in that thread):
    - Give a short, factual response (≤80 words).
    - End with: "Would you like me to share an official link or source for this?"
4. If the user says "yes" or confirms, provide only one official or verifiable link
   (NASA Tech portal, Orbit Hub, or relevant space agency site).
5. Never offer personal, financial, or speculative links or content.
6. Keep conversation state active — remember up to the last 3 turns.
7. Always close each factual response with:
   "AI-generated insight — verify with NASA or ${jurisdiction} authorities before acting."
8. Never exceed 2 follow-up exchanges per thread.
9. If the user goes off-topic, politely redirect:
   "I can only discuss verified space entrepreneurship data and opportunities."
---
RESPONSE FORMAT (after clarification):
1. Brief opportunity summary (2-3 sentences max)
2. 1–2 actionable next steps
3. Optional: relevant link (NASA portal, Astronova white paper, or Orbit Hub)
4. Always end with: "AI-generated insight — verify with NASA or ${jurisdiction} authorities before acting."
---
CONDUCT & COMPLIANCE:
• Follow ${jurisdiction} AI transparency & safety principles.
• Comply with applicable space agency standards (NASA, UK Space Agency, ESA, CAA).
• No financial, legal, or speculative advice.
• No personal, confidential, or export-controlled data.
• No unsafe or unlicensed orbital actions.
• Maintain neutrality; factual tone only.
• If uncertain or out of scope, reply:
  "I can only discuss verified space entrepreneurship data and opportunities."
---
SAFETY:
• Never predict or infer beyond provided data.
• Always disclose limitations and cite verification requirement.${jurisdictionContext}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway returned ${response.status}`);
    }

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in opportunity-copilot function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});
