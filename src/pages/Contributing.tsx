import { Button } from "@/components/ui/button";
import { ArrowLeft, GitFork, GitPullRequest, MessageSquare, FileText, Code, Database, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Contributing() {
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
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contributing to Orbit Hub
          </h1>
          
          <p className="text-xl text-slate-300">
            Thank you for helping grow the Orbit Hub community! 🚀
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* How to Contribute */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">How to Contribute</h2>
          
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GitFork className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Fork the repository</h3>
                  <p className="text-slate-300">Create your branch and work on your contribution.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GitPullRequest className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Submit pull requests</h3>
                  <p className="text-slate-300">Include clear summaries of your changes.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Open issues</h3>
                  <p className="text-slate-300">Use templates provided in <code className="text-primary bg-slate-800 px-2 py-1 rounded">.github/ISSUE_TEMPLATE</code>.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Discuss ideas</h3>
                  <p className="text-slate-300">Join conversations in GitHub Discussions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ways to Contribute */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Ways to Contribute</h2>
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Code className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-slate-300">
                  Submit new module ideas (ROI, sustainability, tenders, etc.).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-slate-300">
                  Improve documentation or data schemas.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Database className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-slate-300">
                  Add NASA or partner dataset connectors.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-slate-300">
                  Host or record educational sessions.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Attribution */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Attribution</h2>
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
            <p className="text-slate-300">
              Orbit Hub (Seed) is an independent, community-driven initiative inspired by the NASA Space Apps Challenge 2025.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <div className="space-y-4">
            <Button 
              size="lg" 
              onClick={() => window.open('https://github.com/astronova/orbit-hub-seed', '_blank')}
              className="text-lg px-8"
            >
              View on GitHub
            </Button>
            <div>
              <Button 
                variant="ghost"
                onClick={() => navigate('/orbit-hub')}
              >
                Back to Orbit Hub
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
