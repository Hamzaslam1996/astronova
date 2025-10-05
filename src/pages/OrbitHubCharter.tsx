import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Database, TrendingUp, FileText, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrbitHubCharter() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/orbit-hub')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orbit Hub
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Orbit Hub Charter
          </h1>
          <p className="text-xl text-slate-300">
            <strong>Mission:</strong> To accelerate the commercialization and sustainability of Low-Earth Orbit (LEO) 
            through open collaboration, shared data infrastructure, and transparent innovation.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Guiding Principles */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            🌍 Guiding Principles
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Open Data First</h3>
                  <p className="text-slate-300">Build on open NASA and partner datasets.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Transparency</h3>
                  <p className="text-slate-300">Publish all methodologies and schemas.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Collaboration</h3>
                  <p className="text-slate-300">Invite teams across disciplines and regions.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Sustainability</h3>
                  <p className="text-slate-300">Align development with orbital debris mitigation best practices.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 md:col-span-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Equity & Accessibility</h3>
                  <p className="text-slate-300">
                    Enable participation from emerging space nations and underrepresented groups.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Working Groups */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">🛠 Working Groups</h2>
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900/60 border-b border-slate-800">
                <tr>
                  <th className="text-left p-4 text-slate-300 font-semibold">Group</th>
                  <th className="text-left p-4 text-slate-300 font-semibold">Focus</th>
                  <th className="text-left p-4 text-slate-300 font-semibold">Leads (rotating)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-4 text-white font-medium">Data & Tech</td>
                  <td className="p-4 text-slate-300">APIs, schemas, analytics</td>
                  <td className="p-4 text-slate-300">Dev community</td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-4 text-white font-medium">Policy & Standards</td>
                  <td className="p-4 text-slate-300">Regulatory and safety integration</td>
                  <td className="p-4 text-slate-300">Researchers</td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-4 text-white font-medium">Outreach & Ecosystem</td>
                  <td className="p-4 text-slate-300">Community events, partnerships</td>
                  <td className="p-4 text-slate-300">Volunteers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Governance */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">🪙 Governance</h2>
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Operates as a <strong className="text-white">community-led, open-source project</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Maintains consensus via <strong className="text-white">GitHub Discussions and issues</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Elects <strong className="text-white">rotating volunteer coordinators every 6 months</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Maintains transparency via <strong className="text-white">open minutes and decision logs</strong>.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Membership */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">🤝 Membership</h2>
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Open to anyone aligned with this Charter.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Members agree to Code of Conduct and licensing terms.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Participation is voluntary and collaborative.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Attribution */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">🧾 Attribution</h2>
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
            <p className="text-slate-300 mb-3">
              Independent community project inspired by NASA Space Apps Challenge 2025.
            </p>
            <p className="text-slate-300 mb-3">
              Not an official NASA initiative.
            </p>
            <p className="text-slate-300">
              All data sources are open and public.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <Button 
            size="lg" 
            onClick={() => navigate('/orbit-hub')}
            className="text-lg px-8"
          >
            <Users className="w-5 h-5 mr-2" />
            Join Orbit Hub
          </Button>
        </section>
      </div>
    </div>
  );
}
