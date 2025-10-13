import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HMISidebar } from "@/components/HMISidebar";
import HMI01Overview from "./pages/HMI01Overview";
import HMI02Pickling from "./pages/HMI02Pickling";
import HMI03PumpOperation from "./pages/HMI03PumpOperation";
import HMI04Trends from "./pages/HMI04Trends";
import HMI05Alarms from "./pages/HMI05Alarms";
import HMI06Reports from "./pages/HMI06Reports";
import HMI07Historical from "./pages/HMI07Historical";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen w-full bg-background">
          <HMISidebar />
          <main className="flex-1 ml-20">
            <Routes>
              <Route path="/" element={<HMI01Overview />} />
              <Route path="/pickling" element={<HMI02Pickling />} />
              <Route path="/pump-operation" element={<HMI03PumpOperation />} />
              <Route path="/trends" element={<HMI04Trends />} />
              <Route path="/alarms" element={<HMI05Alarms />} />
              <Route path="/reports" element={<HMI06Reports />} />
              <Route path="/historical" element={<HMI07Historical />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
