import { type Project } from '@/types';
import abisImg from '@/public/img/proyectos/abis-upc-port.avif';
import stockflowImg from '@/public/img/proyectos/stockflow-port.png';
import siercpImg from '@/public/img/proyectos/SIERCP-PORT.png';
import hcImg from '@/public/img/proyectos/hc-efectos.png';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'ABIS-UPC',
    category: 'Enterprise Biometric Voting System',
    description:
      'Biometric electoral management platform developed for Universidad Popular del Cesar featuring fingerprint verification, OCR identity recognition, cryptographic vote anonymity and automated jury assignment based on business rules implemented in Oracle PL/SQL.',
    image: abisImg,
    size: 'featured',
    tech: [
      'Java 21',
      'Javalin',
      'Oracle XE',
      'PL/SQL',
      'Python',
      'FastAPI',
      'C#',
      'Node.js',
      'JWT',
      'AES-256',
    ],
  },
  {
    id: 2,
    title: 'StockFlow',
    category: 'Inventory Management System',
    description:
      'Desktop inventory and billing platform developed with JavaFX featuring AI-assisted business analysis, PDF report generation and demand prediction capabilities.',
    image: stockflowImg,
    size: 'large',
    tech: ['Java', 'JavaFX', 'Maven', 'DeepSeek API'],
  },
  {
    id: 3,
    title: 'SIERCP-IoT',
    category: 'CPR Training & Certification Platform',
    description:
      'Colombian clinical-educational platform for CPR training and certification. Built with feature-first architecture across 4 domains (auth, courses, sessions, devices, checkout) and 3 role-specific dashboards (admin, instructor, student). Integrates IoT mannequins for live sessions with AHA real-time metrics (compression depth mm, rate/min), local Colombian payments via Wompi (PSE), digital certificates, and a full audit system.',
    image: siercpImg,
    size: 'large',
    tech: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Firebase',
      'Zustand',
      'Zod',
      'Recharts',
      'Framer Motion',
      'Wompi',
    ],
  },
  {
    id: 4,
    title: 'HC Efectos',
    category: 'Corporate Website',
    description:
      'High-performance marketing website developed with Next.js featuring responsive design, animations and SEO optimization.',
    image: hcImg,
    size: 'medium',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
];
