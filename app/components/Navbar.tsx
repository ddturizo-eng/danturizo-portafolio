'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrolled(latest > 50);
    });
  }, [scrollY]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          scrolled ? 'w-[95%] max-w-7xl' : 'w-[90%] max-w-6xl'
        }`}
      >
        <div className={`bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 transition-all duration-300 ${
          scrolled ? 'shadow-2xl shadow-black/50' : ''
        }`}>
          <div className="flex items-center justify-between">
            {/* Logo - Imagen circular + texto */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                {/* Logo imagen */}
                <Image 
                  src="/img/Logonav.png" 
                  alt="Dan Turizo Logo" 
                  width={40} 
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-semibold text-lg">Dan Turizo</span>
            </div>
            
            {/* Menu Desktop */}
            <div className="hidden md:flex items-center gap-8 text-sm">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#skills" className="text-gray-300 hover:text-white transition-colors">Skills</a>
              <a href="#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
              <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
            </div>

            {/* CTA Button Desktop */}
            <a href="#contact" className="hidden md:block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-6 py-2.5 rounded-full font-medium text-sm"
              >
                Get Started
              </motion.button>
            </a>

            {/* Hamburger Menu Button Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel - 50% width */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 w-1/2 h-full bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 md:hidden"
            >
              <div className="flex flex-col h-full p-8">
                {/* Close Button */}
                <div className="flex justify-end mb-12">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="flex flex-col gap-6 mb-12">
                  {['About', 'Skills', 'Projects', 'Services'].map((item, idx) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-white text-2xl font-medium hover:text-gray-300 transition-colors"
                    >
                      {item}
                    </motion.a>
                  ))}
                </nav>

                {/* CTA Button */}
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-auto"
                >
                  <button className="w-full bg-white text-black px-6 py-3 rounded-full font-medium text-sm">
                    Get Started
                  </button>
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;