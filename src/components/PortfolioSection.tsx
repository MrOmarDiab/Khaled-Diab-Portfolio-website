import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Category = "all" | "before-after" | "new-build" | "renovation";

interface ProjectImage {
  url: string;
  caption?: string;
}

interface Project {
  id: number;
  title: string;
  category: Category;
  description: string;
  coverImage: string;
  images: ProjectImage[];
}

const imageModules = import.meta.glob(
  "/src/assets/images/projects/**/*.{png,jpg,jpeg,webp,svg,gif}",
  { eager: true, import: "default" }
) as Record<string, string>;

const ALL_PROJECTS_FOLDER = "all-projects";

const TAB_FOLDERS: Record<Exclude<Category, "all">, string> = {
  "before-after": "before-after",
  "new-build": "new-build",
  renovation: "renovation",
};

const toTitle = (value: string) =>
  value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const getFileBase = (filename: string) => filename.replace(/\.[^.]+$/, "");

const buildProjectsFromImages = (): Project[] => {
  const entries = Object.entries(imageModules)
    .map(([path, url]) => {
      const relative = path.replace("/src/assets/images/projects/", "");
      const segments = relative.split("/").filter(Boolean);
      const filename = segments[segments.length - 1] ?? "";
      return {
        relative,
        segments,
        url,
        filename,
        isCover: /^cover-/.test(filename),
      };
    })
    .sort((a, b) => a.relative.localeCompare(b.relative));

  const projects: Project[] = [];
  let nextId = 1;

  const addProject = (title: string, category: Category, images: ProjectImage[]) => {
    if (images.length === 0) return;
    const coverImage = images.find((image) => image.url.startsWith("cover:"));
    const cleanedImages = images.map((image) => ({
      ...image,
      url: image.url.replace(/^cover:/, ""),
    }));
    const coverUrl = coverImage
      ? coverImage.url.replace(/^cover:/, "")
      : cleanedImages[0].url;
    projects.push({
      id: nextId++,
      title,
      category,
      description: "",
      coverImage: coverUrl,
      images: cleanedImages,
    });
  };

  const allGroups = new Map<string, ProjectImage[]>();
  entries.forEach((entry) => {
    if (entry.segments[0] !== ALL_PROJECTS_FOLDER) return;
    const group = entry.segments[1] ?? "misc";
    const caption = toTitle(getFileBase(entry.filename));
    const images = allGroups.get(group) ?? [];
    const url = entry.isCover ? `cover:${entry.url}` : entry.url;
    images.push({ url, caption });
    allGroups.set(group, images);
  });

  Array.from(allGroups.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([group, images]) => {
      addProject(toTitle(group), "all", images);
    });

  (Object.entries(TAB_FOLDERS) as Array<[Exclude<Category, "all">, string]>).forEach(
    ([category, folder]) => {
      const groups = new Map<string, ProjectImage[]>();
      entries.forEach((entry) => {
        if (entry.segments[0] !== folder) return;
        const group = entry.segments[1] ?? folder;
        const labelCandidate =
          entry.segments.length > 2
            ? entry.segments[entry.segments.length - 2]
            : getFileBase(entry.filename);
        const caption = toTitle(labelCandidate);
        const images = groups.get(group) ?? [];
        const url = entry.isCover ? `cover:${entry.url}` : entry.url;
        images.push({ url, caption });
        groups.set(group, images);
      });

      Array.from(groups.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .forEach(([group, images]) => {
          const title = group === folder ? toTitle(folder) : toTitle(group);
          addProject(title, category, images);
        });
    }
  );

  return projects;
};

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "before-after", label: "Before / After" },
  { key: "new-build", label: "New Build" },
  { key: "renovation", label: "Renovation" },
];

