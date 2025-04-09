"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface AnimatedGalleryProps {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

function AnimatedGallery({
  images,
  title = "Our Gallery",
  subtitle = "Explore our collection of images",
  autoplay = true,
  autoplaySpeed = 5000,
}: AnimatedGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Handle autoplay
  useEffect(() => {
    if (autoplay && !lightboxOpen && activeIndex === null) {
      autoplayRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setActiveIndex(randomIndex);
        
        // Reset after a delay
        setTimeout(() => {
          setActiveIndex(null);
        }, autoplaySpeed / 2);
      }, autoplaySpeed);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, autoplaySpeed, images.length, lightboxOpen, activeIndex]);

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      nextImage();
    }

    if (touchStart - touchEnd < -100) {
      // Swipe right
      prevImage();
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    // Pause autoplay when lightbox is open
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  return (
    <section className="w-full py-16 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
            Our Showcase
          </span>
          <h2 className="text-4xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">
            {title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className={`relative rounded-xl overflow-hidden shadow-lg group ${
                  index % 3 === 0 ? "md:translate-y-8" : 
                  index % 3 === 1 ? "" : "md:-translate-y-8"
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <div 
                  className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={`object-cover transition-all duration-500 ${
                      activeIndex === index 
                        ? "scale-110" 
                        : activeIndex !== null 
                          ? "brightness-75" 
                          : ""
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                  >
                    {image.caption && (
                      <p className="text-white font-medium text-sm md:text-base">
                        {image.caption}
                      </p>
                    )}
                    <button 
                      className="mt-2 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 p-2 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(index);
                      }}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-5xl aspect-auto p-2 md:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="relative w-full h-[70vh] md:h-[80vh]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={images[lightboxIndex].src}
                      alt={images[lightboxIndex].alt}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="absolute left-0 top-1/2 -translate-y-1/2 p-2">
                <button
                  className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>
              
              <div className="absolute right-0 top-1/2 -translate-y-1/2 p-2">
                <button
                  className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              
              {images[lightboxIndex].caption && (
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white bg-black/50 inline-block px-4 py-2 rounded-lg"
                  >
                    {images[lightboxIndex].caption}
                  </motion.p>
                </div>
              )}
            </motion.div>
            
            <div className="absolute bottom-4 left-0 right-0">
              <div className="flex justify-center gap-2 px-4">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === lightboxIndex
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 w-4"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
export default AnimatedGallery;