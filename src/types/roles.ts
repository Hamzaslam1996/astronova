export type UserRole = "agency" | "investor" | "entrepreneur" | "business";

export const ROLE_LABEL: Record<UserRole, string> = {
  agency: "Agency / Policy Partner",
  investor: "Investor / Venture",
  entrepreneur: "Entrepreneur / Startup",
  business: "Business / Operator",
};

