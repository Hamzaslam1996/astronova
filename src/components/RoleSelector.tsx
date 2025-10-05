import React from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import type { UserRole } from "@/types/roles";
import { ROLE_LABEL } from "@/types/roles";

const ROLES: UserRole[] = ["agency", "investor", "entrepreneur", "business"];

export default function RoleSelector({ onChosen }: { onChosen?: () => void }) {
  const { role, setRole } = useRole();
  const navigate = useNavigate();

  function choose(r: UserRole) {
    setRole(r);
    // Immediately open dashboard
    if (onChosen) {
      onChosen();
    } else {
      // Navigate to dashboard with role parameter
      navigate(`/dashboard?role=${r}`);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {ROLES.map((r) => (
        <button
          key={r}
          onClick={() => choose(r)}
          className={`group rounded-2xl border p-4 text-left transition
            ${role === r ? "bg-slate-900 ring-1 ring-indigo-400 border-slate-700" : "bg-slate-950 border-slate-800 hover:border-slate-600"}`}
          aria-pressed={role === r}
        >
          <div className="text-sm text-slate-300 font-semibold">{ROLE_LABEL[r]}</div>
          <div className="text-xs text-slate-400 mt-1">Personalize Astronova for your needs.</div>
        </button>
      ))}
    </div>
  );
}
