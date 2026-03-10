'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

const About = () => {
  const skills = [
    'Frontend Development',
    'Backend with Java',
    'Database Design',
    'UI/UX Design',
    'Web Applications',
    'API Integration'
  ];

  const timeline = [
    {
      role: 'Full Stack Developer',
      company: 'Freelance',
      period: '2025 - Present'
    },
    {
      role: 'Systems Engineering',
      company: 'Universidad Popular',
      period: '2024 - Present'
    },
    {
      role: 'Web Developer',
      company: 'Personal Projects',
      period: '2022 - Present'
    },
    {
      role: 'Java Developer',
      company: 'Academic Projects',
      period: '2025 - Present'
    }
  ];

  return (
    <section id="about" className="min-h-screen py-20 px-6 relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-gray-800/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-white rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sticky top-24">
              {/* Profile Image */}
              <div className="relative w-full aspect-[4/5] mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                <Image
                  src="/img/pruebap.jpg"
                  alt="Dan Turizo Profile"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 400px"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBgcTFCIx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AOn5XltGkttIu7aKGGRI5EkkQMwDqGBBI9HXR/2Wu7iy0a2lsru4tpmvrdS9vM0TFTLGCpKkHBBIx+DrzP2+7gt9F2lu7U5VDR2dvDclT4JWKdGI/evQfb7eWm742ptvcGm3Mdxb3FrbyxvGwIZXiQg/o0dYlK1L4q6V//2Q=="
                />
                {/* Available Badge */}
                <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-white text-sm font-medium">Available for projects</span>
                </div>
              </div>

              {/* Profile Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Hello, I am Dan Turizo
                  </h3>
                  <p className="text-gray-300 text-lg mb-2">
                    Full Stack Developer & Systems Engineer Student
                  </p>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={18} />
                    <span>Based in Valledupar, Colombia</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <motion.a
                    href="https://github.com/danturizo"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/danturizo"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                  >
                    <Linkedin size={20} />
                  </motion.a>
                  <motion.a
                    href="mailto:dan@turizo.com"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                  >
                    <Mail size={20} />
                  </motion.a>
                </div>

                {/* CTA Button */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full mt-6 bg-white text-black py-4 rounded-full font-medium text-center hover:bg-gray-100 transition-all"
                >
                  Let's Connect
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Info, Skills, Timeline */}
          <div className="space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Who I Am</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Soy estudiante de Ingeniería de Sistemas de 5to semestre en la Universidad Popular del Cesar, especializado en desarrollo full stack con Java, React, Next.js y bases de datos PLSQL. Combino lógica, diseño y rendimiento para crear soluciones digitales modernas y funcionales que impulsan negocios.
              </p>
            </motion.div>

            {/* Skills Pills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-full text-gray-300 font-medium hover:bg-white/10 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Experience & Education</h3>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-start justify-between gap-4 pb-6 border-b border-white/10 last:border-0 last:pb-0"
                  >
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg mb-1">
                        {item.role}
                      </h4>
                      <p className="text-gray-400">{item.company}</p>
                    </div>
                    <div className="text-gray-400 text-sm whitespace-nowrap">
                      {item.period}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;