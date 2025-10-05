import React from "react";

export default function EntrepreneurHeader({
  onApplyVoucher = () => {},
  onOpenOnboarding = () => {},
  onFindProvider = () => {},
}: {
  onApplyVoucher?: () => void;
  onOpenOnboarding?: () => void;
  onFindProvider?: () => void;
}) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-indigo-900/20 p-5 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
        Build in LEO with lower friction
      </h2>
      <p className="mt-1 text-slate-300">
        Funding windows, onboarding, and partners—everything you need to run your first mission.
      </p>

      {/* Goals / value chips */}
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
          ⏱️ Time-to-Onboard: <strong>&lt; 8 weeks</strong> (target)
        </span>
        <span className="px-2 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
          💸 Voucher Savings: <strong>20–30%</strong> (typical)
        </span>
        <span className="px-2 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
          ✅ First-Mission Success: <strong>&gt; 90%</strong> (target)
        </span>
      </div>

      {/* Primary CTAs */}
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={onApplyVoucher}
          className="px-4 py-2 rounded-xl border border-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 transition"
        >
          Apply for Voucher
        </button>
        <button
          onClick={onOpenOnboarding}
          className="px-4 py-2 rounded-xl border border-slate-700 hover:border-slate-500 transition"
        >
          Download Onboarding Kit
        </button>
        <button
          onClick={onFindProvider}
          className="px-4 py-2 rounded-xl border border-slate-700 hover:border-slate-500 transition"
        >
          Find a Provider
        </button>
      </div>

      {/* Helpful hint */}
      <p className="mt-3 text-xs text-slate-400">
        Tip: Start with a voucher call in your domain, then follow the onboarding checklist before you pick a flight window.
      </p>
    </section>
  );
}
