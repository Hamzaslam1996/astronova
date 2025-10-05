import { Link } from "react-router-dom";
import { AITerminal } from "@/components/AITerminal";

export default function Prototype() {
  return (
    <div className="min-h-screen bg-[#070B16] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Astronova AI Terminal
          </h1>
          <p className="text-lg text-[#B8C1CC]">
            Ask about LEO opportunities, NASA technologies, and space entrepreneurship insights
          </p>
        </div>

        {/* AI Terminal */}
        <AITerminal />
      </div>

      {/* Bottom CTA Bar */}
      <div className="sticky bottom-0 left-0 right-0 bg-[#0E1525] border-t border-white/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#B8C1CC] text-center sm:text-left">
            Join innovators and investors shaping the LEO economy
          </p>
          <Link
            to="/orbit-hub"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-[#5E5BFF] rounded-xl hover:shadow-[0_0_30px_rgba(94,91,255,0.4)] transition-all duration-300 whitespace-nowrap"
          >
            Visit the Hub →
          </Link>
        </div>
      </div>
    </div>
  );
}
