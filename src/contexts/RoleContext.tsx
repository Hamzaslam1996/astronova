import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { UserRole } from "@/types/roles";

type RoleCtx = {
  role: UserRole | null;
  setRole: (r: UserRole) => void;
  clearRole: () => void;
};

const Ctx = createContext<RoleCtx | undefined>(undefined);
const STORAGE_KEY = "astronova.userRole";

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole | null>(null);

  // read from URL ?role= and localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("role") as UserRole | null;
    const fromStore = (localStorage.getItem(STORAGE_KEY) || "") as UserRole;
    if (fromUrl) {
      setRoleState(fromUrl);
      localStorage.setItem(STORAGE_KEY, fromUrl);
    } else if (fromStore) {
      setRoleState(fromStore);
    }
  }, []);

  const api = useMemo<RoleCtx>(() => ({
    role,
    setRole: (r) => {
      setRoleState(r);
      localStorage.setItem(STORAGE_KEY, r);
    },
    clearRole: () => {
      setRoleState(null);
      localStorage.removeItem(STORAGE_KEY);
    },
  }), [role]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useRole() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useRole must be used within <RoleProvider>");
  return ctx;
}
