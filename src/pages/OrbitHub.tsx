import { Button } from "@/components/ui/button";
import { Users, Database, Globe, TrendingUp, FileText, BookOpen, Code, ChevronLeft, Rocket } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function OrbitHub() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Back to Home */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Community-Driven Initiative</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Orbit Hub (Seed)
          </h1>
          
          <p className="text-xl text-slate-300 mb-4">
            Independent community project inspired by NASA Space Apps Challenge 2025
          </p>
          
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-10">
            The open community platform built to extend the Astronova initiative beyond the hackathon — 
            connecting developers, researchers, investors, and policymakers to co-create open tools, 
            share datasets, and accelerate the commercialization and sustainability of Low-Earth Orbit.
          </p>

          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfhdVg4zb-sAnD_36LfruBOFQ4xNJNU_Ycgbe6Ic8Bzg9VQYQ/viewform?usp=dialog', '_blank')}
            >
              <Users className="w-5 h-5 mr-2" />
              Join the Hub
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">🌎 Mission</h2>
          <p className="text-lg text-slate-300 text-center">
            To unite the global space innovation community in building shared intelligence, APIs, 
            and standards for the emerging Low-Earth Orbit (LEO) economy.
          </p>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">🔭 Focus Areas</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <Database className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Data Infrastructure</h3>
              <p className="text-slate-300">
                APIs, schemas, and connectors for NASA Open Data, CelesTrak, Launch Library 2.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <TrendingUp className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Sustainability Metrics</h3>
              <p className="text-slate-300">
                Shared models for orbital debris and compliance tracking.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <FileText className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Policy Intelligence</h3>
              <p className="text-slate-300">
                Accessible frameworks for FAA/AST, FCC, and ODMSP alignment.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <Users className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Community Ecosystem</h3>
              <p className="text-slate-300">
                Partnerships between startups, researchers, and investors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">🧩 Modules (in development)</h2>
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900/60 border-b border-slate-800">
                <tr>
                  <th className="text-left p-4 text-slate-300 font-semibold">Module</th>
                  <th className="text-left p-4 text-slate-300 font-semibold">Description</th>
                  <th className="text-left p-4 text-slate-300 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="p-4 text-white font-medium">ROI Modeling</td>
                  <td className="p-4 text-slate-300">Economic forecasting for orbital ventures</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
                      🟢 Prototype
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-white font-medium">Sustainability Score</td>
                  <td className="p-4 text-slate-300">Debris + compliance index</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-sm">
                      🟡 In progress
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-white font-medium">Tender Tracker</td>
                  <td className="p-4 text-slate-300">Global LEO tenders & RFP aggregation</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">
                      🔵 Planned
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">🚀 Quick Links</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href="https://astronova.earth" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 transition"
            >
              <Globe className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <div className="text-white font-medium">Website</div>
                <div className="text-sm text-slate-400">astronova.earth</div>
              </div>
            </a>

            <a 
              href="/prototype" 
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 transition"
            >
              <Database className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <div className="text-white font-medium">Prototype Dashboard</div>
                <div className="text-sm text-slate-400">Live data feeds</div>
              </div>
            </a>

            <button
              onClick={() => navigate('/orbit-hub/charter')}
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 transition text-left w-full"
            >
              <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <div className="text-white font-medium">Charter</div>
                <div className="text-sm text-slate-400">Mission & governance</div>
              </div>
            </button>

            <button
              onClick={() => navigate('/orbit-hub/code-of-conduct')}
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 transition text-left w-full"
            >
              <FileText className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <div className="text-white font-medium">Code of Conduct</div>
                <div className="text-sm text-slate-400">Community standards</div>
              </div>
            </button>

            <button
              onClick={() => navigate('/orbit-hub/contributing')}
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 transition text-left w-full"
            >
              <Code className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <div className="text-white font-medium">Contributing</div>
                <div className="text-sm text-slate-400">How to help</div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Attribution */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">🪐 Attribution & Disclaimer</h2>
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4 text-slate-300">
            <p>
              Orbit Hub (Seed) is an <strong className="text-white">independent, community-driven initiative</strong> inspired 
              by the NASA Space Apps Challenge 2025.
            </p>
            <p>
              It is <strong className="text-white">not an official NASA program</strong> nor endorsed by NASA or its partners.
            </p>
            <p>
              All datasets and APIs used are <strong className="text-white">open and publicly available</strong>, including:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>NASA Open APIs</li>
              <li>CelesTrak Satellite Database</li>
              <li>Launch Library 2</li>
              <li>The Space Devs</li>
            </ul>
            <p className="text-sm text-slate-400 pt-4 border-t border-slate-800">
              © 2025 Astronova Team · Code licensed under MIT · Documentation licensed under CC BY 4.0.
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Join?</h2>
          <p className="text-lg text-slate-300 mb-8">
            Be part of the community building the future of Low-Earth Orbit commerce and sustainability.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfhdVg4zb-sAnD_36LfruBOFQ4xNJNU_Ycgbe6Ic8Bzg9VQYQ/viewform?usp=dialog', '_blank')}
            >
              <Users className="w-5 h-5 mr-2" />
              Join the Hub
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 border-primary/30 hover:bg-primary/10"
              onClick={() => navigate('/prototype')}
            >
              <Rocket className="w-5 h-5 mr-2" />
              Launch Prototype
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
