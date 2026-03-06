import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left — Brand Panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-charcoal p-12 text-charcoal-foreground">
        <Link to="/" className="text-2xl font-bold text-primary-foreground">Ailexity Academy</Link>
        <div className="space-y-6 max-w-md">
          <h1 className="text-display-sm text-primary-foreground leading-tight">
            Start your learning journey today
          </h1>
          <p className="text-charcoal-foreground/70 text-lg">
            Join thousands of learners mastering skills that shape the future.
          </p>
        </div>
        <p className="text-charcoal-foreground/40 text-sm">© 2026 Ailexity Academy. All rights reserved.</p>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[420px] space-y-8 animate-fade-in">
          <div className="lg:hidden mb-8">
            <Link to="/" className="text-2xl font-bold text-foreground">Ailexity Academy</Link>
          </div>

          <div>
            <h2 className="text-display-xs text-foreground">Create account</h2>
            <p className="text-muted-foreground mt-2">Fill in your details to get started for free.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" placeholder="John" className="h-12 rounded-xl bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="Doe" className="h-12 rounded-xl bg-background" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="h-12 rounded-xl bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 rounded-xl bg-background pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
