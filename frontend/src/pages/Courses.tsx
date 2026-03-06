import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Play } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Advanced Web Development",
    instructor: "Sarah Chen",
    progress: 35,
    image: "🌐",
    tag: "Development",
    duration: "12h",
    students: 1240,
    rating: 4.8,
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    instructor: "Alex Rivera",
    progress: 68,
    image: "🎨",
    tag: "Design",
    duration: "8h",
    students: 890,
    rating: 4.9,
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    instructor: "Dr. James Lee",
    progress: 12,
    image: "📊",
    tag: "Data",
    duration: "15h",
    students: 2100,
    rating: 4.7,
  },
  {
    id: 4,
    title: "Machine Learning A-Z",
    instructor: "Priya Patel",
    progress: 0,
    image: "🤖",
    tag: "AI",
    duration: "20h",
    students: 3200,
    rating: 4.6,
  },
  {
    id: 5,
    title: "Mobile App Development",
    instructor: "Marco Silva",
    progress: 92,
    image: "📱",
    tag: "Development",
    duration: "10h",
    students: 760,
    rating: 4.5,
  },
  {
    id: 6,
    title: "Cloud Architecture",
    instructor: "Nina Thompson",
    progress: 45,
    image: "☁️",
    tag: "DevOps",
    duration: "14h",
    students: 540,
    rating: 4.8,
  },
];

const filters = ["All", "Development", "Design", "Data", "AI", "DevOps"];

const Courses = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? courses
      : courses.filter((c) => c.tag === activeFilter);

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
              My Courses
            </h1>
            <p className="text-muted-foreground mt-2">
              Continue learning and track your progress.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <div
                key={course.id}
                className="bg-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border/50"
              >
                {/* Image area */}
                <div className="h-40 bg-secondary flex items-center justify-center text-5xl relative">
                  {course.image}
                  <span className="absolute top-3 left-3 text-xs font-medium bg-accent text-accent-foreground px-3 py-1">
                    {course.tag}
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {course.instructor}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {course.students}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-primary" />
                      {course.rating}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">
                        {course.progress}%
                      </span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <Link to="/dashboard/course-player">
                    <Button
                      className="w-full gap-2"
                      variant={course.progress > 0 ? "default" : "outline"}
                    >
                      <Play size={14} />
                      {course.progress > 0 ? "Resume" : "Start Course"}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Courses;
