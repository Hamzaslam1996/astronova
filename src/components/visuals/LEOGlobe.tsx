import React from "react";
import Globe from "react-globe.gl";
import * as satellite from "satellite.js";

/**
 * LEOGlobe
 * - Renders a few dozen satellites from CelesTrak (fallback to curated TLEs if CORS/rate-limit).
 * - Updates positions every ~5s; keeps performance-friendly particle points.
 * - Perfect for a hero/feature strip under your Orbit Hub headline.
 */

type TLE = { name: string; line1: string; line2: string };
type SatPoint = { name: string; lat: number; lng: number; alt: number };

const SAMPLE_TLES: TLE[] = [
  // Minimal curated set as fallback (ISS, Hubble, Sentinel, Terra, NOAA-20, etc.)
  {
    name: "ISS (ZARYA)",
    line1: "1 25544U 98067A   24277.51736111  .00018063  00000+0  32245-3 0  9994",
    line2: "2 25544  51.6416  16.9287 0006652  64.4216  61.1950 15.50461969639158",
  },
  {
    name: "HUBBLE SPACE TELESCOPE",
    line1: "1 20580U 90037B   24276.86335648  .00000808  00000+0  40475-4 0  9991",
    line2: "2 20580  28.4695  44.9604 0002859  98.9217 261.2228 15.09383944556103",
  },
  // add a few more well-known LEO birds for fallback
];

function tleToLatLngAlt(tle: TLE, when = new Date()): SatPoint | null {
  try {
    const satrec = satellite.twoline2satrec(tle.line1, tle.line2);
    const posVel = satellite.propagate(satrec, when);
    if (!posVel.position) return null;
    const gmst = satellite.gstime(when);
    const geo = satellite.eciToGeodetic(posVel.position as satellite.EciVec3<number>, gmst);
    const lat = satellite.radiansToDegrees(geo.latitude);
    const lng = satellite.radiansToDegrees(geo.longitude);
    const alt = geo.height; // km
    return { name: tle.name, lat, lng, alt };
  } catch {
    return null;
  }
}

export default function LEOGlobe() {
  const globeRef = React.useRef<any>(null);
  const [points, setPoints] = React.useState<SatPoint[]>([]);
  const [err, setErr] = React.useState<string | null>(null);

  // fetch a small list for performance; you can switch GROUP=visual if desired
  React.useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(
          "https://celestrak.org/NORAD/elements/gp.php?GROUP=visual&FORMAT=tle"
        );
        const text = await res.text();
        const raw = text.trim().split("\n");
        const tles: TLE[] = [];
        for (let i = 0; i < raw.length - 2; i += 3) {
          tles.push({ name: raw[i].trim(), line1: raw[i + 1].trim(), line2: raw[i + 2].trim() });
          if (tles.length >= 60) break; // cap ~60 sats for perf
        }
        if (!tles.length) throw new Error("Empty TLE set");
        // initial positions
        setPoints(
          tles
            .map((t) => tleToLatLngAlt(t))
            .filter(Boolean) as SatPoint[]
        );
        // periodic updates
        const id = setInterval(() => {
          setPoints(
            tles
              .map((t) => tleToLatLngAlt(t))
              .filter(Boolean) as SatPoint[]
          );
        }, 5000);
        return () => clearInterval(id);
      } catch {
        setErr("Live TLE fetch blocked; showing fallback satellites.");
        // fallback positions
        setPoints(SAMPLE_TLES.map((t) => tleToLatLngAlt(t)).filter(Boolean) as SatPoint[]);
      }
    };
    run();
  }, []);

  return (
    <div className="relative rounded-2xl border border-slate-800 overflow-hidden">
      <Globe
        ref={globeRef}
        height={420}
        backgroundColor="#0b1220"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        pointsData={points}
        pointAltitude={(d: any) => Math.min(0.02, Math.max(0.005, d.alt / 2000))}
        pointColor={() => "#a5b4fc"} // indigo-300
        pointRadius={0.35}
        atmosphereColor="#93c5fd"
        atmosphereAltitude={0.18}
        labelsData={points.slice(0, 12)} // show a few labels to avoid clutter
        labelText="name"
        labelSize={1.2}
        labelColor={() => "rgba(229,231,235,0.85)"} // slate-200
      />
      <div className="absolute bottom-2 left-2 text-xs text-slate-400">
        Source: CelesTrak + satellite.js (positions approximated).
      </div>
      {err && (
        <div className="absolute top-2 right-2 text-[11px] px-2 py-1 rounded bg-amber-500/20 border border-amber-400 text-amber-200">
          {err}
        </div>
      )}
    </div>
  );
}
