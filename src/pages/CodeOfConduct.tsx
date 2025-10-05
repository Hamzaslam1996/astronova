import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, CheckCircle, XCircle, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CodeOfConduct() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/orbit-hub')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orbit Hub
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Code of Conduct
            </h1>
          </div>
          
          <p className="text-xl text-slate-300">
            Orbit Hub (Seed) is committed to a respectful, inclusive, and transparent community.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Our Pledge */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Our Pledge</h2>
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
            <p className="text-lg text-slate-300">
              We pledge to make participation a harassment-free experience for everyone, regardless of 
              gender, age, race, ethnicity, nationality, or background.
            </p>
          </div>
        </section>

        {/* Standards */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Standards</h2>
          
          <div className="space-y-4">
            <div className="rounded-2xl border border-green-800/50 bg-green-900/20 p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-lg text-slate-200">
                  Be respectful and supportive.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-lg text-slate-200">
                  Credit all data and code sources.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-red-800/50 bg-red-900/20 p-6">
              <div className="flex items-start gap-3 mb-4">
                <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <p className="text-lg text-slate-200">
                  No harassment, spam, or discriminatory behavior.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <p className="text-lg text-slate-200">
                  No misrepresentation of NASA or partner organizations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enforcement */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Enforcement</h2>
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-lg text-slate-300">
                Report unacceptable behavior to:{" "}
                <a 
                  href="mailto:team@astronova.earth" 
                  className="text-primary hover:underline"
                >
                  team@astronova.earth
                </a>
              </p>
            </div>
            <p className="text-lg text-slate-300">
              Core maintainers will review and act within 72 hours.
            </p>
          </div>
        </section>

        {/* Attribution */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Attribution</h2>
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
            <p className="text-slate-300">
              Adapted from{" "}
              <a 
                href="https://www.contributor-covenant.org/version/2/1/code_of_conduct/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Contributor Covenant v2.1
              </a>
              .
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
            Back to Orbit Hub
          </Button>
        </section>
      </div>
    </div>
  );
}
