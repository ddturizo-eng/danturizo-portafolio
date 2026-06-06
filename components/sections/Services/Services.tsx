'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Server, Users } from 'lucide-react';
import { MAIN_SERVICE, SECONDARY_SERVICES } from '@/data';

const serviceIcons = [Code, Database, Server, Users];

export function Services() {
  return (
    <section
      id="services"
      className="py-12 md:py-20 px-4 md:px-6 relative overflow-hidden bg-black"
    >
      <div className="absolute top-1/4 left-1/3 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-gray-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
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

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {[MAIN_SERVICE, ...SECONDARY_SERVICES].map((service, idx) => {
            const Icon = serviceIcons[idx] || Code;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 group hover:bg-black/50 transition-all"
              >
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="rounded-xl md:rounded-2xl bg-white/5 p-3 md:p-4 group-hover:bg-white/10 transition-all">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {service.technologies.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="bg-white/5 border border-white/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

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
            Let&apos;s Work Together
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
