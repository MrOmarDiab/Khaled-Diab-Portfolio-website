import { motion } from "framer-motion";
import { Hammer, Home, Wrench } from "lucide-react";

const services = [
  {
    icon: Hammer,
    title: "General Contracting",
    description: "Full-service construction management from foundation to finishing touches.",
  },
  {
    icon: Home,
    title: "Remodeling & Renovation",
    description: "Transforming existing spaces into modern, functional environments.",
  },
  {
    icon: Wrench,
    title: "Specialized Trades",
    description: "Expert craftsmanship in electrical, plumbing, carpentry, and more.",
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
            What We Do
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Built on Quality
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            With years of experience across residential and commercial projects,
            we deliver exceptional results every time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
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
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
