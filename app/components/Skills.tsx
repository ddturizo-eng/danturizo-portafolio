'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript']
    },
    {
      title: 'Backend Engineering',
      technologies: ['Java', 'Spring Boot', 'Node.js', 'PostgreSQL', 'MongoDB']
    },
    {
      title: 'Tools & Workflow',
      technologies: ['Git', 'Docker', 'Figma', 'VS Code', 'MySQL']
    }
  ];

  const expertise = [
    {
      number: '01',
      title: 'Full Stack Architecture',
      description: 'Designing scalable systems from database to deployment with modern best practices'
    },
    {
      number: '02',
      title: 'UI/UX Implementation',
      description: 'Transforming designs into pixel-perfect, responsive interfaces that users love'
    },
    {
      number: '03',
      title: 'Performance Optimization',
      description: 'Building lightning-fast, efficient applications with optimal user experience'
    }
  ];



  return (
    <section id="skills" className="min-h-screen py-20 px-6 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-gray-400 text-sm font-medium">Skills & Technologies</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Technical Expertise
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative"
            >
              {/* Glass Card */}
              <div className="relative bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 h-full">
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
                
                {/* Category Title */}
                <div className="relative mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.title}
                  </h3>
                  <div className="w-12 h-0.5 bg-white/20 group-hover:w-20 transition-all duration-500" />
                </div>

                {/* Technologies */}
                <div className="space-y-3 relative">
                  {category.technologies.map((tech, techIdx) => (
                    <motion.div
                      key={techIdx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 + techIdx * 0.05 }}
                      className="flex items-center gap-3 group/item"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover/item:bg-white transition-colors" />
                      <span className="text-gray-300 font-medium text-sm group-hover/item:text-white group-hover/item:translate-x-1 transition-all">
                        {tech}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative corner */}
                <div className="absolute top-8 right-8 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="w-full h-full bg-white rounded-full blur-xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expertise Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden mb-8"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/10">
            <h3 className="text-2xl font-bold text-white mb-2">Core Competencies</h3>
            <p className="text-gray-400 text-sm">What drives every project I work on</p>
          </div>

          {/* Expertise Grid */}
          <div className="grid md:grid-cols-3 divide-x divide-white/10">
            {expertise.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 group hover:bg-white/[0.02] transition-all duration-300 relative"
              >
                {/* Number */}
                <div className="text-6xl font-bold mb-4 text-white/10 group-hover:text-white/20 transition-colors">
                  {item.number}
                </div>

                {/* Content */}
                <h4 className="text-white font-semibold text-lg mb-3 group-hover:translate-x-1 transition-transform">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Indicator */}
                <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-white transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden"
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Professional Journey</h3>
                <p className="text-gray-400 text-sm">Building experience through real-world projects</p>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-gray-400 text-xs font-medium">Currently Active</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Year Marker */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white/10" />
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-white mb-2">1+</div>
                    <div className="text-gray-400 text-sm">Year of dedicated development</div>
                  </div>
                </div>
              </motion.div>

              {/* Projects Counter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative border-l border-white/10 pl-8"
              >
                <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white/10" />
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-white mb-2">10+</div>
                    <div className="text-gray-400 text-sm">Projects completed successfully</div>
                  </div>
                </div>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative border-l border-white/10 pl-8"
              >
                <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white/10" />
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-white mb-2">15+</div>
                    <div className="text-gray-400 text-sm">Technologies mastered</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Progress Line Animation */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="mt-8 h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0 origin-left"
            />
          </div>
        </motion.div>
      </div>

      {/* Animated Particles */}
      {[...Array(20)].map((_, i) => {
        const positions = [
          { top: 15, left: 25 }, { top: 85, left: 75 }, { top: 45, left: 60 },
          { top: 70, left: 20 }, { top: 30, left: 80 }, { top: 55, left: 35 },
          { top: 10, left: 65 }, { top: 90, left: 45 }, { top: 25, left: 50 },
          { top: 65, left: 15 }, { top: 40, left: 90 }, { top: 80, left: 55 },
          { top: 20, left: 40 }, { top: 75, left: 70 }, { top: 50, left: 30 },
          { top: 35, left: 85 }, { top: 60, left: 10 }, { top: 5, left: 55 },
          { top: 95, left: 25 }, { top: 12, left: 95 }
        ];
        const pos = positions[i];
        
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        );
      })}
    </section>
  );
};

export default Skills;