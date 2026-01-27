'use client';



import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Target, Code2, CheckCircle2, Smile } from 'lucide-react';

const Process = () => {
  const steps = [
    { 
      num: '1', 
      title: "Let's Get In Touch", 
      desc: 'Start by reaching out through our contact page. Fill out the form or book a call to discuss your project, goals, and ideas.', 
      icon: Mail 
    },
    { 
      num: '2', 
      title: 'Plan & Design', 
      desc: "I'll create designs that perfectly align with your vision and business objectives, ensuring every detail is considered.", 
      icon: Target 
    },
    { 
      num: '3', 
      title: 'Kickstart Development', 
      desc: 'I expertly transform your designs into a powerful, scalable solution, fully ready to launch with modern technologies.', 
      icon: Code2 
    },
    { 
      num: '4', 
      title: 'And Hand Over', 
      desc: 'Receive a fully tested, polished, quality product tailored to your needs with ongoing support and documentation.', 
      icon: CheckCircle2 
    },
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-sm font-medium text-cyan-400 uppercase tracking-wider">⦿ How it works</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Process <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">is Everything</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Simple, streamlined process is what gets you results
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative group cursor-pointer"
            >
              <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/20">
                {step.num}
              </div>
              <step.icon className="w-12 h-12 text-cyan-400 mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed relative z-10">{step.desc}</p>
              <div className="text-xs text-gray-600 mt-4 relative z-10">Step {step.num}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <div className="flex items-center gap-4">
            <Smile className="w-8 h-8 text-cyan-400" />
            <div>
              <p className="text-white text-lg font-semibold mb-1">I am with you in every step</p>
              <p className="text-gray-400">alongside you at each step for seamless experience</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;