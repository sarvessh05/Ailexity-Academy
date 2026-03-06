import { useState, useEffect, useCallback } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, CheckCircle2 } from "lucide-react";

const quizData = {
  title: "Introduction to UX Design",
  totalQuestions: 10,
  timeLimit: 1800, // 30 minutes in seconds
  questions: [
    {
      id: 1,
      question: "What does UX stand for?",
      options: ["User Experience", "User Extension", "Unified Experience", "Universal Exchange"],
      correct: 0,
    },
    {
      id: 2,
      question: "Which of the following is a key principle of UX design?",
      options: ["Complexity", "User-Centered Design", "Maximalism", "Feature Overload"],
      correct: 1,
    },
    {
      id: 3,
      question: "What is a wireframe?",
      options: [
        "A final design mockup",
        "A low-fidelity layout sketch",
        "A coding framework",
        "A testing methodology",
      ],
      correct: 1,
    },
    {
      id: 4,
      question: "What is the purpose of usability testing?",
      options: [
        "To test server performance",
        "To evaluate how easily users can interact with a product",
        "To check code quality",
        "To measure download speed",
      ],
      correct: 1,
    },
    {
      id: 5,
      question: "Which tool is commonly used for UI/UX design?",
      options: ["Visual Studio Code", "Figma", "MySQL", "Jenkins"],
      correct: 1,
    },
  ],
};

const Quiz = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(quizData.timeLimit);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [submitted, timeLeft]);

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }, []);

  const question = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelect = (optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = submitted
    ? quizData.questions.reduce(
        (acc, q, i) => (selectedAnswers[i] === q.correct ? acc + 1 : acc),
        0
      )
    : 0;

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 flex items-start justify-center p-6 md:p-8 lg:p-12">
          <div className="w-full max-w-[800px] space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-display-xs text-foreground">{quizData.title}</h1>
                <p className="text-muted-foreground mt-1">
                  Question {currentQuestion + 1} of {quizData.questions.length}
                </p>
              </div>
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium text-sm ${
                  timeLeft < 300
                    ? "bg-destructive/10 text-destructive"
                    : "bg-accent text-accent-foreground"
                }`}
              >
                <Clock size={16} />
                {formatTime(timeLeft)}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {submitted ? (
              /* Results */
              <div className="bg-card rounded-3xl p-8 md:p-12 shadow-card text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto">
                  <CheckCircle2 size={40} className="text-primary" />
                </div>
                <h2 className="text-heading text-foreground">Quiz Completed!</h2>
                <p className="text-muted-foreground text-lg">
                  You scored{" "}
                  <span className="font-bold text-primary">
                    {score}/{quizData.questions.length}
                  </span>
                </p>
                <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto pt-4">
                  <div className="bg-accent/50 rounded-2xl p-4">
                    <p className="text-2xl font-bold text-primary">{Math.round((score / quizData.questions.length) * 100)}%</p>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                  </div>
                  <div className="bg-accent/50 rounded-2xl p-4">
                    <p className="text-2xl font-bold text-foreground">{formatTime(quizData.timeLimit - timeLeft)}</p>
                    <p className="text-sm text-muted-foreground">Time Taken</p>
                  </div>
                </div>
                <Button className="rounded-full px-8 mt-4" onClick={() => window.location.reload()}>
                  Retry Quiz
                </Button>
              </div>
            ) : (
              /* Question Card */
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-card space-y-8">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground leading-snug">
                  {question.question}
                </h2>

                <div className="space-y-4">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswers[currentQuestion] === index;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelect(index)}
                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 text-base font-medium ${
                          isSelected
                            ? "border-primary bg-accent text-accent-foreground shadow-sm"
                            : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent/30"
                        }`}
                      >
                        <span className="inline-flex items-center gap-3">
                          <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation */}
            {!submitted && (
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  className="rounded-full gap-2"
                  onClick={() => setCurrentQuestion((c) => c - 1)}
                  disabled={currentQuestion === 0}
                >
                  <ChevronLeft size={16} /> Previous
                </Button>

                <div className="flex gap-2">
                  {quizData.questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentQuestion(i)}
                      className={`w-8 h-8 rounded-full text-xs font-medium transition-all duration-200 ${
                        i === currentQuestion
                          ? "bg-primary text-primary-foreground"
                          : selectedAnswers[i] !== undefined
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                {currentQuestion === quizData.questions.length - 1 ? (
                  <Button
                    className="rounded-full gap-2"
                    onClick={handleSubmit}
                    disabled={answeredCount < quizData.questions.length}
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Button
                    className="rounded-full gap-2"
                    onClick={() => setCurrentQuestion((c) => c + 1)}
                  >
                    Next <ChevronRight size={16} />
                  </Button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Quiz;
