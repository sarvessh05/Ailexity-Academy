import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { UpcomingAssignments } from "@/components/dashboard/UpcomingAssignments";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-6 md:p-8 lg:p-12 space-y-12">
          {/* Welcome */}
          <div>
            <h1 className="text-display-xs md:text-display-sm text-foreground">
              Welcome back, John 👋
            </h1>
            <p className="text-muted-foreground mt-2">
              Continue where you left off and keep your streak going.
            </p>
          </div>

          <DashboardStats />
          <ContinueLearning />
          <UpcomingAssignments />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
