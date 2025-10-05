import { useEffect, useState } from "react";
import { format } from "date-fns";
import { http, withFallback } from "@/lib/fetcher";
import { cached } from "@/lib/cache";
import { SOURCES } from "@/data/sources";
import { MOCK_LAUNCHES } from "@/data/mocks";
import Attribution from "@/components/Attribution";

interface Launch {
  id: string;
  name: string;
  net: string;
  launch_service_provider: {
    name: string;
  };
  rocket: {
    configuration: {
      name: string;
    };
  };
  pad: {
    name: string;
    location: {
      country_code: string;
      name: string;
    };
  };
}

interface LaunchResponse {
  results: Launch[];
}

export default function LiveLaunches({ onFallbackChange }: { onFallbackChange?: (used: boolean) => void }) {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const source = SOURCES.find(s => s.id === "launchlibrary2")!;

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, usedFallback } = await withFallback(
          () => cached<LaunchResponse>(
            source.id,
            source.cacheTtlMs,
            () => http<LaunchResponse>(source.url)
          ),
          { results: MOCK_LAUNCHES }
        );
        setLaunches(data.results || []);
        onFallbackChange?.(usedFallback);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-800 border-t-primary" />
          <p className="text-sm text-slate-400">Loading upcoming launches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-center">
        <p className="text-sm text-slate-400">
          Unable to load launches. Please try again later.
        </p>
        <p className="mt-2 text-xs text-slate-500">{error}</p>
      </div>
    );
  }

  if (launches.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-center">
        <p className="text-sm text-slate-400">No upcoming launches found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {launches.map((launch) => (
        <div
          key={launch.id}
          className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:bg-slate-900 transition"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-slate-100 leading-snug">
              {launch.name}
            </h3>
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
          </div>
          
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-slate-500">🕒</span>
              <span>
                {format(new Date(launch.net), "PPpp")}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-slate-500">🚀</span>
              <span>{launch.launch_service_provider.name}</span>
            </div>
            
            {launch.rocket?.configuration?.name && (
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-slate-500">🛸</span>
                <span>{launch.rocket.configuration.name}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-slate-500">📍</span>
              <span className="text-xs">
                {launch.pad.name} · {launch.pad.location.country_code}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
    <Attribution lines={[source.attribution]} />
    </>
  );
}
