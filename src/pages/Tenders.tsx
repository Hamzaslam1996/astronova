import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Bookmark } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Tenders() {
  const [tenders, setTenders] = useState<any[]>([]);

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    const { data } = await supabase.from("tenders").select("*").order("due_date");
    setTenders(data || []);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-heading font-bold">Tenders</h1>
      <div className="grid gap-4">
        {tenders.map((tender) => (
          <Card key={tender.id} className="bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{tender.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{tender.agency}</p>
                </div>
                <Badge variant="secondary">{tender.due_date}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm"><Bookmark className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm"><ExternalLink className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
