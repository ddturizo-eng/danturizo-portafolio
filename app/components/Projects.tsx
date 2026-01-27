'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'HC Efectos',
      category: 'Landing Page',
      description: 'Landing page con galería interactiva y modal de cotización. Diseño moderno y responsive con formularios dinámicos.',
      image: '/img/proyectos/hc.png',
      size: 'large',
      tech: ['React', 'Next.js', 'Tailwind CSS']
    },
    {
      id: 2,
      title: 'Stock Flow',
      category: 'Sistema de Gestión',
      description: 'Sistema completo de gestión de inventario y ventas desarrollado en Java. Incluye IA para predicción de ventas, consumo de API DeepSeek, generación de reportes PDF y gráficas avanzadas.',
      image: '/img/proyectos/stockflowp.png',
      size: 'featured',
      tech: ['Java', 'PLSQL', 'DeepSeek AI', 'Charts']
    },
    {
      id: 3,
      title: 'Abogados & Ingenieros',
      category: 'Corporate Website',
      description: 'Landing page profesional para firma de abogados e ingenieros. Diseño corporativo con secciones de servicios y contacto.',
      image: '/img/proyectos/ayr.jpeg',
      size: 'medium',
      tech: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 4,
      title: 'Fundación Social',
      category: 'Non-Profit Website',
      description: 'Frontend para página web de fundación. Interfaz amigable enfocada en la misión social y donaciones.',
      image: '/img/proyectos/fundluciana.png',
      size: 'medium',
      tech: ['React', 'Tailwind CSS']
    }
  ];

  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-white" />
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">★ Recent Projects</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
                Recent <span className="text-gray-400">Designs</span>
                <motion.span
                  className="inline-block ml-4"
                  animate={{ rotate: [0, 45, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowUpRight className="w-12 h-12 text-white" strokeWidth={2} />
                </motion.span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl">
                Showcase of some of my recent sleek websites and applications
              </p>
            </div>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all"
              >
                See All Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all"
              >
                Contact Now
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Project 1 - HC Efectos */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 group"
          >
            <div className="relative h-[400px] lg:h-[500px] bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden cursor-pointer">
              {/* Imagen */}
              <Image
                src={projects[0].image}
                alt={projects[0].title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 58vw"
                className="object-cover"
                priority
              />
              
              {/* Overlay con información */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-gray-400 text-sm mb-2 block">{projects[0].category}</span>
                  <h3 className="text-3xl font-bold text-white mb-3">{projects[0].title}</h3>
                  <p className="text-gray-300 mb-4">{projects[0].description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {projects[0].tech.map((tech) => (
                      <span key={tech} className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón de acción */}
              <motion.div
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUpRight className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Project 3 - Abogados */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-5 group"
          >
            <div className="relative h-[400px] lg:h-[500px] bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden cursor-pointer">
              {/* Imagen */}
              <Image
                src={projects[2].image}
                alt={projects[2].title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 42vw, 42vw"
                className="object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-gray-400 text-sm mb-2 block">{projects[2].category}</span>
                  <h3 className="text-2xl font-bold text-white mb-3">{projects[2].title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{projects[2].description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {projects[2].tech.map((tech) => (
                      <span key={tech} className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-300">
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

          {/* Project 4 - Fundación */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-5 group"
          >
            <div className="relative h-[400px] lg:h-[500px] bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden cursor-pointer">
              {/* Imagen */}
              <Image
                src={projects[3].image}
                alt={projects[3].title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 42vw, 42vw"
                className="object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-gray-400 text-sm mb-2 block">{projects[3].category}</span>
                  <h3 className="text-2xl font-bold text-white mb-3">{projects[3].title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{projects[3].description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {projects[3].tech.map((tech) => (
                      <span key={tech} className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-300">
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

          {/* Project 2 - Stock Flow (Featured) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-7 group"
          >
            <div className="relative h-[500px] lg:h-[600px] bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden cursor-pointer">
              {/* Imagen */}
              <Image
                src={projects[1].image}
                alt={projects[1].title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 58vw"
                className="object-cover"
              />
              
              {/* Badge Featured */}
              <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
                <span className="text-white text-xs font-medium">★ Featured Project</span>
              </div>

              {/* Overlay con información */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <span className="text-gray-400 text-sm mb-2 block">{projects[1].category}</span>
                  <h3 className="text-4xl font-bold text-white mb-4">{projects[1].title}</h3>
                  <p className="text-gray-300 text-lg mb-6 max-w-2xl">{projects[1].description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {projects[1].tech.map((tech) => (
                      <span key={tech} className="text-sm px-4 py-2 bg-white/10 rounded-full text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón de acción */}
              <motion.div
                className="absolute top-6 right-6 w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUpRight className="w-7 h-7 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* View project button on hover message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">Hover over projects to see details</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;