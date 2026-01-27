'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, Phone, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider">
            ✦ Let's Connect
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mt-4 md:mt-6 mb-4 md:mb-6 px-4">
            Let's Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
              Amazing
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-12 px-4 max-w-2xl mx-auto">
            Ready to boost your business visibility and streamline your operations? Let's talk.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap mb-12 md:mb-16 px-4">
            <motion.a
              href="https://github.com/ddturizo-eng"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#1a1a1a] border border-white/10 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium text-sm md:text-base hover:bg-[#222] hover:border-white/20 transition-all"
            >
              View All Projects
            </motion.a>
            <motion.a
              href="https://wa.me/573006417405?text=Hola!%20Me%20gustaría%20trabajar%20contigo"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium text-sm md:text-base hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Get Started Now
            </motion.a>
          </div>
          
          {/* Services Info */}
          <div className="grid sm:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a] border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 text-left hover:border-white/20 transition-all"
            >
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">
                Web Development & SEO
              </h3>
              <p className="text-gray-400 text-sm md:text-base mb-3 md:mb-4">
                Modern websites designed to boost your business visibility and improve search rankings
              </p>
              <p className="text-white font-semibold text-lg md:text-xl">
                Starting from <span className="text-gray-300">$100</span>
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a] border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 text-left hover:border-white/20 transition-all"
            >
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">
                Custom Software Solutions
              </h3>
              <p className="text-gray-400 text-sm md:text-base mb-3 md:mb-4">
                Tailored software to streamline operations and maximize your business efficiency
              </p>
              <p className="text-white font-semibold text-lg md:text-xl">
                Custom pricing
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Footer */}
        <div className="border-t border-white/10 pt-8 md:pt-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12 px-4">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white flex items-center justify-center">
                  <span className="text-black font-bold text-lg md:text-xl">DT</span>
                </div>
                <span className="text-white font-bold text-xl md:text-2xl">Danturizo</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base max-w-xs">
                Crafting digital solutions that drive real business growth through modern web development and intelligent automation.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-base md:text-lg">Navigation</h4>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <a href="#services" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-base md:text-lg">Get in Touch</h4>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <a 
                    href="mailto:ddturizo@unicesar.edu.co" 
                    className="text-gray-400 hover:text-white text-sm md:text-base transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="break-all">ddturizo@unicesar.edu.co</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://wa.me/573006417405" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white text-sm md:text-base transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    +57 300 641 7405
                  </a>
                </li>
                <li className="text-gray-400 text-sm md:text-base pt-2">
                  Valledupar, Colombia
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-base md:text-lg">Follow Me</h4>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="https://github.com/ddturizo-eng"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center hover:bg-[#222] hover:border-white/20 transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-gray-400" />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/danturizo"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center hover:bg-[#222] hover:border-white/20 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-gray-400" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/daniel-turizo"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center hover:bg-[#222] hover:border-white/20 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-gray-400" />
                </motion.a>
                <motion.a
                  href="https://wa.me/573006417405"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center hover:bg-[#222] hover:border-white/20 transition-all"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 md:pt-8 border-t border-white/10 px-4">
            <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
              © 2025 Danturizo. All rights reserved.
            </p>
            <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-gray-500">
              <span>
                Designed & Built by{' '}
                <span className="text-white font-medium">Danturizo</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span>
                Made with{' '}
                <span className="text-white font-medium">Next.js</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span>
                Deployed on{' '}
                <span className="text-white font-medium">Vercel</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;