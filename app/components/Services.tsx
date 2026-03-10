'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Layers, Palette, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Imágenes del carrusel para Full Stack Development
  const carouselImages = [
    '/img/proyectos/proyecto1.jpg',
    '/img/proyectos/proyecto2.png',
    '/img/proyectos/proyecto3.png',
    '/img/proyectos/proyecto4.png'
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const slideWidth = window.innerWidth < 768 ? 283 : 320; // 280px/300px + gap
      const currentScrollLeft = container.scrollLeft;
      const newScrollLeft = direction === 'left' 
        ? Math.max(0, currentScrollLeft - slideWidth)
        : Math.min(container.scrollWidth - container.clientWidth, currentScrollLeft + slideWidth);
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      // Calculate new index based on actual scroll position
      const newIndex = Math.round(newScrollLeft / slideWidth);
      setCurrentSlide(Math.min(Math.max(0, newIndex), carouselImages.length - 1));
    }
  };

  // Auto-update current slide based on scroll position with debounce
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let timeoutId: NodeJS.Timeout;

    const handleScrollUpdate = () => {
      // Clear previous timeout
      clearTimeout(timeoutId);
      
      // Set new timeout for debounce
      timeoutId = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const slideWidth = window.innerWidth < 768 ? 283 : 320;
        const newIndex = Math.round(scrollLeft / slideWidth);
        setCurrentSlide(Math.min(Math.max(0, newIndex), carouselImages.length - 1));
      }, 100); // Debounce de 100ms
    };

    container.addEventListener('scroll', handleScrollUpdate, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScrollUpdate);
      clearTimeout(timeoutId);
    };
  }, [carouselImages.length]);

  return (
    <section id="services" className="min-h-screen py-12 md:py-20 px-4 md:px-6 relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/3 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-gray-800/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Development</span>{' '}
              <span className="text-gray-400">Services</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl">
              Explore a suite of development services to elevate your brand.
            </p>
          </motion.div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:bg-gray-100 transition-all whitespace-nowrap text-sm md:text-base"
          >
            Contact Now
          </motion.a>
        </div>

        {/* Main Service - Full Stack Development with Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
              {/* Left - Content */}
              <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="rounded-xl md:rounded-2xl bg-white/5 p-3 md:p-4">
                    <Code className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    Full Stack Development
                  </h3>
                </div>
                <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
                  Building complete, scalable web applications with modern technologies like React, Next.js, Java Spring Boot, and PostgreSQL. From frontend to backend, ensuring seamless integration and optimal performance.
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3 pt-2 md:pt-4">
                  {['React & Next.js', 'Java Spring Boot', 'PostgreSQL', 'RESTful APIs', 'Responsive Design'].map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-white/5 border border-white/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right - Carousel */}
              <div className="relative order-1 lg:order-2">
                {/* Swipe Indicator - Solo visible en mobile */}
                <div className="flex md:hidden items-center justify-center gap-2 mb-3 text-gray-500 text-xs">
                  <ChevronLeft className="w-4 h-4 animate-pulse" />
                  <span>Swipe to explore</span>
                  <ChevronRight className="w-4 h-4 animate-pulse" />
                </div>

                <div 
                  ref={scrollContainerRef}
                  className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth hide-scrollbar snap-x snap-mandatory touch-pan-x"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch', // Smooth scrolling en iOS
                  }}
                >
                  {carouselImages.map((img, idx) => (
                    <motion.div
                      key={idx}
                      className="relative min-w-[280px] md:min-w-[300px] h-[350px] md:h-[400px] rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex-shrink-0 snap-center"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={img}
                        alt={`Full Stack Project ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 280px, 300px"
                        className="object-cover pointer-events-none"
                        quality={75}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBgcTFCIx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AOn5XltGkttIu7aKGGRI5EkkQMwDqGBBI9HXR/2Wu7iy0a2lsru4tpmvrdS9vM0TFTLGCpKkHBBIx+DrzP2+7gt9F2lu7U5VDR2dvDclT4JWKdGI/evQfb7eWm742ptvcGm3Mdxb3FrbyxvGwIZXiQg/o0dYlK1L4q6V//2Q=="
                        onError={() => {
                          console.error(`Error loading image: ${img}`);
                        }}
                      />
                      
                      {/* Overlay gradient for better text visibility if needed */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
                      
                      {/* Slide number indicator - Only on mobile */}
                      <div className="absolute top-3 right-3 md:hidden bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                        {idx + 1} / {carouselImages.length}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Carousel Controls - Ocultos en mobile, visibles en desktop */}
                <div className="hidden md:flex items-center justify-center gap-3 md:gap-4 mt-4 md:mt-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleScroll('left')}
                    disabled={currentSlide === 0}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.button>
                  
                  <div className="flex gap-1.5 md:gap-2">
                    {carouselImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (scrollContainerRef.current) {
                            scrollContainerRef.current.scrollTo({
                              left: idx * 320,
                              behavior: 'smooth'
                            });
                          }
                        }}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentSlide ? 'bg-white w-6 md:w-8' : 'bg-white/30 w-2'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleScroll('right')}
                    disabled={currentSlide === carouselImages.length - 1}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.button>
                </div>

                {/* Indicadores de slides - Visibles en mobile en la parte inferior */}
                <div className="flex md:hidden items-center justify-center gap-2 mt-4">
                  {carouselImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (scrollContainerRef.current) {
                          const container = scrollContainerRef.current;
                          const slideWidth = 283; // 280px width + 3px gap
                          container.scrollTo({
                            left: idx * slideWidth,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentSlide ? 'bg-white w-8' : 'bg-white/30 w-2'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary Services Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* UI/UX Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 group hover:bg-black/50 transition-all"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="rounded-xl md:rounded-2xl bg-white/5 p-3 md:p-4 group-hover:bg-white/10 transition-all">
                <Layers className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                UI/UX Design
              </h3>
            </div>
            <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
              Crafting intuitive and visually stunning user interfaces with Figma and modern design principles. Creating experiences that users love and that drive conversions.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {['Figma', 'Responsive Design', 'Prototyping', 'User Research'].map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-white/5 border border-white/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Backend & Database */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 group hover:bg-black/50 transition-all"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="rounded-xl md:rounded-2xl bg-white/5 p-3 md:p-4 group-hover:bg-white/10 transition-all">
                <Palette className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                Backend & Database
              </h3>
            </div>
            <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
              Building robust backend systems with Java Spring Boot and designing efficient database structures using PostgreSQL and PLSQL for optimal performance and scalability.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {['Java', 'Spring Boot', 'PostgreSQL', 'PLSQL'].map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-white/5 border border-white/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-gray-400 text-base md:text-lg mb-4 md:mb-6">
            Ready to start your project?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:bg-white/15 transition-all text-sm md:text-base"
          >
            Let's Work Together
          </motion.a>
        </motion.div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Touch scrolling improvements */
        .touch-pan-x {
          touch-action: pan-x;
          -webkit-overflow-scrolling: touch;
        }

        /* Snap scroll for carousel */
        .snap-x {
          scroll-snap-type: x mandatory;
        }

        .snap-mandatory {
          scroll-snap-type: x mandatory;
        }

        .snap-center {
          scroll-snap-align: center;
          scroll-snap-stop: always;
        }

        /* Prevent image dragging */
        .pointer-events-none {
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
        }

        /* Smooth animations for pulse */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Custom scrollbar for other sections if needed */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          transition: background 0.3s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </section>
  );
};

export default Services;