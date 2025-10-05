export default function Legal() {
  return (
    <div className="max-w-5xl mx-auto p-6 text-sm text-slate-300 space-y-8">
      <div>
        <h1 className="text-xl text-white font-semibold">Legal & Disclosures</h1>
        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>Public demo for NASA Space Apps; no operational use.</li>
          <li>Live data credits shown on each widget; additional sources listed on this page.</li>
          <li>We cache responses briefly and may serve stale results if providers are unavailable.</li>
          <li>No scraping or bypass of access controls; only public endpoints are used.</li>
          <li>AI assistance used for code/text; all outputs reviewed by team (mark AI in deck/README).</li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg text-white font-semibold mb-3">Data Sources & Compliance</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-slate-800 rounded-lg overflow-hidden">
            <thead className="bg-slate-900/60 border-b border-slate-800">
              <tr>
                <th className="text-left p-3 text-xs font-semibold text-slate-300">Source ID</th>
                <th className="text-left p-3 text-xs font-semibold text-slate-300">Endpoint (public)</th>
                <th className="text-left p-3 text-xs font-semibold text-slate-300">Cache TTL</th>
                <th className="text-left p-3 text-xs font-semibold text-slate-300">Terms/Notes</th>
                <th className="text-left p-3 text-xs font-semibold text-slate-300">Attribution string</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="hover:bg-slate-900/40">
                <td className="p-3 text-sm text-slate-200">launchlibrary2</td>
                <td className="p-3 text-xs text-slate-300 break-all">
                  https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=8&format=json
                </td>
                <td className="p-3 text-sm text-slate-300">3 min</td>
                <td className="p-3 text-sm text-slate-300">Public API; attribution encouraged</td>
                <td className="p-3 text-sm text-slate-300">Data: Launch Library 2 by The Space Devs</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3 text-sm text-slate-200">celestrak-active</td>
                <td className="p-3 text-xs text-slate-300 break-all">
                  https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=csv
                </td>
                <td className="p-3 text-sm text-slate-300">10 min</td>
                <td className="p-3 text-sm text-slate-300">Public CSV; respect robots & cadence</td>
                <td className="p-3 text-sm text-slate-300">Data: CelesTrak Active Satellites</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3 text-sm text-slate-200">nasa-donki-cme</td>
                <td className="p-3 text-xs text-slate-300 break-all">
                  https://api.nasa.gov/DONKI/CME?...&api_key=DEMO_KEY
                </td>
                <td className="p-3 text-sm text-slate-300">10 min</td>
                <td className="p-3 text-sm text-slate-300">NASA API; DEMO_KEY for demo use</td>
                <td className="p-3 text-sm text-slate-300">Data: NASA DONKI (DEMO_KEY)</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3 text-sm text-slate-200">iss-now</td>
                <td className="p-3 text-xs text-slate-300 break-all">
                  https://api.open-notify.org/iss-now.json
                </td>
                <td className="p-3 text-sm text-slate-300">1 min</td>
                <td className="p-3 text-sm text-slate-300">Public endpoint</td>
                <td className="p-3 text-sm text-slate-300">Data: Open Notify ISS position</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="list-disc pl-5 mt-4 space-y-2">
          <li>We set a polite User-Agent and modest TTLs; stale-on-error may be served.</li>
          <li>Attribution is visible in each widget. This is a public demo; no commercial use.</li>
        </ul>
      </div>
    </div>
  );
}
