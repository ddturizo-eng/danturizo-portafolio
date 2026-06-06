'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import profileImg from '@/public/img/pruebap.jpg';
import { ABOUT_SKILLS, TIMELINE } from '@/data';
import { SOCIAL } from '@/utils';

const socialIcons = [
  { href: SOCIAL.github, icon: Github, label: 'GitHub' },
  { href: SOCIAL.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:dan@turizo.com', icon: Mail, label: 'Email' },
] as const;

export function About() {
  return (
    <section
      id="about"
      className="min-h-screen py-20 px-6 relative overflow-hidden bg-black"
    >
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-gray-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
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
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sticky top-24">
              <div className="relative w-full aspect-[4/5] mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                <Image
                  src={profileImg}
                  alt="Dan Turizo Profile"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 400px"
                  loading="lazy"
                  placeholder="blur"
                />
                <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-white text-sm font-medium">
                    Available for internships, freelance projects and software development opportunities
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Hello, I&apos;m Daniel Turizo
                  </h3>
                  <p className="text-gray-300 text-lg mb-2">
                    Full Stack Developer & Systems Engineering Student
                  </p>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={18} />
                    <span>Based in Valledupar, Colombia</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  {socialIcons.map(({ href, icon: Icon, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                      aria-label={label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
                </div>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full mt-6 bg-white text-black py-4 rounded-full font-medium text-center hover:bg-gray-100 transition-all"
                >
                  Let&apos;s Connect
                </motion.a>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Who I Am</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                I am a Systems Engineering student at Universidad Popular del
                Cesar with practical experience in full stack development,
                software architecture and database engineering.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg mt-4">
                I have participated in real-world projects involving biometric
                systems, IoT solutions, business management platforms and
                Oracle-based applications, taking responsibilities in technical
                leadership, backend development, database design and frontend
                implementation.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg mt-4">
                My primary interests are software engineering, scalable
                architectures and building reliable systems that solve real
                operational problems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Areas of Expertise
              </h3>
              <div className="flex flex-wrap gap-3">
                {ABOUT_SKILLS.map((skill, index) => (
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

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Experience & Education
              </h3>
              <div className="space-y-6">
                {TIMELINE.map((item, index) => (
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
}
