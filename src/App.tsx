
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import ContentPlanner from "@/pages/ContentPlanner";
import PepTalk from "@/pages/PepTalk";
import Tasks from "@/pages/Tasks";
import Moodboard from "@/pages/Moodboard";
import Onboarding from "@/pages/Onboarding";
import NotFound from "@/pages/NotFound";
import CreatorArticles from "@/pages/CreatorArticles";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vision-creator-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/content-planner" element={<ContentPlanner />} />
              <Route path="/pep-talk" element={<PepTalk />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/moodboard" element={<Moodboard />} />
              <Route path="/creator-articles" element={<CreatorArticles />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
