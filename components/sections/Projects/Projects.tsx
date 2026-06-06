'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { PROJECTS } from '@/data';
import { useReducedMotion } from '@/hooks';

export function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const [featured, ...rest] = PROJECTS;

  return (
    <section
      id="projects"
      className="py-32 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-white" />
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              ★ Recent Projects
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
                Recent <span className="text-gray-400">Projects</span>
                <motion.span
                  className="inline-block ml-4"
                  animate={prefersReducedMotion ? {} : { rotate: [0, 45, 0] }}
                  transition={prefersReducedMotion ? {} : { duration: 2, repeat: Infinity }}
                >
                  <ArrowUpRight
                    className="w-12 h-12 text-white"
                    strokeWidth={2}
                  />
                </motion.span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl">
                Showcase of some of my recent projects and applications
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          key={featured.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="relative h-[400px] lg:h-[500px] bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden cursor-pointer group">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover"
              loading="lazy"
              placeholder="blur"
            />
            <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
              <span className="text-white text-xs font-medium">
                ★ Featured Project
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <span className="text-gray-400 text-sm mb-2 block">
                  {featured.category}
                </span>
                <h3 className="font-bold text-white mb-3 text-4xl">
                  {featured.title}
                </h3>
                <p className="text-gray-300 mb-4 text-lg">
                  {featured.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {featured.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 rounded-full text-gray-300 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <motion.div
              className="absolute top-6 right-6 w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: idx * 0.1,
              }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-[350px] bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden cursor-pointer">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="text-gray-400 text-sm mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="font-bold text-white mb-3 text-3xl">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/10 rounded-full text-gray-300 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <motion.div
                  className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                >
                  <ArrowUpRight className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            Hover over projects to see details
          </p>
        </motion.div>
      </div>
    </section>
  );
}
