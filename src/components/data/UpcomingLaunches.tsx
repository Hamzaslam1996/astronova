import React from "react";

type Launch = {
  id: string;
  name: string;
  net: string; // launch time
  launch_service_provider?: { name?: string };
  rocket?: { configuration?: { name?: string } };
  pad?: { name?: string; location?: { name?: string } };
  mission?: { type?: string };
};

export default function UpcomingLaunches() {
  const [items, setItems] = React.useState<Launch[]>([]);
  const [err, setErr] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const url = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10&format=json";
    fetch(url)
      .then(r => r.json())
      .then(d => setItems(d?.results || []))
      .catch(() => setErr("Could not load Launch Library (browser CORS or rate limit)."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold">Upcoming Launches</h3>
      {loading && <p className="text-slate-400 text-sm mt-2">Loading…</p>}
      {err && <p className="text-amber-400 text-sm mt-2">{err}</p>}
      {!loading && !err && (
        <ul className="mt-3 space-y-2 text-sm text-slate-200">
          {items.slice(0, 6).map(l => (
            <li key={l.id} className="border border-slate-800 rounded-lg p-2">
              <div className="font-medium">{l.name}</div>
              <div className="text-slate-400">
                {l.net} • {l.launch_service_provider?.name} • {l.rocket?.configuration?.name}
              </div>
              <div className="text-slate-400">
                {l.mission?.type || "Mission"} • {l.pad?.location?.name} ({l.pad?.name})
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-xs text-slate-500">
        Source: Launch Library 2 (The Space Devs). For demo only; may be delayed or incomplete.
      </p>
    </div>
  );
}
