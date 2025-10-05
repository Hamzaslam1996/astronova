import { AlertCircle } from "lucide-react";

export default function FallbackBanner() {
  return (
    <div className="rounded-xl border border-yellow-600 bg-yellow-900/20 p-4 mb-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-yellow-200">
          <strong className="font-semibold">Live feeds unreachable in preview</strong>
          <span className="text-yellow-300"> — showing sample data. Links and attribution unchanged.</span>
        </div>
      </div>
    </div>
  );
}
