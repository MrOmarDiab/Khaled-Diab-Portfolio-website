const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="container mx-auto max-w-8xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <a href="#" className="font-display text-xl font-bold text-foreground">
              Khaled<span className="text-primary">Diab</span>
            </a>
            <p className="text-sm text-muted-foreground mt-1">
              Quality construction, every time.
            </p>
          </div>

          <div className="flex gap-8">
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Portfolio
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Khaled Diab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
