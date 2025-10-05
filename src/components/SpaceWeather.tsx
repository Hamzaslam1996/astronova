import React, { useEffect, useState } from "react";
import { http, withFallback } from "@/lib/fetcher";
import { cached } from "@/lib/cache";
import { SOURCES } from "@/data/sources";
import { MOCK_DONKI_CME } from "@/data/mocks";
import { SNAPSHOT_MODE, SNAPSHOT_DATE } from "@/data/config";
import Attribution from "@/components/Attribution";

type Cme = { startTime?: string; note?: string; sourceLocation?: string; catalog?: string; cmeAnalyses?: any[] };

export default function SpaceWeather({ onFallbackChange }: { onFallbackChange?: (used: boolean) => void }) {
  const src = SOURCES.find(s => s.id === "nasa-donki-cme")!;
  const [data, setData] = useState<Cme[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    const url = SNAPSHOT_MODE
      ? `/data/donki-cme-${SNAPSHOT_DATE}.json`
      : src.url;
    withFallback(
      () => cached<Cme[]>(src.id, src.cacheTtlMs, async () => http<Cme[]>(url)),
      MOCK_DONKI_CME
    )
      .then(({ data, usedFallback }) => {
        setData(data);
        onFallbackChange?.(usedFallback);
      })
      .catch(e => setErr(String(e)));
  }, []);
  if (err) return <ErrorBox msg={err} src={src} />;
  if (!data) return <LoadingBox label="Loading space weather (CME)..." />;
  const items = [...data].sort((a,b)=> (b.startTime||"").localeCompare(a.startTime||"")).slice(0,6);
  return (
    <div className="space-y-3">
      <ul className="grid sm:grid-cols-2 gap-3">
        {items.map((c,i)=>(
          <li key={i} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="text-sm text-slate-200">{c.startTime?.replace("T"," ") || "—"}</div>
            <div className="text-xs text-slate-400 mt-1">
              Source: {c.sourceLocation || "Unknown"} · Catalog: {c.catalog || "—"}
            </div>
            {c.note && <div className="text-sm mt-2 text-slate-300 line-clamp-3">{c.note}</div>}
          </li>
        ))}
      </ul>
      <Attribution lines={[src.attribution]} />
    </div>
  );
}

function LoadingBox({label}:{label:string}) {
  return <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300">{label}</div>;
}
function ErrorBox({msg, src}:{msg:string; src:any}) {
  return (
    <div className="rounded-xl border border-red-700 bg-red-900/20 p-4 text-sm">
      <div className="text-red-300">Space weather feed unavailable. Showing no data.</div>
      <div className="text-slate-400 mt-1 break-all">{src?.url}</div>
      <div className="text-slate-500 mt-1">{msg}</div>
    </div>
  );
}
