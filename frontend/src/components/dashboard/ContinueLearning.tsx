import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const courses = [
  {
    title: "Advanced React Patterns",
    instructor: "Sarah Chen",
    progress: 72,
    tag: "Development",
    image: "🎨",
  },
  {
    title: "Data Science Fundamentals",
    instructor: "Dr. James Wilson",
    progress: 45,
    tag: "Data Science",
    image: "📊",
  },
  {
    title: "UI/UX Design Mastery",
    instructor: "Emma Rodriguez",
    progress: 89,
    tag: "Design",
    image: "✨",
  },
];

export function ContinueLearning() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-heading text-foreground">Continue Learning</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.title}
            className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 group"
          >
            {/* Image placeholder */}
            <div className="h-36 bg-accent/50 flex items-center justify-center text-4xl">
              {course.image}
            </div>

            <div className="p-5">
              <span className="inline-block text-xs font-medium bg-accent text-accent-foreground px-2.5 py-1 rounded-full mb-3">
                {course.tag}
              </span>
              <h3 className="font-semibold text-foreground mb-1">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{course.instructor}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{course.progress}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <Button size="sm" className="w-full rounded-xl gap-2">
                <Play size={14} /> Resume
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
