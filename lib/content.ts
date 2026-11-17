/**
 * Contenido del portafolio en un solo lugar.
 * Edita aquí textos, proyectos, experiencia y contacto; los componentes solo lo leen.
 */

export const profile = {
  name: "Daniel Turizo",
  fullName: "Daniel David Turizo Chacón",
  firstName: "Daniel",
  role: "Full Stack Developer",
  headline: ["Tu negocio,", "más productivo."],
  tagline:
    "Diseño la experiencia que ven tus clientes y ordeno la operación que hay detrás: menos tareas manuales, procesos claros y software que tu equipo sí quiere usar.",
  location: "Valledupar, Colombia",
  portrait: "/img/hero-retrato.webp",
  portraitHover: "/img/hero-retrato.webp",
} as const;

export const contact = {
  email: "ddturizo@unicesar.edu.co",
  github: "https://github.com/ddturizo-eng",
  // Formato internacional sin "+" ni espacios para wa.me
  whatsapp: "https://wa.me/573006417405",
} as const;

export const about = {
  paragraphs: [
    "Soy desarrollador <b>Full Stack</b> y estudiante de Ingeniería de Sistemas (6.º semestre) en la Universidad Popular del Cesar. Me enfoco en <b>backend, bases de datos y arquitectura de software</b>.",
    "Diseño APIs REST y servicios modulares sobre PostgreSQL, Oracle, Redis y Firestore, integrando <b>biometría, OCR, IA e IoT</b>. Trabajo con Spec-Driven Development, modelo C4 y ADRs, y uso orquestación de agentes de IA dentro de flujos de ingeniería estructurados.",
    "He liderado equipos de desarrollo estudiantiles, gané <b>Mejor Proyecto de Aula en ExpoSoftware UPC</b> dos semestres seguidos y hoy apoyo como mentor a otros estudiantes de programación.",
  ],
} as const;

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  initial?: string;
  brand: string;
};

export const experience: ExperienceEntry[] = [
  {
    company: "Averyn",
    role: "Project Lead & Full Stack",
    period: "Jul 2026 – Actual",
    brand: "#1F6FEB",
  },
  {
    company: "ABIS-UPC",
    role: "Project Lead & Full Stack",
    period: "2026",
    brand: "#0D1117",
  },
  {
    company: "SICAP",
    role: "Full Stack Developer",
    period: "Dic 2025 – Actual",
    brand: "#E5484D",
  },
  {
    company: "Freelance",
    role: "Software Developer",
    period: "2022 – Actual",
    brand: "#0AA36B",
  },
  {
    company: "Universidad Popular del Cesar",
    role: "Mentor de pares",
    period: "Oct 2026 – Actual",
    initial: "U",
    brand: "#2F5D3A",
  },
];

export type EducationEntry = {
  school: string;
  degree: string;
  period: string;
};

export const education: EducationEntry[] = [
  {
    school: "Universidad Popular del Cesar",
    degree: "Ingeniería de Sistemas · 6.º semestre",
    period: "2023 – Actual",
  },
  {
    school: "Oracle Academy",
    degree: "Database Foundations · Database Programming with SQL",
    period: "2026",
  },
];

export const skills = [
  "Backend & APIs REST",
  "Arquitectura de software",
  "Diseño de bases de datos",
  "Microservicios",
  "Caching & rendimiento",
  "Biometría & OCR",
  "IoT",
  "Desarrollo con agentes de IA",
  "SDD · C4 · ADRs",
] as const;

export type StackChip = {
  label: string;
  slug: string;
  bg: string;
  fg: string;
  iconUrl?: string;
};

export const stack: StackChip[] = [
  { label: "TypeScript", slug: "typescript", bg: "#2F74C0", fg: "#ffffff" },
  { label: "Next.js", slug: "nextdotjs", bg: "#1f1f1f", fg: "#ffffff" },
  { label: "NestJS", slug: "nestjs", bg: "#E0234E", fg: "#ffffff" },
  { label: "Python", slug: "python", bg: "#3572A5", fg: "#ffffff" },
  { label: "FastAPI", slug: "fastapi", bg: "#009688", fg: "#ffffff" },
  { label: "Java", slug: "openjdk", bg: "#B07219", fg: "#ffffff" },
  { label: "PostgreSQL", slug: "postgresql", bg: "#336791", fg: "#ffffff" },
  { label: "Redis", slug: "redis", bg: "#D82C20", fg: "#ffffff" },
  { label: "Prisma", slug: "prisma", bg: "#2D3748", fg: "#ffffff" },
  { label: "Docker", slug: "docker", bg: "#2496ED", fg: "#ffffff" },
];

// Project editorial content and media are centralized in lib/projects.ts and lib/media.ts.
