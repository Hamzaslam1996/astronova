import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

export default function Investors() {
  const [investors, setInvestors] = useState<any[]>([]);

  useEffect(() => {
    const fetchInvestors = async () => {
      const { data } = await supabase.from("investors").select("*");
      setInvestors(data || []);
    };
    fetchInvestors();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-heading font-bold">Investors</h1>
      <div className="grid gap-4">
        {investors.map((inv) => (
          <Card key={inv.id} className="bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>{inv.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              {inv.focus_areas?.map((area: string) => <Badge key={area}>{area}</Badge>)}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
