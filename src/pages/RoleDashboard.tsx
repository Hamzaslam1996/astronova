import React from "react";
import { useRole } from "@/contexts/RoleContext";
import { roleViews } from "@/roleViews";
import { ROLE_LABEL } from "@/types/roles";
import UpcomingLaunches from "@/components/data/UpcomingLaunches";
import ISSExperiments from "@/components/data/ISSExperiments";

export default function RoleDashboard() {
  const { role } = useRole();
  const views = role ? roleViews[role] : [<UpcomingLaunches key="ll2" />, <ISSExperiments key="iss" />];
  
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Prototype Dashboard</h1>
        <p className="text-slate-300">{role ? `${ROLE_LABEL[role]} view` : "Select a role on the landing page or use ?role="}</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {views}
        </div>
      </div>
    </main>
  );
}
