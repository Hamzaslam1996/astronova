import React from "react";
import { ConstellationSVG } from "./ConstellationSVG";
import issCupolaImage from "@/assets/iss-cupola-earth.jpg";

export default function AstronovaHome({
  prototypeUrl = "/prototype",
  orbitHubUrl = "/orbit-hub",
  whitePaperUrl = "/white-paper.pdf",
}) {
  return (
    <main className="min-h-screen bg-[#070B16] text-white selection:bg-primary/30">
      {/* STICKY TOP BAR */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#070B16]/80 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <a href="/" className="font-bold tracking-tight text-white text-xl">
            Astronova
          </a>
          <nav className="flex items-center gap-6 text-sm">
            <a href={prototypeUrl} className="text-[#B8C1CC] hover:text-white transition">
              Prototype
            </a>
            <a href={orbitHubUrl} className="text-[#B8C1CC] hover:text-white transition">
              Orbit Hub
            </a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden gradient-hero">
        <ConstellationSVG />
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl sm:text-7xl font-bold tracking-tight text-white leading-tight">
              Astronova
            </h1>
            <p className="mt-6 text-2xl sm:text-3xl text-white/95 font-semibold">
              Empowering the Space Entrepreneurship Era
            </p>
            <p className="mt-6 text-lg text-[#B8C1CC] max-w-3xl mx-auto leading-relaxed">
              Building the foundation for a sustainable and inclusive Low Earth Orbit (LEO) economy through open data, collaboration, and innovation.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={prototypeUrl} 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[#5E5BFF] rounded-xl hover:shadow-[0_0_30px_rgba(94,91,255,0.4)] transition-all duration-300 shadow-lg"
              >
                Launch Prototype
              </a>
              <a 
                href={orbitHubUrl} 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white glass-card hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                Visit Orbit Hub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: WHY LEO MATTERS NOW */}
      <section className="bg-[#0E1525]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-4xl font-bold text-white">Why Low-Earth Orbit Matters Now</h2>
          <p className="mt-4 text-lg text-[#B8C1CC] max-w-3xl leading-relaxed">
            The International Space Station (ISS) will retire around 2030, creating both a critical transition point and an unprecedented opportunity. As NASA shifts focus to deep space exploration, commercial entities are stepping up to sustain and expand human presence in LEO—opening doors for research, manufacturing, tourism, and sustainable development.
          </p>
          
          {/* ISS Cupola Image */}
          <div className="mt-10 mb-10 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={issCupolaImage} 
              alt="View of Earth from ISS Cupola - Image furnished by NASA" 
              className="w-full h-auto object-cover"
            />
            <p className="text-xs text-white/40 text-center py-2 bg-black/30">
              ISS Cupola view of Earth - Image furnished by NASA
            </p>
          </div>
          
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300">
              <h3 className="font-semibold text-white text-lg mb-3">ISS Retirement</h3>
              <p className="text-sm text-[#B8C1CC] leading-relaxed">
                Creating urgency for commercial successors to maintain orbital infrastructure and research capabilities.
              </p>
            </div>
            <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300">
              <h3 className="font-semibold text-white text-lg mb-3">Launch Cost Drop</h3>
              <p className="text-sm text-[#B8C1CC] leading-relaxed">
                Reusable rockets have reduced costs by 90%, making LEO accessible to startups and researchers.
              </p>
            </div>
            <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300">
              <h3 className="font-semibold text-white text-lg mb-3">New Markets</h3>
              <p className="text-sm text-[#B8C1CC] leading-relaxed">
                Microgravity manufacturing, space tourism, and orbital logistics are emerging as viable industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE OPPORTUNITY AHEAD */}
      <section className="bg-[#070B16]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-4xl font-bold text-white">The Opportunity Ahead</h2>
          <p className="mt-4 text-lg text-[#B8C1CC] max-w-3xl leading-relaxed">
            With launch costs plummeting and global interest in LEO accelerating, we're witnessing the birth of a trillion-dollar orbital economy. From commercial space stations to on-orbit manufacturing and sustainable debris management, the next decade will define who leads this new frontier. Astronova provides the data, insights, and collaborative tools needed to navigate this transformation responsibly and inclusively.
          </p>
        </div>
      </section>

      {/* SECTION 3: ASTRONOVA IN ACTION */}
      <section className="bg-[#0E1525]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-4xl font-bold text-white">Astronova in Action</h2>
          <p className="mt-4 text-lg text-[#B8C1CC] max-w-3xl leading-relaxed">
            Explore our live prototype and join a growing community of innovators, or dive into our comprehensive white paper for the research and data foundations driving our mission.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            <a
              href={orbitHubUrl}
              className="group glass-card p-8 hover:bg-white/10 transition-all duration-300 block"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-xl">Orbit Hub</h3>
                <span className="text-[#32D9FA] group-hover:text-white text-2xl transition">↗</span>
              </div>
              <p className="mt-3 text-[#B8C1CC] leading-relaxed">
                A collaborative community for space entrepreneurs, researchers, and innovators to share datasets and insights.
              </p>
            </a>
            <a
              href={whitePaperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card p-8 hover:bg-white/10 transition-all duration-300 block"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-xl">White Paper</h3>
                <span className="text-[#32D9FA] group-hover:text-white text-2xl transition">↗</span>
              </div>
              <p className="mt-3 text-[#B8C1CC] leading-relaxed">
                Technical analysis, research foundations, and our vision for a sustainable LEO economy.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 4: JOIN THE NEXT ERA */}
      <section className="bg-[#070B16]">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Join the Next Era</h2>
          <p className="text-lg text-[#B8C1CC] italic max-w-2xl mx-auto mb-10">
            The future of Low-Earth Orbit is being built today — be part of it.
          </p>
          <a 
            href={prototypeUrl} 
            className="inline-flex items-center gap-2 px-10 py-5 text-lg font-semibold text-white bg-[#5E5BFF] rounded-xl hover:shadow-[0_0_30px_rgba(94,91,255,0.4)] transition-all duration-300 shadow-lg"
          >
            Explore Prototype ↗
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-[#5E5BFF]/20 shadow-[0_-1px_20px_rgba(94,91,255,0.1)]">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>© 2025 Astronova | Independent project inspired by NASA Space Apps</p>
            <div className="flex gap-4">
              <a href={prototypeUrl} className="hover:text-[#5E5BFF] transition">Demo</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#5E5BFF] transition">GitHub</a>
              <a href={orbitHubUrl} className="hover:text-[#5E5BFF] transition">Join</a>
              <a href="#" className="hover:text-[#5E5BFF] transition">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
