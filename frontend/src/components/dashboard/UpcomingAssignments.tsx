import { Calendar, Clock } from "lucide-react";

const assignments = [
  { title: "React Final Project", course: "Advanced React", due: "Mar 5, 2026", status: "pending" },
  { title: "Data Visualization Report", course: "Data Science", due: "Mar 8, 2026", status: "pending" },
  { title: "Wireframe Submission", course: "UI/UX Design", due: "Mar 3, 2026", status: "overdue" },
];

export function UpcomingAssignments() {
  return (
    <div>
      <h2 className="text-heading text-foreground mb-6">Upcoming Assignments</h2>
      <div className="bg-card rounded-2xl shadow-card divide-y divide-border">
        {assignments.map((a) => (
          <div key={a.title} className="flex items-center justify-between p-5 hover:bg-secondary/30 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Calendar size={18} className="text-accent-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">{a.title}</p>
                <p className="text-sm text-muted-foreground">{a.course}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock size={14} className="text-muted-foreground" />
              <span className={a.status === "overdue" ? "text-destructive font-medium" : "text-muted-foreground"}>
                {a.due}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