const PortfolioSection = () => {
  const projects = useMemo(() => buildProjectsFromImages(), []);
  const [active, setActive] = useState<Category>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint is 768px
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsPerPage = isMobile ? 3 : 9;
  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);
  
  // Reset to page 0 when category changes
  const handleCategoryChange = (category: Category) => {
    setActive(category);
    setCurrentPage(0);
  };

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = filtered.slice(startIndex, endIndex);

  const getVisiblePageNumbers = () => {
    if (!isMobile) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    if (currentPage <= 0) return [0, 1, 2];
    if (currentPage >= totalPages - 1) return [totalPages - 3, totalPages - 2, totalPages - 1];

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setSelectedImageIndex(0);
    setIsOpen(true);
  };

  const handlePrevious = () => {
    if (selectedProject && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedProject && selectedImageIndex < selectedProject.images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    setTouchEnd({ x: endX, y: endY });
    
    if (touchStart !== null) {
      const horizontalDistance = touchStart.x - endX;
      const verticalDistance = touchStart.y - endY;
      
      // Check vertical swipe (up/down) to close
      if (Math.abs(verticalDistance) > 100) {
        setIsOpen(false);
      }
      // Check horizontal swipe for image navigation
      else if (Math.abs(horizontalDistance) > 50) {
        if (horizontalDistance > 50) {
          handleNext();
        } else if (horizontalDistance < -50) {
          handlePrevious();
        }
      }
    }
  };

  // Calculate visible thumbnails (show 5 max, centered around current)
  const getVisibleThumbnails = () => {
    if (!selectedProject) return [];
    
    const totalImages = selectedProject.images.length;
    if (totalImages <= 5) {
      return selectedProject.images.map((img, idx) => ({ img, index: idx }));
    }

    let start = Math.max(0, selectedImageIndex - 2);
    let end = Math.min(totalImages, start + 5);
    
    // Adjust if we're near the end
    if (end === totalImages) {
      start = Math.max(0, end - 5);
    }
    
    return selectedProject.images
      .slice(start, end)
      .map((img, idx) => ({ img, index: start + idx }));
  };

  return (
    <section id="portfolio" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-medium">
            Portfolio
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Our Work
          </h2>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat.key
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <AnimatePresence mode="popLayout">
            {paginatedProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                onClick={() => handleProjectClick(project)}
                className="group relative overflow-hidden rounded-xl bg-card border border-border cursor-pointer"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <p className="text-xs text-primary mt-1">
                      {project.images.length} {project.images.length === 1 ? 'image' : 'images'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-row justify-center items-center gap-2"
          >
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-4 py-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              {isMobile ? <ChevronLeft className="h-4 w-4" /> : "← Previous"}
            </button>

            {getVisiblePageNumbers().map((pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => setCurrentPage(pageIndex)}
                className={`min-w-10 px-3 py-2 rounded-lg font-medium transition-all ${
                  currentPage === pageIndex
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {pageIndex + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-4 py-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              {isMobile ? <ChevronRight className="h-4 w-4" /> : "Next →"}
            </button>
          </motion.div>
        )}

        {/* Lightbox Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent 
            className="max-w-5xl w-full h-full md:h-auto p-0 bg-black/95 border-none rounded-none md:rounded-lg"
            onKeyDown={handleKeyDown}
          >
            {selectedProject && (
              <>
                {/* Mobile View - Image Focused */}
                <div 
                  className="md:hidden relative w-screen h-screen flex flex-col items-center justify-center"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  onClick={(e) => {
                    // Only close if clicking outside the image or buttons
                    if (e.target === e.currentTarget) {
                      setIsOpen(false);
                    }
                  }}
                >
                  {/* Image Container - Takes full space */}
                  <div className="relative w-full h-full flex items-center justify-center px-8">
                    <img
                      src={selectedProject.images[selectedImageIndex].url}
                      alt={selectedProject.images[selectedImageIndex].caption || selectedProject.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Previous Button - Left */}
                  <button
                    onClick={handlePrevious}
                    disabled={selectedImageIndex === 0}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all ${
                      selectedImageIndex === 0 ? "opacity-20 cursor-not-allowed" : "opacity-60 hover:opacity-100"
                    }`}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </button>

                  {/* Next Button - Right */}
                  <button
                    onClick={handleNext}
                    disabled={selectedImageIndex === selectedProject.images.length - 1}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all ${
                      selectedImageIndex === selectedProject.images.length - 1 ? "opacity-20 cursor-not-allowed" : "opacity-60 hover:opacity-100"
                    }`}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>

                  {/* Image Counter and Title at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pb-8">
                    <h3 className="font-display text-lg font-semibold text-white mb-2">
                      {selectedProject.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-white/80 text-sm">
                        {selectedProject.images[selectedImageIndex].caption}
                      </p>
                      <p className="text-white/70 text-xs font-medium">
                        {selectedImageIndex + 1} / {selectedProject.images.length}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop View - Original Layout */}
                <div className="hidden md:flex flex-col items-center justify-between min-h-[70vh] h-full">
                  {/* Title at Top */}
                  <div className="w-full text-center py-4 px-6 border-b border-white/10">
                    <h3 className="text-lg font-display font-semibold text-white">
                      {selectedProject.title}
                    </h3>
                  </div>

                  {/* Main Image Area */}
                  <div className="relative flex items-center justify-center w-full flex-1 py-4">
                    {/* Previous Button */}
                    <button
                      onClick={handlePrevious}
                      disabled={selectedImageIndex === 0}
                      className={`absolute left-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all ${
                        selectedImageIndex === 0 ? "opacity-30 cursor-not-allowed" : "opacity-70 hover:opacity-100"
                      }`}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6 text-white" />
                    </button>

                    {/* Image Container */}
                    <div className="flex items-center justify-center w-full px-20">
                      <img
                        src={selectedProject.images[selectedImageIndex].url}
                        alt={selectedProject.images[selectedImageIndex].caption || selectedProject.title}
                        className="max-h-[55vh] w-auto object-contain rounded-lg"
                      />
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={handleNext}
                      disabled={selectedImageIndex === selectedProject.images.length - 1}
                      className={`absolute right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all ${
                        selectedImageIndex === selectedProject.images.length - 1 ? "opacity-30 cursor-not-allowed" : "opacity-70 hover:opacity-100"
                      }`}
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6 text-white" />
                    </button>
                  </div>

                  {/* Description at Bottom */}
                  <div className="w-full text-center py-4 px-6 border-t border-white/10">
                    <div className="space-y-1">
                      {selectedProject.images[selectedImageIndex].caption && (
                        <p className="text-white/90 text-sm font-medium">
                          {selectedProject.images[selectedImageIndex].caption}
                        </p>
                      )}
                      <p className="text-white/60 text-xs">
                        {selectedProject.description}
                      </p>
                      <p className="text-white/50 text-xs">
                        {selectedImageIndex + 1} / {selectedProject.images.length}
                      </p>
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="w-full bg-black/50 backdrop-blur-sm border-t border-white/10 px-8 py-6">
                    <div className="flex justify-center items-center gap-3 max-w-3xl mx-auto">
                      {getVisibleThumbnails().map(({ img, index }) => (
                        <button
                          key={index}
                          onClick={() => handleThumbnailClick(index)}
                          className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                            index === selectedImageIndex 
                              ? "ring-2 ring-primary ring-offset-2 ring-offset-black/50 scale-110" 
                              : "opacity-60 hover:opacity-100 hover:scale-105"
                          }`}
                        >
                          <img
                            src={img.url}
                            alt={img.caption || `Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {index === selectedImageIndex && (
                            <div className="absolute inset-0 border-2 border-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default PortfolioSection;
