import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Calculator, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Insights() {
  const { toast } = useToast();
  
  // ROI Calculator State
  const [capex, setCapex] = useState([50]);
  const [timeline, setTimeline] = useState([5]);
  const [revenueUplift, setRevenueUplift] = useState([20]);
  const [opex, setOpex] = useState([30]);
  const [riskAdjuster, setRiskAdjuster] = useState([15]);
  const [sustainBonus, setSustainBonus] = useState([10]);

  // Sustainability Calculator State
  const [disposalPlan, setDisposalPlan] = useState(false);
  const [reusableHardware, setReusableHardware] = useState(false);
  const [lowEmissionPropellant, setLowEmissionPropellant] = useState(false);
  const [debrisPercentile, setDebrisPercentile] = useState([50]);

  // Calculate ROI
  const calculateROI = () => {
    const revenue = capex[0] * (revenueUplift[0] / 100);
    const costs = capex[0] * (opex[0] / 100);
    const base = ((revenue - costs) / capex[0]) * 100;
    const riskAdjusted = base - riskAdjuster[0];
    const sustainAdjusted = riskAdjusted + sustainBonus[0];

    return [
      { name: "Base ROI", value: Math.round(base), color: "hsl(var(--chart-2))" },
      { name: "Risk Adjusted", value: Math.round(riskAdjusted), color: "hsl(var(--chart-3))" },
      { name: "Sustain Adjusted", value: Math.round(sustainAdjusted), color: "hsl(var(--chart-1))" },
    ];
  };

  // Calculate Sustainability Score
  const calculateSustainability = () => {
    let base = 70;
    const debrisPenalty = Math.floor(debrisPercentile[0] / 4);
    const compliance = disposalPlan ? 10 : 0;
    const reuseBonus = reusableHardware ? 10 : 0;
    const fuelBonus = lowEmissionPropellant ? 5 : 0;
    
    const score = Math.max(0, Math.min(100, base - debrisPenalty + compliance + reuseBonus + fuelBonus));
    return score;
  };

  const roiData = calculateROI();
  const sustainScore = calculateSustainability();

  const handleSaveROI = () => {
    toast({
      title: "ROI Scenario Saved",
      description: "Your ROI analysis has been saved to scenarios",
    });
  };

  const handleSaveSustainability = () => {
    toast({
      title: "Sustainability Score Saved",
      description: `Score of ${sustainScore}/100 has been saved`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Insights</h1>
        <p className="text-muted-foreground">
          Calculate ROI scenarios and sustainability scores for LEO ventures
        </p>
      </div>

      <Tabs defaultValue="roi" className="space-y-6">
        <TabsList className="bg-card/50 backdrop-blur">
          <TabsTrigger value="roi" className="gap-2">
            <Calculator className="h-4 w-4" />
            ROI Simulator
          </TabsTrigger>
          <TabsTrigger value="sustainability" className="gap-2">
            <Leaf className="h-4 w-4" />
            Sustainability Score
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roi" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Input Parameters</CardTitle>
                <CardDescription>Adjust investment and operational metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Capital Expenditure (USD Million): ${capex[0]}M</Label>
                  <Slider value={capex} onValueChange={setCapex} max={500} step={10} />
                </div>

                <div className="space-y-2">
                  <Label>Timeline (Years): {timeline[0]}y</Label>
                  <Slider value={timeline} onValueChange={setTimeline} max={15} step={1} />
                </div>

                <div className="space-y-2">
                  <Label>Revenue Uplift: {revenueUplift[0]}%</Label>
                  <Slider value={revenueUplift} onValueChange={setRevenueUplift} max={100} step={5} />
                </div>

                <div className="space-y-2">
                  <Label>Operational Costs: {opex[0]}%</Label>
                  <Slider value={opex} onValueChange={setOpex} max={100} step={5} />
                </div>

                <div className="space-y-2">
                  <Label>Risk Adjuster: {riskAdjuster[0]}%</Label>
                  <Slider value={riskAdjuster} onValueChange={setRiskAdjuster} max={50} step={5} />
                </div>

                <div className="space-y-2">
                  <Label>Sustainability Bonus: {sustainBonus[0]}%</Label>
                  <Slider value={sustainBonus} onValueChange={setSustainBonus} max={25} step={5} />
                </div>

                <Button onClick={handleSaveROI} className="w-full glow-primary">
                  Save Scenario
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>ROI Projection</CardTitle>
                <CardDescription>Comparative return on investment analysis</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roiData}>
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)" 
                      }} 
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {roiData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Sustainability Factors</CardTitle>
                <CardDescription>Environmental impact assessment parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="disposal" 
                      checked={disposalPlan} 
                      onCheckedChange={(checked) => setDisposalPlan(checked as boolean)}
                    />
                    <Label htmlFor="disposal" className="cursor-pointer">
                      End-of-Life Disposal Plan (+10 points)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="reusable" 
                      checked={reusableHardware} 
                      onCheckedChange={(checked) => setReusableHardware(checked as boolean)}
                    />
                    <Label htmlFor="reusable" className="cursor-pointer">
                      Reusable Hardware (+10 points)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="propellant" 
                      checked={lowEmissionPropellant} 
                      onCheckedChange={(checked) => setLowEmissionPropellant(checked as boolean)}
                    />
                    <Label htmlFor="propellant" className="cursor-pointer">
                      Low-Emission Propellant (+5 points)
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Debris Growth Percentile: {debrisPercentile[0]}%</Label>
                  <Slider 
                    value={debrisPercentile} 
                    onValueChange={setDebrisPercentile} 
                    max={100} 
                    step={5} 
                  />
                  <p className="text-xs text-muted-foreground">
                    Lower percentile = less debris contribution
                  </p>
                </div>

                <Button onClick={handleSaveSustainability} className="w-full glow-primary">
                  Save Assessment
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Sustainability Score</CardTitle>
                <CardDescription>Overall environmental impact rating</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[300px]">
                  <div className="text-center">
                    <div 
                      className="text-8xl font-bold mb-4"
                      style={{ 
                        color: sustainScore >= 80 ? "hsl(var(--chart-1))" : 
                               sustainScore >= 60 ? "hsl(var(--chart-3))" : 
                               "hsl(var(--destructive))"
                      }}
                    >
                      {sustainScore}
                    </div>
                    <div className="text-2xl font-heading text-muted-foreground">/ 100</div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      {sustainScore >= 80 ? "Excellent" : sustainScore >= 60 ? "Good" : "Needs Improvement"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-muted/30">
                  <h4 className="text-sm font-medium mb-2">Score Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base Score</span>
                      <span>70</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Debris Penalty</span>
                      <span className="text-destructive">-{Math.floor(debrisPercentile[0] / 4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Compliance Bonus</span>
                      <span className="text-primary">+{disposalPlan ? 10 : 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reusability Bonus</span>
                      <span className="text-primary">+{reusableHardware ? 10 : 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fuel Efficiency</span>
                      <span className="text-primary">+{lowEmissionPropellant ? 5 : 0}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
