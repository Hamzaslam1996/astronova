import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function PolicyFeed() {
  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <FileText className="w-5 h-5 text-indigo-400" />
          Policy Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300">
        <p className="mb-4">Latest regulatory updates affecting LEO ventures.</p>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-slate-800/50 rounded">
            <div className="font-medium">Orbital Debris Mitigation Standards</div>
            <div className="text-xs text-slate-400 mt-1">Updated 3 days ago</div>
          </div>
          <div className="p-2 bg-slate-800/50 rounded">
            <div className="font-medium">Commercial LEO Licensing Framework</div>
            <div className="text-xs text-slate-400 mt-1">Updated 1 week ago</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
