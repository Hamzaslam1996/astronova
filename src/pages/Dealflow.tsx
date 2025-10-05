import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, ExternalLink, Search, Bookmark, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Dealflow() {
  const [ventures, setVentures] = useState<any[]>([]);
  const [filteredVentures, setFilteredVentures] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchVentures();
  }, []);

  useEffect(() => {
    filterVentures();
  }, [ventures, searchTerm, sectorFilter]);

  const fetchVentures = async () => {
    const { data, error } = await supabase
      .from("ventures")
      .select("*")
      .order("sustainability_score", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load ventures",
        variant: "destructive",
      });
      return;
    }

    setVentures(data || []);
  };

  const filterVentures = () => {
    let filtered = ventures;

    if (searchTerm) {
      filtered = filtered.filter(v => 
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.short_pitch?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sectorFilter !== "all") {
      filtered = filtered.filter(v => v.sector === sectorFilter);
    }

    setFilteredVentures(filtered);
  };

  const exportToCSV = () => {
    toast({
      title: "Export Started",
      description: "Dealflow data is being exported to CSV",
    });
  };

  const sectors = [...new Set(ventures.map(v => v.sector))];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Dealflow</h1>
          <p className="text-muted-foreground">
            Explore and track promising LEO economy ventures
          </p>
        </div>
        <Button className="glow-primary gap-2">
          <Plus className="h-4 w-4" />
          Add Venture
        </Button>
      </div>

      <Card className="bg-card/50 backdrop-blur border-border">
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search ventures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>

            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-full md:w-[200px] bg-background/50">
                <SelectValue placeholder="All Sectors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                {sectors.map(sector => (
                  <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={exportToCSV} className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur border-border">
        <CardHeader>
          <CardTitle>Ventures ({filteredVentures.length})</CardTitle>
          <CardDescription>
            High-potential startups in the commercial space economy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Company</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Last Funding</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVentures.map((venture) => (
                  <TableRow key={venture.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div>
                        <div className="font-medium">{venture.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {venture.short_pitch}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{venture.sector}</Badge>
                    </TableCell>
                    <TableCell>{venture.stage}</TableCell>
                    <TableCell>{venture.country}</TableCell>
                    <TableCell>
                      ${(venture.last_funding_usd / 1000000).toFixed(1)}M
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-bold text-primary">
                          {venture.sustainability_score}
                        </div>
                        <div className="text-xs text-muted-foreground">/100</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
