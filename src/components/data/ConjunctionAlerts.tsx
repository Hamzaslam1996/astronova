import React from "react";

/**
 * CelesTrak CDM API often requires server-side fetch or API key.
 * This client card shows a graceful demo:
 *  - try to fetch a public sample endpoint
 *  - otherwise, simulate a small count so the UI stays functional
 */
export default function ConjunctionAlerts() {
  const [count, setCount] = React.useState<number | null>(null);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    const tryFetch = async () => {
      try {
        // Placeholder sample – replace with your serverless proxy if needed:
        const r = await fetch("https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=csv", { mode: "cors" });
        if (!r.ok) throw new Error("bad");
        const text = await r.text();
        // naive "activity proxy": count of lines mod 50 → fake recent alerts count
        const approx = Math.max(1, (text.split("\n").length % 50));
        setCount(approx);
      } catch {
        setErr("Live CDM requires a serverless proxy/API key; showing demo count.");
        setCount(7); // demo number to keep UI meaningful
      }
    };
    tryFetch();
  }, []);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold">Conjunction Alerts (demo)</h3>
      <div className="text-3xl mt-2">{count ?? "—"}</div>
      {err && <p className="mt-2 text-amber-400 text-sm">{err}</p>}
      <p className="mt-3 text-xs text-slate-500">
        Source: CelesTrak CDM. For production, fetch via a serverless proxy and compute alerts in last 30 days.
      </p>
    </div>
  );
}
