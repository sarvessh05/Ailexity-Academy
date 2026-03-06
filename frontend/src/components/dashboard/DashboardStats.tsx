import { TrendingUp, BookOpen, Award, Clock } from "lucide-react";

const stats = [
  { icon: BookOpen, label: "Courses Enrolled", value: "12", color: "text-primary" },
  { icon: Clock, label: "Hours Learned", value: "148", color: "text-primary" },
  { icon: Award, label: "Certificates", value: "5", color: "text-primary" },
  { icon: TrendingUp, label: "Avg. Score", value: "92%", color: "text-primary" },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 border-t-2 border-primary/20"
        >
          <div className="flex items-center justify-between mb-3">
            <stat.icon size={20} className={stat.color} />
          </div>
          <p className="text-display-xs text-foreground">{stat.value}</p>
          <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
