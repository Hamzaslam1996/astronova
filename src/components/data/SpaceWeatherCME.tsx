import React from "react";

type CME = { time21_5?: string; speed?: number; isMostAccurate?: boolean; halfAngle?: number; type?: string };

export default function SpaceWeatherCME() {
  const [items, setItems] = React.useState<CME[]>([]);
  const [err, setErr] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const today = new Date();
    const start = new Date(today.getTime() - 7 * 86400000); // last 7 days
    const fmt = (d: Date) => d.toISOString().slice(0,10);
    const url = `https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get/CME?startDate=${fmt(start)}&endDate=${fmt(today)}`;
    fetch(url)
      .then(r => r.json())
      .then((arr: any[]) => {
        const list = (arr || [])
          .map(a => (a?.cmeAnalyses || [])[0])
          .filter(Boolean)
          .slice(0, 6);
        setItems(list);
      })
      .catch(() => setErr("NASA DONKI CME feed unavailable (CORS or downtime)."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold">Space Weather — CMEs (7-day)</h3>
      {loading && <p className="text-slate-400 text-sm mt-2">Loading…</p>}
      {err && <p className="text-amber-400 text-sm mt-2">{err}</p>}
      {!loading && !err && (
        <ul className="mt-2 space-y-2 text-sm text-slate-200">
          {items.map((c, i) => (
            <li key={i} className="border border-slate-800 rounded-lg p-2">
              <div><span className="text-slate-400">Time:</span> {c.time21_5 || "—"}</div>
              <div><span className="text-slate-400">Speed:</span> {c.speed ? `${c.speed} km/s` : "—"}</div>
              <div><span className="text-slate-400">Half Angle:</span> {c.halfAngle ?? "—"}°</div>
              <div><span className="text-slate-400">Most Accurate:</span> {c.isMostAccurate ? "Yes" : "No"}</div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-xs text-slate-500">Source: NASA DONKI CME (last 7 days).</p>
    </div>
  );
}
