import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function Placeholder({ title = "Coming Soon" }: { title?: string }) {
  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Construction className="w-5 h-5 text-slate-400" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-slate-400">
        <p>This module is under development and will be available soon.</p>
      </CardContent>
    </Card>
  );
}
