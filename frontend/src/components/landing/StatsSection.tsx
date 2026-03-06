const stats = [
  { value: "50K+", label: "Active Learners" },
  { value: "200+", label: "Expert Courses" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "15K+", label: "Certificates Awarded" },
];

export function StatsSection() {
  return (
    <section className="section-padding section-gap">
      <div className="container-main">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-display-xs md:text-display-sm text-primary font-extrabold">{stat.value}</p>
              <p className="text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
