import React from "react";

export default function TopNav({
  links = {
    home: "/",
    orbitHub: "/orbit-hub",
    whitepaper: "/white-paper.pdf",
    prototype: "/prototype",
  },
}: { links?: { home: string; orbitHub: string; whitepaper: string; prototype: string } }) {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-slate-950/70 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href={links.home} className="font-bold tracking-tight hover:text-[#6366f1] transition">ASTRONOVA</a>
        <div className="flex gap-3 text-sm">
          <a className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500" href={links.prototype}>Prototype</a>
          <a className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500" href={links.orbitHub}>Orbit Hub</a>
          <a className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500" href={links.whitepaper} target="_blank">White Paper</a>
        </div>
      </div>
    </nav>
  );
}
