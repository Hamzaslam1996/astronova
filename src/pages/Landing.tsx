import React from "react";
import RoleSelector from "@/components/RoleSelector";
import { useRole } from "@/contexts/RoleContext";

export default function Landing({ onLaunch }: { onLaunch: () => void }) {
  const { role } = useRole();
  
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Astronova — Commercial LEO Insights</h1>
          <p className="mt-2 text-slate-300">Select your role to see insights most relevant to you.</p>
        </header>
        <RoleSelector />
        <div className="mt-6">
          <button
            className="px-5 py-2 rounded-xl border border-indigo-500 hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onLaunch}
            disabled={!role}
          >
            {role ? "Open Personalized Dashboard →" : "Select a role to continue"}
          </button>
        </div>
      </div>
    </main>
  );
}
