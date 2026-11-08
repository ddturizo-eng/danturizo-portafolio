/**
 * Contenido del portafolio en un solo lugar.
 * Edita aquí textos, proyectos, experiencia y contacto; los componentes solo lo leen.
 */

export const profile = {
  name: "Daniel Turizo",
  fullName: "Daniel David Turizo Chacón",
  firstName: "Daniel",
  role: "Full Stack Developer",
  headline: ["Desarrollador", "Full Stack"],
  tagline:
    "Construyo software de punta a punta: interfaces web, APIs, bases de datos y la arquitectura que lo sostiene, de la idea a producción.",
  location: "Valledupar, Colombia",
  portrait: "/img/pruebap.jpg",
  portraitHover: "/img/pruebap.jpg",
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

export type ProjectLink = { label: string; href: string };

export type Project = {
  id: string;
  icon: "scan-face" | "fingerprint" | "heart-pulse" | "package" | "globe" | "bot" | "database";
  label: string;
  title: string;
  description: string;
  meta: string;
  tech: string[];
  image?: string;
  imageRatio?: number;
  links?: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: "averyn",
    icon: "scan-face",
    label: "Averyn",
    title: "Plataforma institucional de identidad digital, biometría, OCR e IA.",
    description:
      "Lidero la arquitectura modular por dominios (identidad, autenticación, biometría, OCR). El caché con Redis bajó tiempos de respuesta de ~1 s a menos de 300 ms.",
    meta: "Project Lead · 2026",
    tech: ["Next.js", "NestJS", "FastAPI", "PostgreSQL", "Redis", "Docker"],
  },
  {
    id: "abis-upc",
    icon: "fingerprint",
    label: "ABIS-UPC",
    title: "Sistema de votación electrónica con verificación biométrica.",
    description:
      "Lideré un equipo de 4 y construí ~70 % del sistema: huella con DigitalPersona, OCR de cédulas y Oracle PL/SQL que separa la identidad del voto. Presentado en ExpoSoftware UPC 2026.",
    meta: "Project Lead · 2026",
    tech: ["Java", "FastAPI", "C#/.NET", "Oracle", "Docker"],
    image: "/img/proyectos/abis-upc-port.avif",
    imageRatio: 1764 / 892,
    links: [{ label: "Repositorio", href: "https://github.com/ddturizo-eng/abis-upc" }],
  },
  {
    id: "sicap",
    icon: "heart-pulse",
    label: "SICAP",
    title: "Plataforma IoT para entrenamiento en RCP.",
    description:
      "Desarrollé más del 60 % de la web: dashboards, métricas de desempeño en tiempo real con Firestore y la propuesta de hardware con ESP32.",
    meta: "Full Stack Developer · 2025",
    tech: ["Next.js", "TypeScript", "Firebase", "ESP32"],
    image: "/img/proyectos/SIERCP-PORT.png",
    imageRatio: 1913 / 1042,
    links: [
      { label: "Demo", href: "https://siercp-web.vercel.app/" },
      { label: "Repositorio", href: "https://github.com/ddturizo-eng/SIERCP-WEB" },
    ],
  },
  {
    id: "stockflow",
    icon: "package",
    label: "StockFlow",
    title: "Gestión de inventario y ventas con análisis de demanda por IA.",
    description:
      "App de escritorio con facturación, proveedores, reportes y una integración experimental con DeepSeek para analizar la demanda.",
    meta: "Desktop App · 2026",
    tech: ["Java", "JavaFX", "DeepSeek"],
    image: "/img/proyectos/stockflow-port.png",
    imageRatio: 1919 / 1135,
    links: [{ label: "Repositorio", href: "https://github.com/ddturizo-eng/Stockflow" }],
  },
  {
    id: "roster",
    icon: "bot",
    label: "roster",
    title: "Orquestación asíncrona de agentes de IA para desarrollo.",
    description:
      "Un agente PM convierte specs en tickets de Linear y un agente HR contrata especialistas para cada uno. Spec-driven y respaldado por ADRs.",
    meta: "Proyecto personal · 2026",
    tech: ["TypeScript", "Claude Code", "Linear"],
    links: [{ label: "Repositorio", href: "https://github.com/ddturizo-eng/roster" }],
  },
  {
    id: "persiste",
    icon: "database",
    label: "PersisteApp",
    title: "Plataforma interactiva para aprender a conectar Java con bases de datos.",
    description:
      "JDBC, pool de conexiones, consultas parametrizadas, capas, SOLID y GRASP sobre Oracle y PostgreSQL. Hecha para estudiantes de Programación III.",
    meta: "Proyecto académico · 2026",
    tech: ["Next.js", "TypeScript", "Java"],
    links: [
      { label: "Demo", href: "https://persisteapp.vercel.app" },
      { label: "Repositorio", href: "https://github.com/ddturizo-eng/PersisteApp" },
    ],
  },
  {
    id: "hc-efectos",
    icon: "globe",
    label: "HC Efectos",
    title: "Sitio web en producción para un cliente freelance.",
    description: "Sitio responsivo entregado a cliente, de los requisitos al despliegue.",
    meta: "Freelance",
    tech: ["React", "TypeScript"],
    image: "/img/proyectos/hc-efectos.png",
    imageRatio: 1896 / 1045,
  },
  {
    id: "ayr-legal",
    icon: "globe",
    label: "Portal AYR Legal",
    title: "Portal web para una firma de abogados e ingenieros.",
    description: "Sitio responsivo en producción, de los requisitos al despliegue.",
    meta: "Freelance",
    tech: ["Next.js", "TypeScript"],
    image: "/img/proyectos/ayr.jpeg",
    imageRatio: 1600 / 911,
    links: [{ label: "Repositorio", href: "https://github.com/ddturizo-eng/portal-ayr-legal" }],
  },
];
