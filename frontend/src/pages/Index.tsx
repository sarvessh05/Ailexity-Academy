import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { SocialProof } from "@/components/landing/SocialProof";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { BigStatement } from "@/components/landing/BigStatement";
import { StatsSection } from "@/components/landing/StatsSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTABanner } from "@/components/landing/CTABanner";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SocialProof />
      <FeatureCards />
      <BigStatement />
      <StatsSection />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Index;
