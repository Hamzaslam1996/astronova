import React from "react";
import {
  ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Area, Scatter, CartesianGrid,
} from "recharts";

/**
 * LaunchTimeline
 * - Pulls 14 days of upcoming launches from Launch Library 2.
 * - Shows daily cadence as an area sparkline + scatter dots for each launch.
 * - Looks great under the hero or in a 2-col grid next to LEOGlobe.
 */

type Launch = {
  id: string; name: string; net: string;
  launch_service_provider?: { name?: string };
  rocket?: { configuration?: { name?: string } };
};

type DayPoint = { date: string; count: number; launches: Launch[] };

function dateKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function LaunchTimeline() {
  const [data, setData] = React.useState<DayPoint[]>([]);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    const today = new Date();
    const end = new Date(today.getTime() + 14 * 86400000);
    const url = `https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=100&net__gte=${dateKey(
      today
    )}&net__lte=${dateKey(end)}&format=json`;

    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        const buckets = new Map<string, Launch[]>();
        for (let i = 0; i < 15; i++) {
          const day = new Date(today.getTime() + i * 86400000);
          buckets.set(dateKey(day), []);
        }
        (d?.results || []).forEach((l: Launch) => {
          const k = l.net?.slice(0, 10);
          if (buckets.has(k)) buckets.get(k)!.push(l);
        });
        const series: DayPoint[] = Array.from(buckets.entries()).map(([k, arr]) => ({
          date: k,
          count: arr.length,
          launches: arr,
        }));
        setData(series);
      })
      .catch(() => setErr("Launch Library unavailable (preview CORS/rate limit)."));
  }, []);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold">Launch cadence — next 14 days</h3>
      {err && <p className="text-amber-400 text-sm mt-2">{err}</p>}
      <div className="mt-2 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 12, right: 12, bottom: 8, left: 0 }}>
            <CartesianGrid vertical={false} stroke="#1f2937" />
            <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: "#0b1220", border: "1px solid #1f2937" }}
              labelStyle={{ color: "#e5e7eb" }}
              formatter={(v: any, _: any, p: any) => {
                const day = data[p?.payload?.index]?.launches || [];
                return [`${v} launches`, day.map(l => l.name).join(" • ") || "—"];
              }}
            />
            <Area type="monotone" dataKey="count" stroke="#93c5fd" fill="#1d4ed8" fillOpacity={0.25} />
            <Scatter dataKey="count" fill="#a5b4fc" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Source: Launch Library 2 (The Space Devs). Times/records may be updated.
      </p>
    </div>
  );
}
