import React from "react";
import LEOGlobe from "@/components/visuals/LEOGlobe";
import LaunchTimeline from "@/components/visuals/LaunchTimeline";

export default function OrbitHubHome() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Orbit Hub (Seed)</h1>
        <p className="mt-2 text-slate-300">
          Community platform to co-create tools, datasets, and standards for the Commercial LEO economy.
        </p>
        <div className="mt-6">
          <LEOGlobe />
        </div>
      </section>

      {/* LIVE INSIGHTS */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LaunchTimeline />
          {/* You can add another card here (e.g., your DataDashboard or SpaceWeatherCME). */}
        </div>
      </section>
    </main>
  );
}
