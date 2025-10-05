import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket } from "lucide-react";

export default function VoucherCalls() {
  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Ticket className="w-5 h-5 text-indigo-400" />
          Voucher Calls
        </CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300">
        <p className="mb-4">Active funding opportunities for startups.</p>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-slate-800/50 rounded border-l-2 border-indigo-500">
            <div className="font-medium">NASA SBIR Phase I</div>
            <div className="text-xs text-slate-400 mt-1">Deadline: March 15, 2025</div>
            <div className="text-xs text-indigo-400 mt-1">Up to $150,000</div>
          </div>
          <div className="p-3 bg-slate-800/50 rounded border-l-2 border-indigo-500">
            <div className="font-medium">ESA Innovation Program</div>
            <div className="text-xs text-slate-400 mt-1">Deadline: April 1, 2025</div>
            <div className="text-xs text-indigo-400 mt-1">Up to €100,000</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
