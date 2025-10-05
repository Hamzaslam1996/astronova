export type Source = {
  id: string;
  name: string;
  url: string;
  terms?: string;
  attribution: string; // visible credit
  cacheTtlMs: number;
};

const SUPABASE_URL = "https://lnkfrqaguykoeunevdgx.supabase.co";

export const SOURCES: Source[] = [
  {
    id: "launchlibrary2",
    name: "Launch Library 2 (The Space Devs)",
    url: `${SUPABASE_URL}/functions/v1/launches-proxy`,
    terms: "https://thespacedevs.com/llapi",
    attribution: "Data: Launch Library 2 by The Space Devs",
    cacheTtlMs: 3 * 60 * 1000, // 3 minutes
  },
  {
    id: "celestrak-active",
    name: "CelesTrak Active Satellites CSV",
    url: `${SUPABASE_URL}/functions/v1/celestrak-active`,
    terms: "https://celestrak.org/webmaster.php",
    attribution: "Data: CelesTrak Active Satellites",
    cacheTtlMs: 10 * 60 * 1000, // 10 minutes
  },
  {
    id: "nasa-donki-cme",
    name: "NASA DONKI – Coronal Mass Ejections",
    url: `${SUPABASE_URL}/functions/v1/donki-cme`,
    terms: "https://api.nasa.gov/",
    attribution: "Data: NASA DONKI",
    cacheTtlMs: 10 * 60 * 1000,
  },
  {
    id: "iss-now",
    name: "Open Notify – ISS Now",
    url: `${SUPABASE_URL}/functions/v1/iss-now`,
    terms: "http://open-notify.org/Open-Notify-API/ISS-Location-Now/",
    attribution: "Data: Open Notify ISS position",
    cacheTtlMs: 60 * 1000,
  },
  // add new feeds here in one place
];
