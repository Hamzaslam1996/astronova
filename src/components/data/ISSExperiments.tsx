import React from "react";
import { parseCsvLoose } from "@/utils/csv";

// NASA ISS Research Explorer CSV (public)
const CSV_URL =
  "https://www.nasa.gov/sites/default/files/atoms/files/iss-research-experiments.csv";

type Row = {
  title: string;
  investigator: string;
  organization: string;
  category: string;
  start: string;
};

export default function ISSExperiments() {
  const [rows, setRows] = React.useState<Row[]>([]);
  const [err, setErr] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [q, setQ] = React.useState("");

  React.useEffect(() => {
    fetch(CSV_URL)
      .then(r => r.text())
      .then(t => {
        const grid = parseCsvLoose(t);
        const header = grid[0].map(h => h.toLowerCase());
        const getIdx = (key: string) => header.findIndex(h => h.includes(key));
        const idxTitle = getIdx("title");
        const idxPI = getIdx("principal") >= 0 ? getIdx("principal") : getIdx("investigator");
        const idxOrg = getIdx("organization");
        const idxCat = getIdx("research area") >= 0 ? getIdx("research area") : getIdx("category");
        const idxStart = getIdx("start");
        const data: Row[] = grid.slice(1, 151).map(r => ({
          title: r[idxTitle] || "",
          investigator: r[idxPI] || "",
          organization: r[idxOrg] || "",
          category: r[idxCat] || "",
          start: r[idxStart] || "",
        }));
        setRows(data.filter(r => r.title));
      })
      .catch(() => setErr("Could not load ISS Research CSV (CORS/network)."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = rows.filter(r =>
    [r.title, r.investigator, r.organization, r.category]
      .join(" ")
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  return (
    <div className="card">
      <h3 className="text-lg font-semibold">ISS Research Experiments (sample)</h3>
      <input
        className="mt-2 w-full rounded-md bg-slate-800/60 px-3 py-2 text-sm"
        placeholder="Search title, PI, organization…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {loading && <p className="text-slate-400 text-sm mt-2">Loading…</p>}
      {err && <p className="text-amber-400 text-sm mt-2">{err}</p>}
      {!loading && !err && (
        <div className="mt-3 overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-slate-300">
              <tr>
                <th className="text-left pr-2 py-1">Title</th>
                <th className="text-left pr-2 py-1">PI</th>
                <th className="text-left pr-2 py-1">Org</th>
                <th className="text-left pr-2 py-1">Category</th>
                <th className="text-left pr-2 py-1">Start</th>
              </tr>
            </thead>
            <tbody className="text-slate-200">
              {filtered.slice(0, 12).map((r, i) => (
                <tr key={i} className="border-t border-slate-800">
                  <td className="py-1 pr-2">{r.title}</td>
                  <td className="py-1 pr-2">{r.investigator}</td>
                  <td className="py-1 pr-2">{r.organization}</td>
                  <td className="py-1 pr-2">{r.category}</td>
                  <td className="py-1 pr-2">{r.start}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-3 text-xs text-slate-500">
        Source: NASA ISS Research Explorer CSV (sampled for demo).
      </p>
    </div>
  );
}
