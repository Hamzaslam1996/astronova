import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "@/contexts/RoleContext";
import Index from "./pages/Index";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import LiveData from "./pages/LiveData";
import Insights from "./pages/Insights";
import Dealflow from "./pages/Dealflow";
import Tenders from "./pages/Tenders";
import Investors from "./pages/Investors";
import Sustainability from "./pages/Sustainability";
import Settings from "./pages/Settings";
import Prototype from "./pages/Prototype";
import OrbitHub from "./pages/OrbitHub";
import OrbitHubCharter from "./pages/OrbitHubCharter";
import CodeOfConduct from "./pages/CodeOfConduct";
import Contributing from "./pages/Contributing";
import NotFound from "./pages/NotFound";
import RoleDashboard from "./pages/RoleDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RoleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/prototype" element={<Prototype />} />
            <Route path="/orbit-hub" element={<OrbitHub />} />
            <Route path="/orbit-hub/charter" element={<OrbitHubCharter />} />
            <Route path="/orbit-hub/code-of-conduct" element={<CodeOfConduct />} />
            <Route path="/orbit-hub/contributing" element={<Contributing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
