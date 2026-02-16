import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    // No backend — show success state
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-medium">
            Contact
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground">
            Ready to start your project? Send us a message and we'll get back to you.
          </p>
        </motion.div>

        {/* Contact Information Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-4 mb-8"
        >
          {/* Phone */}
          <a
            href="tel:+15551234567"
            className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
          >
            <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground mb-1">Call Us</p>
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                +1 (555) 123-4567
              </p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:contact@kdbuilders.com"
            className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
          >
            <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground mb-1">Email Us</p>
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                contact@kdbuilders.com
              </p>
            </div>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-card rounded-2xl border border-border"
            >
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="font-display text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-muted-foreground">
                We'll get back to you as soon as possible.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl border border-border p-8 md:p-10">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
                {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
