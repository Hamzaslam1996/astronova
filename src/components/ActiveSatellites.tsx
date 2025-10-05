import { useEffect, useState, useMemo } from "react";
import { Search } from "lucide-react";
import { http, withFallback } from "@/lib/fetcher";
import { cached } from "@/lib/cache";
import { SOURCES } from "@/data/sources";
import { MOCK_CELESTRAK_CSV } from "@/data/mocks";
import { SNAPSHOT_MODE, SNAPSHOT_DATE } from "@/data/config";
import Attribution from "@/components/Attribution";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SatelliteData {
  OBJECT_NAME: string;
  OPERATOR: string;
  LAUNCH_DATE: string;
  PERIOD: string;
  INCLINATION: string;
  APOAPSIS: string;
  PERIAPSIS: string;
  OBJECT_TYPE: string;
}

interface SummaryStats {
  total: number;
  medianInclination: number;
  medianPeriod: number;
  typeCount: Record<string, number>;
}

function parseCSV(text: string): SatelliteData[] {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  const data: SatelliteData[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    data.push(row as SatelliteData);
  }
  
  return data;
}

function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function calculateStats(data: SatelliteData[]): SummaryStats {
  const inclinations = data
    .map(d => parseFloat(d.INCLINATION))
    .filter(v => !isNaN(v));
  
  const periods = data
    .map(d => parseFloat(d.PERIOD))
    .filter(v => !isNaN(v));
  
  const typeCount: Record<string, number> = {};
  data.forEach(d => {
    const type = d.OBJECT_TYPE || 'Unknown';
    typeCount[type] = (typeCount[type] || 0) + 1;
  });
  
  return {
    total: data.length,
    medianInclination: calculateMedian(inclinations),
    medianPeriod: calculateMedian(periods),
    typeCount,
  };
}

export default function ActiveSatellites({ onFallbackChange }: { onFallbackChange?: (used: boolean) => void }) {
  const [satellites, setSatellites] = useState<SatelliteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const source = SOURCES.find(s => s.id === "celestrak-active")!;

  useEffect(() => {
    const fetchSatellites = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = SNAPSHOT_MODE
          ? `/data/active-satellites-${SNAPSHOT_DATE}.csv`
          : source.url;
        const { data: text, usedFallback } = await withFallback(
          () => cached<string>(
            source.id,
            source.cacheTtlMs,
            () => http<string>(url)
          ),
          MOCK_CELESTRAK_CSV
        );
        const data = parseCSV(text);
        setSatellites(data);
        onFallbackChange?.(usedFallback);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSatellites();
  }, []);

  const stats = useMemo(() => calculateStats(satellites), [satellites]);

  const objectTypes = useMemo(() => {
    const types = new Set(satellites.map(s => s.OBJECT_TYPE).filter(Boolean));
    return Array.from(types).sort();
  }, [satellites]);

  const filteredSatellites = useMemo(() => {
    return satellites.filter(sat => {
      const matchesSearch = 
        sat.OBJECT_NAME?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sat.OPERATOR?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = 
        typeFilter === "all" || sat.OBJECT_TYPE === typeFilter;
      
      return matchesSearch && matchesType;
    });
  }, [satellites, searchTerm, typeFilter]);

  const totalPages = Math.ceil(filteredSatellites.length / pageSize);
  const paginatedSatellites = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSatellites.slice(start, start + pageSize);
  }, [filteredSatellites, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-800 border-t-primary" />
          <p className="text-sm text-slate-400">Loading satellite data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-center">
        <p className="text-sm text-slate-400">
          Unable to load satellite data. Please try again later.
        </p>
        <p className="mt-2 text-xs text-slate-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-xs text-slate-400">Total Satellites</p>
          <p className="text-2xl font-bold text-white mt-1">
            {stats.total.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-xs text-slate-400">Median Inclination</p>
          <p className="text-2xl font-bold text-white mt-1">
            {stats.medianInclination.toFixed(1)}°
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-xs text-slate-400">Median Period</p>
          <p className="text-2xl font-bold text-white mt-1">
            {stats.medianPeriod.toFixed(1)} min
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-xs text-slate-400">Object Types</p>
          <p className="text-2xl font-bold text-white mt-1">
            {Object.keys(stats.typeCount).length}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by name or operator..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-slate-900/40 border-slate-800"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-slate-900/40 border-slate-800">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {objectTypes.map(type => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/60 border-b border-slate-800">
              <tr>
                <th className="text-left p-3 text-xs font-semibold text-slate-300">Name</th>
                <th className="text-left p-3 text-xs font-semibold text-slate-300">Operator</th>
                <th className="text-left p-3 text-xs font-semibold text-slate-300">Type</th>
                <th className="text-right p-3 text-xs font-semibold text-slate-300">Incl (°)</th>
                <th className="text-right p-3 text-xs font-semibold text-slate-300">Period (min)</th>
                <th className="text-right p-3 text-xs font-semibold text-slate-300">Ap (km)</th>
                <th className="text-right p-3 text-xs font-semibold text-slate-300">Pe (km)</th>
                <th className="text-left p-3 text-xs font-semibold text-slate-300">Launch Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {paginatedSatellites.map((sat, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition">
                  <td className="p-3 text-sm text-slate-200">{sat.OBJECT_NAME}</td>
                  <td className="p-3 text-sm text-slate-300">{sat.OPERATOR || '-'}</td>
                  <td className="p-3 text-xs text-slate-400">{sat.OBJECT_TYPE || '-'}</td>
                  <td className="p-3 text-sm text-slate-300 text-right">
                    {parseFloat(sat.INCLINATION).toFixed(1)}
                  </td>
                  <td className="p-3 text-sm text-slate-300 text-right">
                    {parseFloat(sat.PERIOD).toFixed(1)}
                  </td>
                  <td className="p-3 text-sm text-slate-300 text-right">
                    {parseFloat(sat.APOAPSIS).toFixed(0)}
                  </td>
                  <td className="p-3 text-sm text-slate-300 text-right">
                    {parseFloat(sat.PERIAPSIS).toFixed(0)}
                  </td>
                  <td className="p-3 text-sm text-slate-300">{sat.LAUNCH_DATE || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Showing {((currentPage - 1) * pageSize) + 1} to{" "}
          {Math.min(currentPage * pageSize, filteredSatellites.length)} of{" "}
          {filteredSatellites.length} satellites
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      <Attribution lines={[source.attribution]} />
    </div>
  );
}
