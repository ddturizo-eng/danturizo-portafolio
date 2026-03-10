'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

const Hero = () => {
  const mounted = useHydrated();

  // Reduced shooting stars for mobile performance
  const shootingStars = [
    { topStart: 15, leftStart: 20, topEnd: 115, leftEnd: 70 },
    { topStart: 35, leftStart: 60, topEnd: 135, leftEnd: 110 },
    { topStart: 10, leftStart: 80, topEnd: 110, leftEnd: 130 },
  ];

  // Reduced particles for mobile - reduced from 15 to 6
  const particles = [
    { top: 20, left: 30 },
    { top: 60, left: 70 },
    { top: 15, left: 85 },
    { top: 75, left: 20 },
    { top: 40, left: 50 },
    { top: 90, left: 60 },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/heroback.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
      </div>

      {/* Shooting Stars / Meteors - Solo se renderizan después del montaje */}
      {mounted && shootingStars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{
            top: `${star.topStart}%`,
            left: `${star.leftStart}%`,
            opacity: 0,
          }}
          animate={{
            top: [`${star.topStart}%`, `${star.topEnd}%`],
            left: [`${star.leftStart}%`, `${star.leftEnd}%`],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut",
          }}
        >
          <motion.div
            className="absolute w-8 h-0.5 bg-gradient-to-r from-white to-transparent"
            style={{ rotate: "45deg", transformOrigin: "left" }}
          />
        </motion.div>
      ))}

      {/* Floating particles - Solo se renderizan después del montaje */}
      {mounted && particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-gray-400/30 rounded-full"
          initial={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Radial gradient overlays */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gray-800/20 rounded-full blur-3xl z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="space-y-12">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <span className="text-sm text-gray-300 font-medium">⦿ UI/UX & Graphic Designer</span>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-6">
                  <span className="text-white">Daniel</span>{' '}
                  <span className="text-gray-400">Turizo</span>
                  <motion.span
                    className="inline-block ml-4"
                    animate={{ rotate: [0, 45, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowUpRight className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={2} />
                  </motion.span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 text-lg leading-relaxed max-w-xl"
              >
                I'm a versatile designer specializing in graphic, web, and product design to help grow your business. Let's build something great!
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4 flex-wrap"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-full font-medium text-sm hover:bg-white/15 transition-all"
                >
                  See All Projects
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-black px-8 py-4 rounded-full font-medium text-sm hover:bg-gray-100 transition-all"
                >
                  Contact Now
                </motion.a>
              </motion.div>
            </div>

            {/* Right Column - Floating Testimonial Cards */}
            <div className="relative h-[400px] hidden lg:block">
              {/* Card 1 - Top Right */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: -20, rotate: 0 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  y: 0,
                  rotate: [3, -2, 3],
                }}
                transition={{ 
                  opacity: { delay: 0.8, duration: 0.8 },
                  x: { delay: 0.8, duration: 0.8 },
                  y: { delay: 0.8, duration: 0.8 },
                  rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 0,
                  transition: { duration: 0.3 }
                }}
                className="absolute top-0 right-0 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-xs shadow-2xl cursor-pointer"
                style={{ transformOrigin: "center" }}
              >
                <p className="text-white text-sm mb-3 leading-relaxed">
                  " First, solve the problem.<br />Then, write the code. "
                </p>
                <p className="text-gray-500 text-xs">- John Johnson</p>
              </motion.div>

              {/* Card 2 - Bottom Left */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: 20, rotate: 0 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  y: 0,
                  rotate: [-3, 2, -3],
                }}
                transition={{ 
                  opacity: { delay: 1, duration: 0.8 },
                  x: { delay: 1, duration: 0.8 },
                  y: { delay: 1, duration: 0.8 },
                  rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 0,
                  transition: { duration: 0.3 }
                }}
                className="absolute bottom-0 left-0 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-xs shadow-2xl cursor-pointer"
                style={{ transformOrigin: "center" }}
              >
                <p className="text-white text-sm mb-3 leading-relaxed">
                  " Code is like humor.<br />When you have to explain it,<br />it's bad. "
                </p>
                <p className="text-gray-500 text-xs">- Cory House</p>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ 
                  x: [0, 20, 0],
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 right-1/4 w-3 h-3 bg-gray-400 rounded-full shadow-lg shadow-gray-400/50"
              />
              <motion.div
                animate={{ 
                  x: [0, -15, 0],
                  y: [0, 15, 0],
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.9, 0.4]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-gray-500 rounded-full shadow-lg shadow-gray-500/50"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;