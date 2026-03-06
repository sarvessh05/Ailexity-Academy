import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const submissionHistory = [
  { id: 1, title: "UX Research Report", course: "UX Design Fundamentals", date: "Feb 28, 2026", status: "graded", grade: "A" },
  { id: 2, title: "Wireframe Prototype", course: "UX Design Fundamentals", date: "Feb 25, 2026", status: "graded", grade: "B+" },
  { id: 3, title: "Data Analysis Project", course: "Data Science 101", date: "Feb 22, 2026", status: "pending", grade: null },
  { id: 4, title: "React Components Lab", course: "Full-Stack Development", date: "Feb 18, 2026", status: "late", grade: "C" },
];

const statusConfig = {
  graded: { icon: CheckCircle2, label: "Graded", className: "text-green-600 bg-green-50" },
  pending: { icon: Clock, label: "Pending", className: "text-amber-600 bg-amber-50" },
  late: { icon: AlertCircle, label: "Late", className: "text-destructive bg-destructive/10" },
};

const Assignments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file.name);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file.name);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 flex justify-center p-6 md:p-8 lg:p-12">
          <div className="w-full max-w-[900px] space-y-12 animate-fade-in">
            {/* Header */}
            <div>
              <h1 className="text-display-xs md:text-display-sm text-foreground">Assignments</h1>
              <p className="text-muted-foreground mt-2">Submit your work and track your grades.</p>
            </div>

            {/* Upload Section */}
            <div className="bg-card rounded-3xl p-8 shadow-card space-y-6">
              <h2 className="text-heading text-foreground">Submit Assignment</h2>

              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                  isDragOver
                    ? "border-primary bg-accent scale-[1.01]"
                    : uploadedFile
                    ? "border-primary/50 bg-accent/30"
                    : "border-border hover:border-primary/40 hover:bg-accent/20"
                }`}
              >
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileSelect}
                />
                <div className="space-y-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto transition-colors ${
                    uploadedFile ? "bg-primary/10" : "bg-muted"
                  }`}>
                    {uploadedFile ? (
                      <FileText size={28} className="text-primary" />
                    ) : (
                      <Upload size={28} className="text-muted-foreground" />
                    )}
                  </div>
                  {uploadedFile ? (
                    <>
                      <p className="text-foreground font-medium">{uploadedFile}</p>
                      <p className="text-sm text-muted-foreground">File ready to submit</p>
                    </>
                  ) : (
                    <>
                      <p className="text-foreground font-medium">
                        Drag & drop your file here
                      </p>
                      <p className="text-sm text-muted-foreground">
                        or click to browse · PDF, DOCX, ZIP up to 25MB
                      </p>
                    </>
                  )}
                </div>
              </div>

              {uploadedFile && (
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" className="rounded-full" onClick={() => setUploadedFile(null)}>
                    Remove
                  </Button>
                  <Button className="rounded-full px-8">Submit Assignment</Button>
                </div>
              )}
            </div>

            {/* Submission History */}
            <div className="bg-card rounded-3xl p-8 shadow-card space-y-6">
              <h2 className="text-heading text-foreground">Submission History</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Assignment</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Course</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissionHistory.map((item) => {
                      const status = statusConfig[item.status as keyof typeof statusConfig];
                      const StatusIcon = status.icon;
                      return (
                        <tr key={item.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-4">
                            <span className="font-medium text-foreground">{item.title}</span>
                          </td>
                          <td className="py-4 px-4 text-sm text-muted-foreground hidden md:table-cell">{item.course}</td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">{item.date}</td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${status.className}`}>
                              <StatusIcon size={12} />
                              {status.label}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-semibold text-foreground">{item.grade || "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Assignments;
