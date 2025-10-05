import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Launch {
  name: string;
  windowStart: string;
  vehicle: string;
  site: string;
  agency: string;
}

interface NASATech {
  title: string;
  trl: string;
  center: string;
  keywords: string[];
  url: string;
}

interface ContextDataSidebarProps {
  launches: Launch[];
  nasaTech: NASATech[];
}

export function ContextDataSidebar({ launches, nasaTech }: ContextDataSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Load sidebar state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("astronova_sidebar_open");
    if (stored !== null) {
      setIsOpen(stored === "true");
    }
  }, []);

  // Save sidebar state to localStorage
  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem("astronova_sidebar_open", String(newState));
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 sticky top-24 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">Reference Data</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={toggleSidebar}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      {isOpen && (
        <Tabs defaultValue="launches" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-3">
            <TabsTrigger value="launches" className="text-xs">Launches</TabsTrigger>
            <TabsTrigger value="nasa" className="text-xs">NASA Tech</TabsTrigger>
          </TabsList>
          
          <TabsContent value="launches">
            <ScrollArea className="h-[400px] pr-2">
              <div className="space-y-2">
                {launches.map((launch, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-white/5 bg-white/5 p-2 hover:bg-white/10 transition"
                  >
                    <p className="font-medium text-xs mb-1 leading-tight">{launch.name}</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      {launch.windowStart.split(' ')[0]} • {launch.vehicle}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="nasa">
            <ScrollArea className="h-[400px] pr-2">
              <div className="space-y-2">
                {nasaTech.map((tech, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-white/5 bg-white/5 p-2"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium text-xs flex-1 leading-tight">{tech.title}</p>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-[10px] ml-1 h-4 px-1">
                        TRL {tech.trl}
                      </Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground mb-1 leading-tight">
                      {tech.center}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto py-0.5 px-1 text-[10px] gap-1"
                      asChild
                    >
                      <a 
                        href={tech.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`View ${tech.title} on NASA Tech Transfer`}
                      >
                        NASA Portal
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
