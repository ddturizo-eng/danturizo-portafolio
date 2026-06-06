import { type SkillCategory, type Expertise } from '@/types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Software Engineering',
    technologies: [
      'Java',
      'FastAPI',
      'REST APIs',
      'JWT Authentication',
      'Javalin',
      'Microservices Fundamentals',
    ],
  },
  {
    title: 'Database Engineering',
    technologies: [
      'Oracle Database',
      'PL/SQL',
      'Stored Procedures',
      'Triggers',
      'Database Modeling',
      'SQL',
    ],
  },
  {
    title: 'Frontend Development',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'HTML',
      'CSS',
    ],
  },
  {
    title: 'Tools & Collaboration',
    technologies: [
      'Git',
      'GitHub',
      'Git Flow',
      'Docker',
      'Figma',
      'VS Code',
    ],
  },
];

export const EXPERTISE_LIST: Expertise[] = [
  {
    number: '01',
    title: 'Software Architecture',
    description:
      'Designing modular and scalable software solutions with clear separation of responsibilities and maintainable code structures.',
  },
  {
    number: '02',
    title: 'Database Design',
    description:
      'Building relational database systems using Oracle, PL/SQL and business-oriented data models.',
  },
  {
    number: '03',
    title: 'Full Stack Development',
    description:
      'Developing complete applications from backend services and databases to responsive user interfaces.',
  },
];
