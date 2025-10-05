import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Sustainability() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-heading font-bold">Sustainability</h1>
      <Card className="bg-card/50 backdrop-blur">
        <CardHeader><CardTitle>Debris Mitigation Guidelines</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Information about ODMSP and debris mitigation practices.</p></CardContent>
      </Card>
    </div>
  );
}
