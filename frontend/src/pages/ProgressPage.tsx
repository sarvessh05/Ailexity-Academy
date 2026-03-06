import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { ProgressChart } from "@/components/dashboard/ProgressChart";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen, Clock, TrendingUp, Flame } from "lucide-react";

const achievements = [
  {
    icon: Flame,
    label: "7-Day Streak",
    description: "Learned 7 days in a row",
    unlocked: true,
  },
  {
    icon: BookOpen,
    label: "First Course",
    description: "Completed your first course",
    unlocked: true,
  },
  {
    icon: Award,
    label: "Top Scorer",
    description: "Scored 95%+ on a quiz",
    unlocked: true,
  },
  {
    icon: TrendingUp,
    label: "Rising Star",
    description: "Complete 5 courses",
    unlocked: false,
  },
];

const courseProgress = [
  { name: "Advanced Web Development", progress: 35, grade: "A-" },
  { name: "UI/UX Design Masterclass", progress: 68, grade: "A" },
  { name: "Data Science Fundamentals", progress: 12, grade: "B+" },
  { name: "Mobile App Development", progress: 92, grade: "A+" },
];

const ProgressPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6 md:p-8 lg:p-12 space-y-8">
          <div>
            <h1 className="text-display-xs md:text-display-sm text-foreground">
              Progress
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your learning journey and achievements.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Current Streak", value: "7 days", icon: Flame },
              { label: "Total Hours", value: "148h", icon: Clock },
              { label: "Courses Done", value: "5", icon: BookOpen },
              { label: "Avg. Score", value: "92%", icon: Award },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-card p-5 shadow-card border border-border/50"
              >
                <s.icon size={18} className="text-primary mb-2" />
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <ProgressChart />

          {/* Course Progress */}
          <div className="bg-card p-6 shadow-card border border-border/50">
            <h3 className="font-semibold text-foreground mb-4">
              Course Progress
            </h3>
            <div className="space-y-5">
              {courseProgress.map((c) => (
                <div key={c.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground font-medium">
                      {c.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5">
                        {c.grade}
                      </span>
                      <span className="text-muted-foreground">
                        {c.progress}%
                      </span>
                    </div>
                  </div>
                  <Progress value={c.progress} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((a) => (
                <div
                  key={a.label}
                  className={`bg-card p-5 border text-center transition-all duration-200 ${
                    a.unlocked
                      ? "border-primary/30 shadow-card"
                      : "border-border/50 opacity-50"
                  }`}
                >
                  <div
                    className={`w-12 h-12 mx-auto flex items-center justify-center mb-3 ${
                      a.unlocked ? "bg-accent" : "bg-secondary"
                    }`}
                  >
                    <a.icon
                      size={20}
                      className={
                        a.unlocked ? "text-primary" : "text-muted-foreground"
                      }
                    />
                  </div>
                  <p className="font-medium text-sm text-foreground">
                    {a.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {a.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProgressPage;
