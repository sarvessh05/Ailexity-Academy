import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Pause,
  CheckCircle2,
  Lock,
  ChevronDown,
  Clock,
  FileText,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const courseModules = [
  {
    title: "Module 1: Introduction",
    lessons: [
      {
        id: 1,
        title: "Welcome & Course Overview",
        duration: "5:30",
        completed: true,
        locked: false,
      },
      {
        id: 2,
        title: "Setting Up Your Environment",
        duration: "12:45",
        completed: true,
        locked: false,
      },
      {
        id: 3,
        title: "Core Concepts Explained",
        duration: "18:20",
        completed: false,
        locked: false,
      },
    ],
  },
  {
    title: "Module 2: Fundamentals",
    lessons: [
      {
        id: 4,
        title: "Variables & Data Types",
        duration: "14:10",
        completed: false,
        locked: false,
      },
      {
        id: 5,
        title: "Control Flow & Loops",
        duration: "20:30",
        completed: false,
        locked: false,
      },
      {
        id: 6,
        title: "Functions Deep Dive",
        duration: "22:15",
        completed: false,
        locked: false,
      },
    ],
  },
  {
    title: "Module 3: Advanced Topics",
    lessons: [
      {
        id: 7,
        title: "Async Programming",
        duration: "25:00",
        completed: false,
        locked: true,
      },
      {
        id: 8,
        title: "Error Handling Patterns",
        duration: "16:40",
        completed: false,
        locked: true,
      },
      {
        id: 9,
        title: "Performance Optimization",
        duration: "19:55",
        completed: false,
        locked: true,
      },
    ],
  },
  {
    title: "Module 4: Project",
    lessons: [
      {
        id: 10,
        title: "Project Planning",
        duration: "10:00",
        completed: false,
        locked: true,
      },
      {
        id: 11,
        title: "Building the App",
        duration: "45:00",
        completed: false,
        locked: true,
      },
      {
        id: 12,
        title: "Final Review & Next Steps",
        duration: "8:30",
        completed: false,
        locked: true,
      },
    ],
  },
];

const CoursePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLesson, setActiveLesson] = useState(3);
  const completedCount = courseModules
    .flatMap((m) => m.lessons)
    .filter((l) => l.completed).length;
  const totalLessons = courseModules.flatMap((m) => m.lessons).length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="h-16 bg-card border-b border-border flex items-center px-6 gap-4">
        <Link
          to="/dashboard/courses"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold text-foreground truncate">
            Advanced Web Development
          </h1>
          <p className="text-xs text-muted-foreground">
            {completedCount}/{totalLessons} lessons completed
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3 w-48">
          <Progress value={progressPercent} className="h-2" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            {progressPercent}%
          </span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Video Area — 70% */}
        <div className="flex-1 lg:w-[70%] p-4 md:p-6 lg:p-8">
          {/* Video Container */}
          <div
            className="relative aspect-video bg-foreground/95 overflow-hidden shadow-lg group cursor-pointer"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {!isPlaying ? (
                <div className="w-20 h-20 bg-primary/90 flex items-center justify-center group-hover:bg-primary transition-colors group-hover:scale-110 duration-200">
                  <Play size={32} className="text-primary-foreground ml-1" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Pause size={24} className="text-primary-foreground" />
                </div>
              )}
            </div>
            {/* Mock video progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-foreground/20">
              <div className="h-full w-[35%] bg-primary" />
            </div>
          </div>

          {/* Lesson Info */}
          <div className="mt-6 space-y-4">
            <div>
              <span className="text-xs font-medium text-primary bg-accent px-3 py-1">
                Module 1
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Core Concepts Explained
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              In this lesson, we'll explore the fundamental building blocks that
              power modern web applications. You'll learn about component
              architecture, state management, and how data flows through your
              application.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={16} />
                <span>18:20</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText size={16} />
                <span>Includes resources</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button>Mark as Complete</Button>
              <Button variant="outline">Download Resources</Button>
            </div>
          </div>
        </div>

        {/* Modules Sidebar — 30% */}
        <aside className="lg:w-[30%] lg:max-w-[400px] border-t lg:border-t-0 lg:border-l border-border bg-card lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <div className="p-5 border-b border-border">
            <h3 className="font-semibold text-foreground">Course Content</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {completedCount} of {totalLessons} lessons complete
            </p>
          </div>

          <Accordion
            type="multiple"
            defaultValue={["Module 1: Introduction"]}
            className="px-2 py-2"
          >
            {courseModules.map((module) => (
              <AccordionItem
                key={module.title}
                value={module.title}
                className="border-0"
              >
                <AccordionTrigger className="px-3 py-3 text-sm font-medium text-foreground hover:no-underline hover:bg-secondary/50">
                  {module.title}
                </AccordionTrigger>
                <AccordionContent className="pb-1">
                  <div className="space-y-0.5">
                    {module.lessons.map((lesson) => {
                      const isActive = lesson.id === activeLesson;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() =>
                            !lesson.locked && setActiveLesson(lesson.id)
                          }
                          disabled={lesson.locked}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm transition-all duration-200 ${
                            isActive
                              ? "bg-accent border-l-[3px] border-primary text-accent-foreground font-medium"
                              : lesson.locked
                                ? "text-muted-foreground/50 cursor-not-allowed"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                          }`}
                        >
                          {lesson.completed ? (
                            <CheckCircle2
                              size={16}
                              className="text-primary shrink-0"
                            />
                          ) : lesson.locked ? (
                            <Lock size={16} className="shrink-0" />
                          ) : (
                            <Play size={16} className="shrink-0" />
                          )}
                          <span className="flex-1 truncate">
                            {lesson.title}
                          </span>
                          <span className="text-xs shrink-0">
                            {lesson.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </aside>
      </div>
    </div>
  );
};

export default CoursePlayer;
