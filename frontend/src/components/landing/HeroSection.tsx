import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-illustration.png";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background pointer-events-none" />

      <div className="container-main section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="max-w-xl">
            <p className="font-serif text-lg md:text-xl text-primary mb-4 animate-fade-in italic">
              Elevate Your Learning
            </p>
            <h1 className="text-display-xs md:text-display-sm lg:text-display text-foreground mb-6 animate-fade-in-up text-balance">
              Master Skills That Shape the Future
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
              Join thousands of learners accessing world-class courses, expert instructors, 
              and a community that pushes you forward.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" className="rounded-full px-8 gap-2" asChild>
                <Link to="/dashboard">
                  Start Learning <ArrowRight size={18} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 gap-2">
                <Play size={16} /> Watch Demo
              </Button>
            </div>

            {/* Social proof mini */}
            <div className="flex items-center gap-4 mt-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-xs font-bold text-primary"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">12,000+ Students</p>
                <p className="text-xs text-muted-foreground">already learning with us</p>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative animate-scale-in">
            <div className="rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={heroImage}
                alt="Learning platform abstract illustration"
                className="w-full h-auto object-cover animate-float"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-card-hover p-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">🎯</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">98% Completion Rate</p>
                  <p className="text-xs text-muted-foreground">Our top courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
