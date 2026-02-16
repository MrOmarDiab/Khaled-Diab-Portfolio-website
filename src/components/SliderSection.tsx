import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=600&fit=crop",
    title: "Modern Family Home",
    description: "A stunning new build featuring open-plan living and sustainable materials.",
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=600&fit=crop",
    title: "Complete Renovation",
    description: "Transforming a dated property into a contemporary masterpiece.",
  },
  {
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=600&fit=crop",
    title: "Luxury Villa Project",
    description: "Custom-built estate with premium finishes and landscaping.",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=600&fit=crop",
    title: "Outdoor Living Space",
    description: "Beautiful deck and patio area designed for year-round enjoyment.",
  },
];

const SliderSection = () => {
  return (
    <section className="py-12 md:py-24">
      <div className="px-6 mb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-medium">
              Featured
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Highlighted Projects
            </h2>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full px-0 md:px-6"
      >
        <div className="md:container md:mx-auto md:max-w-6xl">
          <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="relative overflow-hidden md:rounded-2xl aspect-square md:aspect-[2/1]">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12">
                      <h3 className="font-display text-xl md:text-3xl font-bold mb-1 md:mb-2 text-foreground line-clamp-2">
                        {slide.title}
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-base max-w-lg line-clamp-2 md:line-clamp-none">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:left-4 bg-card/80 border-border hover:bg-card text-foreground size-8 md:size-10" />
            <CarouselNext className="right-2 md:right-4 bg-card/80 border-border hover:bg-card text-foreground size-8 md:size-10" />
          </Carousel>
        </div>
      </motion.div>
    </section>
  );
};

export default SliderSection;
