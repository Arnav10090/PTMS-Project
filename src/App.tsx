import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HMISidebar } from "@/components/HMISidebar";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import HMI01Overview from "./pages/HMI01Overview";
import HMI01Tabs from "./pages/HMI01Tabs";
import HMI01TankSection from "./pages/HMI01TankSection";
import HMI02Pickling from "./pages/HMI02Pickling";
import HMI03PumpOperation from "./pages/HMI03PumpOperation";
import HMI04Trends from "./pages/HMI04Trends";
import HMI05Alarms from "./pages/HMI05Alarms";
import HMI06Reports from "./pages/HMI06Reports";
import HMI07Historical from "./pages/HMI07Historical";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex min-h-screen w-full bg-background">
              <HMISidebar 
                isCollapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
              />
              <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
                <Navbar isCollapsed={sidebarCollapsed} />
                <main className="pt-16">
                  <Routes>
                    <Route path="/" element={<HMI01Overview />} />
                    <Route path="/hmi-01/*" element={<HMI01Tabs />}>
                      <Route index element={<div />} />
                      <Route path="tank" element={<div />} />
                      <Route path="pickling" element={<div />} />
                    </Route>
                    <Route path="/pump-operation" element={<HMI03PumpOperation />} />
                    <Route path="/trends" element={<HMI04Trends />} />
                    <Route path="/alarms" element={<HMI05Alarms />} />
                    <Route path="/reports" element={<HMI06Reports />} />
                    <Route path="/historical" element={<HMI07Historical />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
