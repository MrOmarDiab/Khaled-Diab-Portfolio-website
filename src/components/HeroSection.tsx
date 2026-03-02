import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import profilePicture from "@/assets/images/profile picture/profile-picture.jpeg";

const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, hsl(38 90% 55% / 0.15) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, hsl(38 70% 45% / 0.1) 0%, transparent 50%)`
      }} />

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* Left Side: Profile Picture and Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-shrink-0 w-full lg:w-auto lg:max-w-md"
          >
            {/* Profile Picture */}
            <div className="mb-6">
              <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/50 rounded-full blur-xl opacity-30" />
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="relative w-full h-full rounded-full object-cover border-4 border-primary/20 shadow-xl"
                />
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
              <p className="text-foreground/80 text-sm md:text-base leading-relaxed text-center lg:text-left">
                <span className="font-semibold text-primary">I’m Khaled Diab</span> — 
                bringing over 35 years of experience in construction, general contracting, and property maintenance.
                I provide complete interior design and construction services for residential and commercial spaces,
                combining practical solutions with quality workmanship to create spaces that are built to last.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Main Content */}
          <div className="w-full lg:w-[52%] text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm uppercase tracking-[0.3em] text-primary mb-6 font-medium"
            >
              Building Excellence Since 2010
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              We Build Your
              <br />
              <span className="text-gradient">Vision</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-muted-foreground text-base md:text-lg lg:text-xl mb-10 max-w-xl mx-auto lg:mx-0"
            >
              General contracting, renovations, and specialized trades — 
              delivering quality craftsmanship on every project.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={scrollToPortfolio}
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              >
                View Our Work
              </button>
              <button
                onClick={scrollToContact}
                className="px-8 py-4 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-all duration-300"
              >
                Get In Touch
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
