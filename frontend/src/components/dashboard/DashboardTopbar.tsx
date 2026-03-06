import { Search, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DashboardTopbarProps {
  onMenuClick: () => void;
}

export function DashboardTopbar({ onMenuClick }: DashboardTopbarProps) {
  return (
    <header className="sticky top-0 z-30 h-[72px] bg-card border-b border-border flex items-center px-6 gap-4">
      <button className="lg:hidden text-foreground" onClick={onMenuClick}>
        <Menu size={24} />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-md hidden sm:block">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search courses, assignments..."
          className="pl-9 rounded-xl bg-secondary border-0"
        />
      </div>

      <div className="flex-1" />

      {/* Actions */}
      <button className="relative text-muted-foreground hover:text-foreground transition-colors">
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
      </button>

      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
        JD
      </div>
    </header>
  );
}
