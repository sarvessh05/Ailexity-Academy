import { Link } from "react-router-dom";

const columns = [
  {
    title: "Product",
    links: ["Courses", "Pricing", "Enterprise", "Mobile App"],
  },
  {
    title: "Resources",
    links: ["Blog", "Documentation", "Help Center", "Community"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
];

export function Footer() {
  return (
    <footer className="bg-charcoal section-padding pt-16 pb-8">
      <div className="container-main">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="text-xl font-bold text-charcoal-foreground">
              Ailexity Academy
            </Link>
            <p className="text-sm text-charcoal-foreground/60 mt-3 leading-relaxed">
              Empowering learners worldwide with premium education.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-charcoal-foreground mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-charcoal-foreground/50 hover:text-charcoal-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-charcoal-foreground/10 pt-8">
          <p className="text-xs text-charcoal-foreground/40 text-center">
            © 2026 Ailexity Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
