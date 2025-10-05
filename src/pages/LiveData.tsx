import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Satellite, Rocket, Upload, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface DataSource {
  id: string;
  slug: string | null;
  name: string;
  type: string;
  base_url: string;
  auth_type: string;
  secret_name: string | null;
  cadence_sec: number;
  enabled: boolean;
  last_fetch_at: string | null;
  last_fetched_at: string | null;
  last_status: string | null;
  last_error: string | null;
  created_at: string;
  updated_at: string;
  url: string | null;
  chart_type: string | null;
}

export default function LiveData() {
  const [sourceUrl, setSourceUrl] = useState("");
  const [chartType, setChartType] = useState("pie");
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loadingHealth, setLoadingHealth] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchDataSources();
  }, []);

  const fetchDataSources = async () => {
    const { data, error } = await supabase
      .from('data_sources')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching data sources:', error);
      toast({
        title: "Error",
        description: "Failed to load data sources",
        variant: "destructive",
      });
      return;
    }

    setDataSources((data || []) as DataSource[]);
  };

  const checkHealth = async (slug: string) => {
    setLoadingHealth(slug);
    try {
      const response = await fetch(
        `https://lnkfrqaguykoeunevdgx.supabase.co/functions/v1/data-source-health?slug=${slug}`,
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        }
      );

      if (!response.ok) throw new Error('Health check failed');

      const data = await response.json();

      toast({
        title: "Health Check Complete",
        description: `Status: ${data.status}`,
      });

      // Refresh data sources to get updated status
      await fetchDataSources();
    } catch (error: any) {
      console.error('Health check error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to check health",
        variant: "destructive",
      });
    } finally {
      setLoadingHealth(null);
    }
  };

  const handleConnect = () => {
    toast({
      title: "Data source connected",
      description: "Successfully connected to external data source",
    });
    setSourceUrl("");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Live Data</h1>
        <p className="text-muted-foreground">
          Connect and visualize real-time space data from NASA, CelesTrak, and more
        </p>
      </div>

      <Tabs defaultValue="iss" className="space-y-6">
        <TabsList className="bg-card/50 backdrop-blur">
          <TabsTrigger value="iss" className="gap-2">
            <Satellite className="h-4 w-4" />
            ISS Data
          </TabsTrigger>
          <TabsTrigger value="debris" className="gap-2">
            <Database className="h-4 w-4" />
            Debris Tracking
          </TabsTrigger>
          <TabsTrigger value="launches" className="gap-2">
            <Rocket className="h-4 w-4" />
            Launches
          </TabsTrigger>
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="h-4 w-4" />
            Connect Source
          </TabsTrigger>
        </TabsList>

        <TabsContent value="iss" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>ISS Utilization Data</CardTitle>
              <CardDescription>International Space Station resource allocation and experiments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground text-center py-12">
                Live ISS data visualization will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debris" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Orbital Debris Tracking</CardTitle>
              <CardDescription>CelesTrak active satellites and debris data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground text-center py-12">
                Debris tracking visualization will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="launches" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Upcoming Launches</CardTitle>
              <CardDescription>Launch Library 2 API - Scheduled orbital launches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground text-center py-12">
                Launch schedule will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Connect Data Source</CardTitle>
              <CardDescription>Link CSV or JSON data sources from NASA, CelesTrak, or custom APIs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="source-url">Data Source URL</Label>
                <Input
                  id="source-url"
                  placeholder="https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=csv"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chart-type">Visualization Type</Label>
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger id="chart-type" className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleConnect} className="w-full glow-primary">
                Connect Source
              </Button>

              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-medium mb-3">Connected Sources</h4>
                <div className="space-y-2">
                  {dataSources.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No data sources configured yet.</p>
                  ) : (
                    dataSources.map((source) => (
                      <div key={source.id} className="p-3 rounded-lg bg-muted/30 flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{source.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {source.type.toUpperCase()} • Refresh: {source.cadence_sec}s
                          </p>
                          {source.last_fetch_at && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(source.last_fetch_at).toLocaleTimeString()}
                            </p>
                          )}
                          {source.last_error && (
                            <p className="text-xs text-destructive mt-1 truncate" title={source.last_error}>
                              {source.last_error}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge 
                            variant={source.last_status === 'ok' ? 'default' : source.last_status === 'error' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {source.last_status === 'ok' ? '✓ OK' : source.last_status === 'error' ? '✗ Error' : '—'}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => checkHealth(source.slug)}
                            disabled={loadingHealth === source.slug}
                            title="Check health"
                          >
                            <RefreshCw className={`h-4 w-4 ${loadingHealth === source.slug ? 'animate-spin' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
