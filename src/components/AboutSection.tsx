import { motion } from "framer-motion";

const services = [
  {
    icon: "🧱",
    title: "Interior Construction & Finishing",
    description: [
      "Flooring & tile installation",
      "Drywall installation & repairs",
      "Framing & wall construction",
      "Painting & finishing work",
    ],
  },
  {
    icon: "⚡",
    title: "Electrical, Plumbing & Lighting",
    description: [
      "Electrical wiring & upgrades",
      "Plumbing installation & repairs",
      "Custom lighting solutions",
      "Fixture & system installations",
    ],
  },
  {
    icon: "🏗",
    title: "Custom & Specialty Spaces",
    description: [
      "Ceiling systems & custom designs",
      "Storage rooms & built-ins",
      "Cigar rooms (ventilation & finishes)",
      "Custom displays & feature installations",
    ],
  },
  {
    icon: "🏢",
    title: "Residential & Commercial Projects",
    description: [
      "Homes, apartments & renovations",
      "Offices, retail & commercial spaces",
      "Maintenance, upgrades & remodels",
      "Projects of all sizes",
    ],
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="container mx-auto max-w-8xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-medium">
            What I Do
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Built on Quality
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            With over 35 years of experience, I provide high-quality construction,
            remodeling, and specialty interior solutions for residential and commercial properties.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <span className="text-3xl leading-none" aria-hidden="true">{service.icon}</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">
                {service.title}
              </h3>
              {Array.isArray(service.description) ? (
                <ul className="text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
                  {service.description.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
