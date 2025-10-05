import React from "react";
import RoleSelector from "@/components/RoleSelector";
import { useRole } from "@/contexts/RoleContext";
import { roleViews } from "@/roleViews";
import { ROLE_LABEL } from "@/types/roles";

export default function Dashboard() {
  const { role } = useRole();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Astronova Dashboard</h1>
          <p className="text-slate-300">Personalize your view by selecting your role.</p>
        </header>

        <RoleSelector />

        <section className="mt-6 space-y-3">
          {!role ? (
            <div className="card">Select a role above to load focused content.</div>
          ) : (
            <>
              <h2 className="text-xl font-semibold">{ROLE_LABEL[role]} view</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roleViews[role]}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
