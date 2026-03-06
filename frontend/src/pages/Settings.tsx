import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Camera, Save } from "lucide-react";

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "notifications", label: "Notifications" },
    { id: "preferences", label: "Preferences" },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 flex justify-center p-6 md:p-8 lg:p-12">
          <div className="w-full max-w-[900px] space-y-8 animate-fade-in">
            <div>
              <h1 className="text-display-xs md:text-display-sm text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-2">Manage your account and preferences.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-muted rounded-2xl p-1 w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-8">
                {/* Avatar */}
                <div className="bg-card rounded-3xl p-8 shadow-card">
                  <h2 className="text-lg font-semibold text-foreground mb-6">Profile Photo</h2>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-primary-foreground">
                        JD
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-card border-2 border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-sm">
                        <Camera size={14} />
                      </button>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">John Doe</p>
                      <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="bg-card rounded-3xl p-8 shadow-card space-y-6">
                  <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" defaultValue="John" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" defaultValue="Doe" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john@example.com" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="+1 (555) 000-0000" className="h-12 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      rows={3}
                      placeholder="Tell us about yourself..."
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button className="rounded-full gap-2 px-6">
                      <Save size={16} /> Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="bg-card rounded-3xl p-8 shadow-card space-y-6">
                <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
                {[
                  { label: "Email notifications", description: "Receive updates about your courses via email", defaultChecked: true },
                  { label: "Assignment reminders", description: "Get reminded before assignment deadlines", defaultChecked: true },
                  { label: "Quiz results", description: "Be notified when quiz results are available", defaultChecked: true },
                  { label: "Course announcements", description: "Stay updated with instructor announcements", defaultChecked: false },
                  { label: "Marketing emails", description: "Receive news about new courses and features", defaultChecked: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked={item.defaultChecked} />
                  </div>
                ))}
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="space-y-8">
                <div className="bg-card rounded-3xl p-8 shadow-card space-y-6">
                  <h2 className="text-lg font-semibold text-foreground">Learning Preferences</h2>
                  <div className="space-y-2">
                    <Label>Preferred Language</Label>
                    <select className="w-full h-12 rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Time Zone</Label>
                    <select className="w-full h-12 rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC-6 (Central Time)</option>
                      <option>UTC-7 (Mountain Time)</option>
                      <option>UTC-8 (Pacific Time)</option>
                    </select>
                  </div>
                </div>

                <div className="bg-card rounded-3xl p-8 shadow-card space-y-6">
                  <h2 className="text-lg font-semibold text-foreground text-destructive">Danger Zone</h2>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-foreground">Delete Account</p>
                      <p className="text-sm text-muted-foreground">Permanently delete your account and all data.</p>
                    </div>
                    <Button variant="destructive" className="rounded-full">Delete Account</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
