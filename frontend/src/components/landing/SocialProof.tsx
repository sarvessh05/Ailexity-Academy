export function SocialProof() {
  const logos = ["Google", "Microsoft", "Apple", "Meta", "Amazon", "Netflix"];

  return (
    <section className="section-padding py-12 border-y border-border/50">
      <div className="container-main">
        <p className="text-center text-sm text-muted-foreground mb-8 tracking-wider uppercase">
          Trusted by teams at leading companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-lg font-bold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
