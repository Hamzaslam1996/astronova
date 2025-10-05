import React, { useEffect, useState } from "react";
import { http, withFallback } from "@/lib/fetcher";
import { cached } from "@/lib/cache";
import { SOURCES } from "@/data/sources";
import { MOCK_ISS_NOW } from "@/data/mocks";
import { SNAPSHOT_MODE, SNAPSHOT_DATE } from "@/data/config";
import Attribution from "@/components/Attribution";

type Resp = { message: string; timestamp: number; iss_position: { latitude: string; longitude: string } };

export default function ISSNow({ onFallbackChange }: { onFallbackChange?: (used: boolean) => void }) {
  const src = SOURCES.find(s => s.id === "iss-now")!;
  const [data, setData] = useState<Resp | null>(null);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    const url = SNAPSHOT_MODE
      ? `/data/iss-now-sample.json`
      : src.url;
    withFallback(
      () => cached<Resp>(src.id, src.cacheTtlMs, async () => http<Resp>(url)),
      MOCK_ISS_NOW
    )
      .then(({ data, usedFallback }) => {
        setData(data);
        onFallbackChange?.(usedFallback);
      })
      .catch(e => setErr(String(e)));
  }, []);
  if (err) return <div className="text-sm text-red-300">ISS position unavailable.</div>;
  if (!data) return <div className="text-sm text-slate-300">Fetching ISS position…</div>;
  const { latitude, longitude } = data.iss_position;
  const when = new Date(data.timestamp * 1000).toLocaleString();
  return (
    <div className="space-y-2">
      <div className="text-slate-200">Lat: {latitude} · Lon: {longitude}</div>
      <div className="text-slate-400 text-xs">As of {when}</div>
      <Attribution lines={[src.attribution]} />
    </div>
  );
}
