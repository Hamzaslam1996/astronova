import { useState, useEffect, useRef } from "react";
import { Sparkles, Copy, ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type Jurisdiction = "US" | "UK" | "EU";

const JURISDICTION_LABELS = {
  US: "🇺🇸 US",
  UK: "🇬🇧 UK",
  EU: "🇪🇺 EU"
};

const EXAMPLE_PROMPTS = [
  "What LEO opportunities exist for microgravity research?",
  "Show me available NASA technologies for CubeSats",
  "Upcoming launches with rideshare capacity"
];

export function AITerminal() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("UK");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Load jurisdiction from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("astronova_jurisdiction");
    if (stored === "US" || stored === "UK" || stored === "EU") {
      setJurisdiction(stored);
    }
  }, []);

  // Auto-focus and keyboard shortcuts
  useEffect(() => {
    inputRef.current?.focus();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Enter to submit
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
      // Esc to clear input
      if (e.key === "Escape") {
        setInput("");
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, loading]);

  const handleJurisdictionChange = (newJurisdiction: Jurisdiction) => {
    setJurisdiction(newJurisdiction);
    localStorage.setItem("astronova_jurisdiction", newJurisdiction);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("opportunity-copilot", {
        body: { 
          messages: [...messages, userMessage],
          jurisdiction 
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.choices[0].message.content,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      
      setTimeout(() => inputRef.current?.focus(), 100);
    } catch (error) {
      console.error("Error calling AI:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Copied to clipboard",
    });
  };

  const extractLinks = (text: string): { text: string; url: string }[] => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex) || [];
    return matches.map(url => ({
      text: url.includes('nasa.gov') ? 'NASA Source' : 'Source',
      url
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Query Panel */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask about LEO opportunities, NASA tech, funding..."
              disabled={loading}
              rows={2}
              className="w-full bg-transparent border-none text-white placeholder:text-[#B8C1CC]/50 resize-none focus:outline-none text-base"
            />
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <Select value={jurisdiction} onValueChange={(val) => handleJurisdictionChange(val as Jurisdiction)}>
              <SelectTrigger className="w-[100px] bg-white/5 border-white/10 text-white text-sm h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0E1525] border-white/10 z-50">
                {(["US", "UK", "EU"] as Jurisdiction[]).map((j) => (
                  <SelectItem key={j} value={j} className="text-white hover:bg-white/10">
                    {JURISDICTION_LABELS[j]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <button 
              onClick={sendMessage} 
              disabled={loading || !input.trim()} 
              className="rounded-xl h-9 w-9 bg-[#5E5BFF] hover:shadow-[0_0_30px_rgba(94,91,255,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              aria-label="Send query"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <Sparkles className="h-4 w-4 text-white" />}
            </button>
          </div>
        </div>

        {/* Example Prompts */}
        {messages.length === 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setInput(prompt)}
                className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#B8C1CC] hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Hint */}
      {messages.length === 0 && (
        <p className="text-xs text-center text-white/40">
          Press <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">⌘ Enter</kbd> to submit • <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">Esc</kbd> to clear
        </p>
      )}

      {/* Response Cards */}
      {messages.length > 0 && (
        <div className="space-y-4">
          {messages.map((msg, idx) => {
            if (msg.role === "user") {
              return (
                <div key={idx} className="flex justify-end">
                  <div className="max-w-[85%] px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm">
                    {msg.content}
                  </div>
                </div>
              );
            }
            
            const links = extractLinks(msg.content);
            const cleanContent = msg.content.replace(/(https?:\/\/[^\s]+)/g, '');
            
            return (
              <div key={idx} className="glass-card p-6 rounded-xl space-y-4">
                <div className="text-white/90 leading-relaxed whitespace-pre-wrap text-sm">
                  {cleanContent}
                </div>
                
                {links.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                    {links.map((link, linkIdx) => (
                      <a
                        key={linkIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-[#32D9FA]/10 text-[#32D9FA] hover:bg-[#32D9FA]/20 transition-all"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {link.text}
                      </a>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => copyToClipboard(msg.content)}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <Copy className="h-3 w-3" />
                    Copy
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Disclaimer */}
      {messages.length > 0 && (
        <p className="text-xs text-center text-white/40 leading-relaxed">
          Demo only. AI-generated insights require verification with NASA or {jurisdiction} authorities before acting.
        </p>
      )}
    </div>
  );
}
