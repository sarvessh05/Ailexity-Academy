import { BookOpen, Users, Award, BarChart3 } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals with real-world experience and proven track records.",
    span: "lg:col-span-2",
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Collaborate with peers, join study groups, and grow together.",
    span: "",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "Visual dashboards showing your learning journey in real time.",
    span: "",
  },
  {
    icon: Award,
    title: "Earn Certificates",
    description: "Get recognized with industry-standard certifications upon course completion.",
    span: "lg:col-span-2",
  },
];

export function FeatureCards() {
  return (
    <section id="features" className="section-padding section-gap">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Features</p>
          <h2 className="text-display-xs md:text-display-sm text-foreground mb-4 text-balance">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground text-lg">
            A complete learning ecosystem designed to accelerate your growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group bg-card rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 ${feature.span}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-heading text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
