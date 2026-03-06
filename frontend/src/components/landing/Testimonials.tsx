const testimonials = [
  {
    quote: "This platform completely changed my career trajectory. The course quality is unmatched.",
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    initials: "SC",
  },
  {
    quote: "The learning experience is seamless. I completed three certifications in just two months.",
    name: "Marcus Johnson",
    role: "Product Designer",
    initials: "MJ",
  },
  {
    quote: "Best investment in my education. The community support alone is worth it.",
    name: "Aisha Patel",
    role: "Data Scientist",
    initials: "AP",
  },
];

export function Testimonials() {
  return (
    <section className="section-padding section-gap bg-secondary/50">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="text-display-xs md:text-display-sm text-foreground text-balance">
            Loved by Learners Worldwide
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-card rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <p className="text-foreground leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
