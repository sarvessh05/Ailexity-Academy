import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Assignments from "./pages/Assignments";
import Settings from "./pages/Settings";
import Courses from "./pages/Courses";
import CoursePlayer from "./pages/CoursePlayer";
import Discussions from "./pages/Discussions";
import ProgressPage from "./pages/ProgressPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/login" 
            element={
              <div className="flex items-center justify-center min-h-screen bg-background">
                <SignIn routing="path" path="/login" signUpUrl="/signup" />
              </div>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <div className="flex items-center justify-center min-h-screen bg-background">
                <SignUp routing="path" path="/signup" signInUrl="/login" />
              </div>
            } 
          />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
          <Route path="/dashboard/course-player" element={<ProtectedRoute><CoursePlayer /></ProtectedRoute>} />
          <Route path="/dashboard/quizzes" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/dashboard/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
          <Route path="/dashboard/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
          <Route path="/dashboard/discussions" element={<ProtectedRoute><Discussions /></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
