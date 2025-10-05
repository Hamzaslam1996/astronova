import { Rocket, Home, Boxes, Satellite, FileText } from "lucide-react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

const mainMenuItems = [
  { title: "Home", icon: Home, url: "/" },
  { title: "Prototype", icon: Boxes, url: "/prototype" },
  { title: "Orbit Hub", icon: Satellite, url: "/orbit-hub" },
  { title: "White Paper", icon: FileText, url: "/white-paper.pdf", external: true },
];

export function Layout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-sidebar-border">
          <div className="p-6 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center transition-all group-hover:scale-110 shadow-lg shadow-[#6366f1]/20">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-heading font-bold text-sidebar-foreground">
                  Astronova
                </h1>
                <p className="text-xs text-sidebar-foreground/60">
                  LEO Intelligence
                </p>
              </div>
            </Link>
          </div>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainMenuItems.map((item) => {
                    const isActive = !item.external && location.pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className={isActive ? "bg-[#6366f1] text-white hover:bg-[#6366f1]/90" : "hover:bg-sidebar-accent"}
                        >
                          {item.external ? (
                            <a 
                              href={item.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 px-3 py-2"
                            >
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </a>
                          ) : (
                            <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </Link>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card/30 backdrop-blur-sm flex items-center px-6 justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                Data-driven insights for the <span className="text-[#6366f1] font-semibold">Commercial LEO Economy</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/prototype"
                className="inline-flex items-center rounded-lg bg-[#6366f1] px-4 py-2 text-sm font-medium text-white hover:bg-[#6366f1]/90 transition-colors"
              >
                Prototype
              </Link>
              <Link
                to="/orbit-hub"
                className="inline-flex items-center rounded-lg border border-input px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
              >
                Orbit Hub
              </Link>
              <a
                href="/white-paper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-input px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
              >
                White Paper
              </a>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>

          <footer className="border-t border-border bg-card/30 backdrop-blur-sm px-6 py-4">
            <p className="text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()} Astronova · Made for NASA Space Apps
            </p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
