import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section className="section-padding section-gap">
      <div className="container-main">
        <div className="bg-primary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-primary-foreground/5" />
          <div className="absolute bottom-[-30px] left-[-30px] w-[120px] h-[120px] rounded-full bg-primary-foreground/5" />

          <h2 className="text-display-xs md:text-display-sm text-primary-foreground mb-4 relative z-10 text-balance">
            Ready to Start Learning?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-lg mx-auto relative z-10">
            Join thousands of students already building their future with us.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full px-8 gap-2 relative z-10"
            asChild
          >
            <Link to="/dashboard">
              Get Started Free <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
