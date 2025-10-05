import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type Jurisdiction = "US" | "UK" | "EU";

const JURISDICTION_LABELS = {
  US: "🇺🇸 United States",
  UK: "🇬🇧 United Kingdom",
  EU: "🇪🇺 European Union"
};

export function NovaCopilot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("UK");
  const inputRef = useRef<HTMLInputElement>(null);

  // Load jurisdiction from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("astronova_jurisdiction");
    if (stored === "US" || stored === "UK" || stored === "EU") {
      setJurisdiction(stored);
    }
  }, []);

  // Auto-focus input on mount and after AI response
  useEffect(() => {
    inputRef.current?.focus();
  }, [messages]);

  // Save jurisdiction to localStorage
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
          messages: [...messages, userMessage], // Send full conversation history
          jurisdiction 
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.choices[0].message.content,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      
      // Auto-focus input after AI response for follow-ups
      setTimeout(() => inputRef.current?.focus(), 100);
    } catch (error) {
      console.error("Error calling AI:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Check if last AI message is a question
  const lastMessage = messages[messages.length - 1];
  const isAwaitingAnswer = lastMessage?.role === "assistant" && lastMessage.content.trim().endsWith("?");
  
  return (
    <div className="flex flex-col h-full">
      {/* Header with Jurisdiction Picker */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-white/60">Your personal AI for the orbital economy.</p>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="gap-2 text-sm text-white/80 hover:text-white hover:bg-white/10 border border-white/10"
            >
              {JURISDICTION_LABELS[jurisdiction]}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black/90 border-white/10 backdrop-blur-md">
            {(["US", "UK", "EU"] as Jurisdiction[]).map((j) => (
              <DropdownMenuItem
                key={j}
                onClick={() => handleJurisdictionChange(j)}
                className={`text-sm cursor-pointer ${
                  jurisdiction === j
                    ? "bg-sky-500/20 text-sky-400"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {JURISDICTION_LABELS[j]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Big Input */}
      <div className="relative mb-6">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isAwaitingAnswer ? "Type your answer…" : "Ask about startup opportunities, NASA tech, or funding…"}
          disabled={loading}
          className="w-full h-16 rounded-full border border-white/15 bg-white/10 px-6 text-base md:text-lg placeholder:text-white/50 text-white focus:outline-none focus:ring-2 focus:ring-sky-400/70 pr-16"
          aria-label="Ask AI about opportunities"
        />
        <Button 
          onClick={sendMessage} 
          disabled={loading || !input.trim()} 
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 bg-sky-500 hover:bg-sky-600"
          aria-label="Send message"
        >
          <Sparkles className="h-5 w-5" />
        </Button>
      </div>

      {/* Chat Area - Only show when messages exist */}
      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto space-y-4 mt-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-2xl p-4 max-w-[90%] ${
                  msg.role === "user"
                    ? "bg-white text-black border border-white/30"
                    : "bg-white/80 text-black border border-white/30"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing opportunities...
            </div>
          )}
        </div>
      )}

      {/* Footer Disclosure - Only show when messages exist */}
      {messages.length > 0 && (
        <p className="text-xs text-white/50 mt-4">
          AI-generated insight — verify with NASA or {jurisdiction} authorities before acting.
        </p>
      )}
    </div>
  );
}
