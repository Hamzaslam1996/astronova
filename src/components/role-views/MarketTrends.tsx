import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function MarketTrends() {
  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          Market Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300">
        <p className="mb-4">Track emerging opportunities in the LEO economy.</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between p-2 bg-slate-800/50 rounded">
            <span>Manufacturing in Space</span>
            <span className="text-green-400">+15% YoY</span>
          </div>
          <div className="flex justify-between p-2 bg-slate-800/50 rounded">
            <span>Orbital Tourism</span>
            <span className="text-green-400">+28% YoY</span>
          </div>
          <div className="flex justify-between p-2 bg-slate-800/50 rounded">
            <span>Research Platforms</span>
            <span className="text-green-400">+12% YoY</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
