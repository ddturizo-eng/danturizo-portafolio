export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  headline: string;
  introduction: string;
  status: string;
  scope: string;
  role?: string;
  year?: string;
  technologies: string[];
  problem: string;
  solution: string;
  capabilities: { title: string; description: string }[];
  decisions: { title: string; description: string }[];
  takeaway: string;
  links: { label: string; href: string }[];
  theme: string;
  layout: "lead" | "wide" | "compact" | "terminal";
};

export const projects: Project[] = [
  {
    id: "averyn",
    slug: "averyn",
    title: "Averyn",
    category: "Identidad digital · Plataforma institucional",
    summary: "Una identidad. Muchos procesos. Una plataforma para conectarlos.",
    headline: "La identidad como punto de partida.",
    introduction:
      "De la experiencia electoral de ABIS-UPC a una plataforma institucional modular. Averyn reúne el trabajo de identidad, verificación documental y biometría, con el control de acceso como foco actual.",
    status: "En desarrollo",
    role: "Project Lead · Full Stack",
    year: "2026",
    scope:
      "La landing es una presentación del producto. Los repositorios de frontend, Core y servicios biométricos están en desarrollo; las ilustraciones de la landing explican la propuesta y no prueban todos los módulos en producción.",
    technologies: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "FastAPI"],
    problem:
      "La identidad, los documentos y los procesos institucionales suelen vivir en sistemas separados. Cada integración vuelve a resolver quién es una persona y qué puede hacer.",
    solution:
      "Organizar la plataforma alrededor de una identidad compartida y servicios especializados, para que cada proceso institucional pueda apoyarse en la misma base.",
    capabilities: [
      {
        title: "Identidad y acceso",
        description:
          "Frontend institucional y flujos de acceso como área activa de desarrollo.",
      },
      {
        title: "Servicios especializados",
        description:
          "Repositorios separados para Core, rostro, huella y procesamiento documental.",
      },
      {
        title: "Una historia de producto",
        description:
          "Landing pública que explica capacidades, alcance y relación entre procesos.",
      },
    ],
    decisions: [
      {
        title: "Separar el sitio de la aplicación",
        description:
          "La landing no maneja sesiones ni datos de negocio. El frontend institucional y el Core tienen sus propios límites.",
      },
      {
        title: "Biometría como servicio",
        description:
          "El reconocimiento facial, la huella y el OCR se mantienen separados del frontend y de la presentación comercial.",
      },
    ],
    takeaway:
      "Arquitectura modular, integración de servicios y una visión de producto que evoluciona desde un problema institucional concreto.",
    links: [],
    theme: "averyn",
    layout: "lead",
  },
  {
    id: "sicap",
    slug: "sicap",
    title: "SICAP",
    category: "Plataforma SaaS · Salud · IoT",
    summary:
      "Entrenamiento en RCP con un maniquí conectado y datos en tiempo real.",
    headline: "Cada compresión se convierte en información.",
    introduction:
      "SICAP es una plataforma de capacitación en primeros auxilios y emergencias, en producción. Une un maniquí instrumentado con una aplicación web multi-institución: el estudiante practica, la sesión se registra y el instructor revisa calidad, profundidad y frecuencia.",
    status: "En producción",
    role: "Full Stack Developer",
    scope:
      "Plataforma en uso con instituciones, estudiantes e instructores, presentada al público en una feria. Las capturas muestran el panel de superadministración, el progreso del estudiante y el historial de sesiones; los nombres de usuarios están difuminados. No se afirma validación clínica de los sensores.",
    technologies: ["Next.js", "TypeScript", "Firebase", "ESP32", "BLE"],
    problem:
      "En una práctica de RCP es difícil saber si las compresiones tienen la profundidad y el ritmo correctos. Sin datos, el instructor corrige a ojo y el estudiante no ve su evolución.",
    solution:
      "Medir la práctica en el maniquí, enviarla por Bluetooth a la plataforma y convertir cada sesión en un registro con calidad, profundidad y frecuencia, visible para el estudiante y para su institución.",
    capabilities: [
      {
        title: "Telemetría en tiempo real",
        description:
          "El maniquí con ESP32 envía la sesión por BLE y la tableta muestra compresiones, profundidad y frecuencia mientras se practica.",
      },
      {
        title: "Multi-institución",
        description:
          "Panel de superadministración con instituciones, licencias, instructores, cursos y sesiones clínicas agregadas.",
      },
      {
        title: "Progreso y reportes",
        description:
          "Niveles, puntaje por sesión, escenarios clínicos e historial exportable a PDF y CSV para cada estudiante.",
      },
    ],
    decisions: [
      {
        title: "Del sensor a la sesión",
        description:
          "El hardware sólo mide y transmite; la plataforma guarda, puntúa y presenta. Así se puede mejorar el dispositivo sin rehacer la aplicación.",
      },
      {
        title: "Una plataforma, muchas instituciones",
        description:
          "Cada institución opera como inquilino con sus propios usuarios y cursos, mientras la superadministración ve métricas globales.",
      },
    ],
    takeaway:
      "Un producto completo en producción: hardware, aplicación web, datos en tiempo real y operación multi-institución.",
    links: [],
    theme: "sicap",
    layout: "wide",
  },
  {
    id: "abis-upc",
    slug: "abis-upc",
    title: "ABIS-UPC",
    category: "Ingeniería de software · Biometría",
    summary:
      "Del registro biométrico a la gestión de una elección institucional.",
    headline: "Verificar la identidad. Preservar el voto.",
    introduction:
      "Sistema académico de votación electrónica biométrica para procesos institucionales. Integra registro de votantes, verificación de identidad y operación electoral en una misma experiencia.",
    status: "Proyecto académico",
    role: "Project Lead · Full Stack",
    year: "2026",
    scope:
      "Las capturas muestran gestión electoral y enrolamiento de huella. El contexto funcional y las tecnologías proceden de la información del autor. No se atribuyen certificaciones ni garantías de seguridad no auditadas.",
    technologies: ["Java", "Javalin", "Oracle Database", "FastAPI", "Python"],
    problem:
      "Un proceso electoral debe identificar a sus participantes, gestionar sus etapas y mantener una separación entre la identidad del votante y su voto.",
    solution:
      "Integrar los flujos de registro y validación biométrica con un panel de gestión de procesos, manteniendo el anonimato del voto como requisito de diseño.",
    capabilities: [
      {
        title: "Operación electoral",
        description:
          "Vista de procesos, filtros, estados y datos de participación en una interfaz centralizada.",
      },
      {
        title: "Enrolamiento de huella",
        description:
          "Flujo guiado de captura con pasos y estado del registro biométrico.",
      },
      {
        title: "Identidad multimodal",
        description:
          "El alcance descrito por el autor incluye reconocimiento facial, huella y OCR documental.",
      },
    ],
    decisions: [
      {
        title: "Integrar hardware y software",
        description:
          "Los dispositivos biométricos añaden estados de captura y fallos que la interfaz debe comunicar de forma clara.",
      },
      {
        title: "Separar identidad y voto",
        description:
          "La base de datos y los servicios deben sostener la distinción entre verificar al votante y registrar su elección.",
      },
    ],
    takeaway:
      "Integración hardware/software, modelado de procesos y atención a la privacidad en una aplicación institucional.",
    links: [],
    theme: "abis",
    layout: "compact",
  },
  {
    id: "roster",
    slug: "roster",
    title: "Roster",
    category: "Developer tools · CLI",
    summary: "De una especificación al trabajo de un agente, con trazabilidad.",
    headline: "Orquestar también es diseñar límites.",
    introduction:
      "Una herramienta local de línea de comandos para organizar trabajo de agentes a partir de especificaciones. Su código separa política, ejecución, almacenamiento y adaptadores de infraestructura.",
    status: "En desarrollo",
    year: "2026",
    scope:
      "El código revisado ejecuta una unidad de trabajo con runNext. La concurrencia multiagente no está demostrada y no se presenta como función implementada. Se excluye una imagen conceptual de siete agentes paralelos.",
    technologies: ["TypeScript", "Node.js", "Claude Code"],
    problem:
      "Delegar una tarea a un agente exige controlar sus herramientas, los cambios de código y qué ocurre cuando la ejecución se interrumpe.",
    solution:
      "Una orquestación determinista con políticas, adaptadores de runtime, registro de ejecución y recuperación del trabajo interrumpido.",
    capabilities: [
      {
        title: "Trabajo desde especificaciones",
        description:
          "Especificaciones, planes y ADRs forman parte de la organización del repositorio.",
      },
      {
        title: "Una unidad de ejecución",
        description:
          "La CLI sincroniza el registro, aplica políticas y delega la siguiente tarea al orquestador.",
      },
      {
        title: "Recuperación y trazas",
        description:
          "El código contempla logs por ejecución y recuperación de procesos interrumpidos.",
      },
    ],
    decisions: [
      {
        title: "Puertos y adaptadores",
        description:
          "Runtime, sandbox, VCS y almacenamiento tienen contratos independientes del núcleo de orquestación.",
      },
      {
        title: "Políticas antes de ejecutar",
        description:
          "La ejecución resuelve restricciones y credenciales a través de interfaces dedicadas, en lugar de dispersarlas por la CLI.",
      },
    ],
    takeaway:
      "Herramientas para desarrolladores, arquitectura de ejecución y control explícito del trabajo delegado.",
    links: [],
    theme: "roster",
    layout: "terminal",
  },
  {
    id: "norelo",
    slug: "norelo",
    title: "Nerelo",
    category: "Producto digital · Automatización",
    summary: "Un negocio atendido, con la persona siempre al mando.",
    headline: "La automatización necesita criterio humano.",
    introduction:
      "Prototipo de producto que explora cómo un asistente puede ayudar a un negocio con conversaciones, tareas y decisiones. La landing conecta la idea de atención desde WhatsApp con un workspace de operaciones.",
    status: "Prototipo funcional",
    scope:
      "Norelo es el nombre de la carpeta; el producto se presenta como Nerelo. Las tareas y cifras son simuladas. No hay integración operativa con WhatsApp, pagos, autenticación ni motor LLM.",
    technologies: ["Next.js", "React", "TypeScript"],
    problem:
      "Las conversaciones de un negocio pueden contener citas, pedidos y decisiones que se pierden cuando toda la operación depende de recordarlas.",
    solution:
      "Explorar una interfaz que convierta intención en tareas visibles, conserve la traza de lo que ocurre y pida criterio humano antes de acciones con consecuencias.",
    capabilities: [
      {
        title: "Una propuesta comprensible",
        description:
          "Landing con sectores, inicio en tres pasos y niveles de autonomía propuestos.",
      },
      {
        title: "Workspace de demostración",
        description:
          "Tareas, agentes y actividad contextual en un escenario con datos simulados.",
      },
      {
        title: "Decisiones visibles",
        description:
          "El prototipo incluye recorridos de aprobación y rechazo, con estado guardado localmente.",
      },
    ],
    decisions: [
      {
        title: "Hacer visible la autonomía",
        description:
          "La interfaz explica qué observa, prepara o ejecutaría un asistente. Los niveles describen una visión de producto, no permisos backend activos.",
      },
      {
        title: "Probar antes de integrar",
        description:
          "Los escenarios fijos permiten explorar interacción y trazabilidad sin conectar servicios reales ni ejecutar operaciones comerciales.",
      },
    ],
    takeaway:
      "Pensamiento de producto, diseño de estados complejos y comunicación de límites en experiencias con agentes.",
    links: [],
    theme: "norelo",
    layout: "wide",
  },
  {
    id: "glow-makeup",
    slug: "glow-makeup",
    title: "Gloww Makeup",
    category: "Diseño y desarrollo web · Belleza",
    summary: "Una experiencia de marca donde la imagen lleva la conversación.",
    headline: "Dar espacio a lo que se ve y se siente.",
    introduction:
      "Una vista conceptual de marca para explorar color, textura y productos de belleza. El proyecto convierte una dirección visual cálida en una experiencia web editorial y adaptable.",
    status: "Concepto interactivo",
    scope:
      "Demo local, sin compras, reservas ni integraciones operativas. Las imágenes de cosméticos y retratos de la propuesta son generadas; no representan una sesión fotográfica de cliente.",
    technologies: ["Next.js", "React", "TypeScript"],
    problem:
      "Una marca visual necesita presentar su universo con claridad sin convertir cada imagen en una tarjeta comercial idéntica.",
    solution:
      "Construir una secuencia editorial de retrato, detalles de producto y galería que mantenga la misma intención en escritorio y móvil.",
    capabilities: [
      {
        title: "Una apertura visual",
        description:
          "Retrato y marca en un hero que prioriza fotografía, espacio y legibilidad.",
      },
      {
        title: "Galería por detalles",
        description:
          "Exploración de tonos y texturas mediante una galería visual y sus vistas de detalle.",
      },
      {
        title: "Diseño adaptable",
        description:
          "La composición cambia de escala y organización para conservar el contenido en móvil.",
      },
    ],
    decisions: [
      {
        title: "Contenido separado de presentación",
        description:
          "Los datos de marca están centralizados y las páginas reutilizan componentes de navegación y galería.",
      },
      {
        title: "Un concepto honesto",
        description:
          "La experiencia demuestra dirección visual y frontend; su alcance no incluye un sistema de comercio electrónico.",
      },
    ],
    takeaway:
      "Traducción de una dirección de marca a componentes, composición responsive y una narrativa visual consistente.",
    links: [],
    theme: "glow",
    layout: "compact",
  },
  {
    id: "hc-efectos",
    slug: "hc-efectos",
    title: "HC Efectos",
    category: "Sitio comercial · Eventos",
    summary: "De ver un efecto a imaginarlo en tu próximo evento.",
    headline: "Una experiencia que empieza antes del evento.",
    introduction:
      "Sitio comercial para una empresa de pirotecnia y efectos especiales en Valledupar. La propuesta organiza el catálogo visual y abre un recorrido claro hacia la consulta de un evento.",
    status: "Sitio desarrollado",
    role: "Desarrollo freelance",
    scope:
      "El código y las capturas verifican el sitio, la galería y el formulario de cotización. No se atribuyen conversiones ni resultados comerciales; el envío del formulario no se prueba en esta revisión.",
    technologies: ["Next.js", "React", "TypeScript", "GSAP"],
    problem:
      "Un servicio visual necesita ayudar al visitante a entender qué puede contratar y cómo iniciar una conversación para su evento.",
    solution:
      "Presentar efectos y eventos mediante galerías por categoría, con una acción de cotización que recoge el contexto de la consulta.",
    capabilities: [
      {
        title: "Catálogo visual",
        description:
          "Galería por tipos de evento y contenido audiovisual con previsualizaciones.",
      },
      {
        title: "Consulta contextual",
        description:
          "Formulario para indicar tipo de evento, fecha y efectos de interés.",
      },
      {
        title: "Identidad del negocio",
        description:
          "Presentación de servicios y trabajo realizado, con accesos a canales de contacto.",
      },
    ],
    decisions: [
      {
        title: "Un recorrido hacia la consulta",
        description:
          "Los servicios, la galería y el formulario comparten una intención: ayudar a describir un evento antes de contactar.",
      },
      {
        title: "Medios como prueba del servicio",
        description:
          "El sitio usa fotografía y video del trabajo visual, en lugar de depender de descripciones extensas.",
      },
    ],
    takeaway:
      "Capacidad para llevar requisitos de un negocio a un sitio comercial con estructura, identidad y navegación coherentes.",
    links: [],
    theme: "hc",
    layout: "lead",
  },
];

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
