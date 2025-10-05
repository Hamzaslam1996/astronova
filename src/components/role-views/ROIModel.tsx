import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function ROIModel() {
  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <BarChart3 className="w-5 h-5 text-indigo-400" />
          ROI Modeling
        </CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300">
        <p className="mb-4">Analyze potential returns on orbital ventures.</p>
        <div className="space-y-3">
          <div>
            <div className="text-sm text-slate-400 mb-1">Avg. Launch Cost</div>
            <div className="text-2xl font-semibold text-white">$2.5M</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Expected 5Y Return</div>
            <div className="text-2xl font-semibold text-green-400">320%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
