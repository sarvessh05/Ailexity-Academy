import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp, Clock, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

const threads = [
  {
    id: 1,
    title: "How to optimize React re-renders?",
    author: "Sarah C.",
    course: "Advanced Web Dev",
    replies: 12,
    likes: 24,
    time: "2h ago",
    avatar: "SC",
  },
  {
    id: 2,
    title: "Best practices for responsive design in 2024",
    author: "Alex R.",
    course: "UI/UX Design",
    replies: 8,
    likes: 18,
    time: "4h ago",
    avatar: "AR",
  },
  {
    id: 3,
    title: "Understanding async/await vs Promises",
    author: "Mike D.",
    course: "Advanced Web Dev",
    replies: 15,
    likes: 31,
    time: "6h ago",
    avatar: "MD",
  },
  {
    id: 4,
    title: "Data normalization techniques",
    author: "Priya P.",
    course: "Data Science",
    replies: 6,
    likes: 9,
    time: "1d ago",
    avatar: "PP",
  },
  {
    id: 5,
    title: "Getting started with TensorFlow",
    author: "James L.",
    course: "Machine Learning",
    replies: 20,
    likes: 42,
    time: "1d ago",
    avatar: "JL",
  },
  {
    id: 6,
    title: "CSS Grid vs Flexbox — when to use which?",
    author: "Nina T.",
    course: "UI/UX Design",
    replies: 11,
    likes: 27,
    time: "2d ago",
    avatar: "NT",
  },
];

const Discussions = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = threads.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6 md:p-8 lg:p-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-display-xs md:text-display-sm text-foreground">
                Discussions
              </h1>
              <p className="text-muted-foreground mt-2">
                Ask questions and learn from peers.
              </p>
            </div>
            <Button className="gap-2 self-start">
              <Plus size={16} />
              New Thread
            </Button>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search discussions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>

          {/* Thread List */}
          <div className="space-y-3">
            {filtered.map((thread) => (
              <div
                key={thread.id}
                className="bg-card p-5 border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground shrink-0">
                    {thread.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                      {thread.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{thread.author}</span>
                      <span className="bg-secondary px-2 py-0.5">
                        {thread.course}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {thread.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground shrink-0">
                    <span className="flex items-center gap-1">
                      <MessageSquare size={14} />
                      {thread.replies}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={14} />
                      {thread.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Discussions;
