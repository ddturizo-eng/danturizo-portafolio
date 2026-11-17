# Plan de mejora v3 — de "correcto" a "memorable"

Fecha: 17 de noviembre de 2026. Rama de trabajo: `v2`.
Objetivo: que un negocio que evalúa contratar a Daniel salga del sitio con tres certezas: **sabe construir producto real, cuida el detalle y es fácil trabajar con él.**

Referente de filosofía: portafolio de David Haz (captura local del 10/11/2026). Se toma su *método*, no su apariencia: tipografía como protagonista, movimiento con intención, pocos elementos ejecutados al máximo. No se copian textos, fuente, imágenes, shaders ni composición.

---

## 1. Diagnóstico del estado actual

Revisado en build de producción local (1440×900) sobre `/`, `/projects` y `/projects/averyn`, más lectura de código y de `docs/VALIDACION-PROYECTOS.md`.

### Lo que ya está bien (no tocar)

- Base técnica sólida: App Router, prerender de los 7 casos, accesibilidad Axe sin infracciones, galería con teclado, videos bajo demanda, fallback R2 → local.
- Contenido honesto: no se inventan métricas ni clientes. Mantener esta regla.
- Navegación flotante, temas claro/oscuro con transición circular, esquinas del marco.

### Problemas encontrados

| # | Área | Hallazgo | Impacto |
|---|------|----------|---------|
| 1 | Tipografía | **Geist no se aplica.** `--font-geist-sans` se declara en `<body>` pero `--font-sans` se resuelve en `:root` (`app/globals.css:14`), donde la variable no existe. Resultado: `body`, `h1` y `p` usan `ui-sans-serif` (Segoe UI en Windows, SF en Mac). Sólo Fraunces carga. | Alto. El sitio se ve distinto en cada sistema y "genérico". |
| 2 | Tipografía | Escala sin contraste: H1 del hero 58px en un viewport de 1440px; nombres de proyecto 23px. La referencia trabaja titulares de 7rem (112px) con tracking −0.05em. | Alto. Nada "golpea" visualmente. |
| 3 | Tipografía | Combinación serif itálica + sans (Fraunces *italic* en "forma de producto", "una parte de la historia", "de la interfaz") es el patrón editorial más repetido de 2024-2026. Se percibe plantilla. | Medio. |
| 4 | Hero | Mensaje genérico ("Desarrollador Full Stack"), mucho vacío bajo el pliegue, retrato en escala de grises con efecto morph que se ve borroso. | Alto. Es la primera impresión del cliente. |
| 5 | Proyectos (inicio e índice) | Todas las tarjetas son la misma fórmula: captura de navegador dentro de un marco redondeado + pie de 3 líneas. Siete veces. El índice `/projects` repite casi idéntico el bloque del inicio. | Alto. Contradice la regla propia de "no siete tarjetas idénticas". |
| 6 | Casos de estudio | Estructura de documento: título, captura, después texto en dos columnas pequeñas ("Lo que toma forma", "Decisiones detrás…"). Mucho texto de 14–15px, poca jerarquía, galería de miniaturas al final. No hay una "escena" por caso. | Alto. Es lo que el cliente va a recorrer durante la presentación. |
| 7 | Movimiento | `DESIGN.md` limita el movimiento a "un acento de entrada en el hero". El sitio se siente estático; Motion, Lenis, OGL y matter-js están instalados pero aportan poco a la narrativa. | Medio-alto. |
| 8 | Rendimiento | Lighthouse móvil `/projects`: 84, LCP 3,7 s, TBT 250 ms. Chunk mayor 72 KB gz. Cuatro librerías pesadas de efectos (`ogl`, `matter-js`, `lenis`, `motion`). | Medio. |
| 9 | Conversión | No hay sección que diga *qué servicios ofrece Daniel a un negocio*, cómo trabaja ni tiempos. El contacto es el único cierre. | Alto para el objetivo comercial. |

---

## 2. Qué tomar de la filosofía de David Haz

| Principio observado | Cómo se traduce aquí |
|---|---|
| Una sola familia tipográfica, pesos altos, tracking negativo, tamaños enormes | Sistema tipográfico de una grotesca display + mono para metadatos. Fraunces queda fuera o como acento puntual. |
| Revelado palabra por palabra (`.word` con transform + filter + opacity) | Componente `<RevealText>`: cada palabra entra con blur 8px → 0, y 0.6em → 0, escalonado 30–40 ms. Sólo en titulares, una vez por sección. |
| Proyectos como lista tipográfica: filas con borde inferior, título grande, desplazamiento de 1em en hover | Índice de proyectos como lista editorial con vista previa que sigue al cursor (escritorio). |
| Skills como palabras gigantes donde un video "se abre" entre ellas | Sección de servicios: palabras de 6–7rem; al entrar en viewport se abre una ventana con un loop corto del producto real. |
| Grano + degradado vivo en hero y contacto | Reutilizar `shader-flow` (OGL) con grano sutil sólo en hero y contacto, cargado diferido. |
| Pocas secciones, cada una con un único gesto | Cada sección del inicio tiene un solo efecto protagonista. |

---

## 3. Plan por fases (orden por impacto en la presentación)

### Fase 0 — Decisiones y corrección crítica (½ día)

1. **Arreglar la carga de Geist** (problema #1): mover las clases `variable` de `next/font` de `<body>` a `<html>` en `app/layout.tsx`, o declarar `--font-sans` directamente sobre `body`. Verificar con `getComputedStyle(document.body).fontFamily`.
2. Elegir la familia display (ver §5, decisión A).
3. Actualizar `DESIGN.md` con el nuevo sistema; hoy prohíbe parte de lo que este plan propone (movimiento, autoplay).

### Fase 1 — Sistema visual (1–2 días)

- **Escala tipográfica fluida** con `clamp()`:
  - Display: `clamp(3.5rem, 9vw, 8rem)`, peso 600, tracking −0.045em, line-height 0.92.
  - H2: `clamp(2.25rem, 5vw, 4.5rem)`, tracking −0.035em.
  - Cuerpo grande (lead): 1.25–1.5rem; cuerpo: 1.0625rem, line-height 1.6.
  - Meta / etiquetas: mono 0.75rem, mayúsculas, tracking +0.08em, opacidad 0.55 (como `.projects-title` del referente).
- **Tokens de movimiento** en `lib/motion.tsx`: duraciones 180 / 400 / 700 / 1000 ms; easing principal `cubic-bezier(0.22, 1, 0.36, 1)`; easing de salida `cubic-bezier(0.64, 0, 0.78, 0)`.
- **Textura**: capa de grano SVG/PNG 128px al 3–4% de opacidad sobre fondos oscuros (CSS, sin JS).
- Radios: unificar 24px en contenedores grandes, 12px en medios internos.

### Fase 2 — Proyectos (prioridad máxima, 3–4 días)

**2a. Inicio — "Trabajo seleccionado"**
- Mostrar 3 proyectos, no 4, con composiciones distintas entre sí:
  1. Averyn: pieza ancha con video loop del producto (o secuencia de capturas en crossfade).
  2. Gloww + ABIS-UPC: par asimétrico 7/5 columnas.
  3. Roster: escena de terminal animada (escritura del comando y salida), en vez de una captura estática.
- Cada proyecto con número grande (`01`, `02`…), nombre a tamaño H2, una línea de valor y el rol.
- Revelado: la imagen entra con `clip-path: inset(12% 6% round 24px)` → `inset(0 round 24px)` al entrar en viewport; leve parallax interno (±6%) con scroll.

**2b. Índice `/projects` — lista editorial**
- Reemplazar la rejilla de tarjetas por una **lista tipográfica**: `Nº · Nombre (display 5–6rem) · Categoría · Año · Estado`, separadas por líneas de 1px.
- Hover (escritorio): el texto se desplaza 1em, el resto de filas baja a 35% de opacidad y una **vista previa flotante** (imagen o loop de 320×200) sigue al cursor con inercia (`motion` spring, stiffness 150, damping 20).
- Filtro por tipo (Producto · Herramienta · Web) con transición de layout.
- Móvil: lista con miniatura fija a la derecha; sin efecto de cursor.

**2c. Casos de estudio `/projects/[slug]` — de documento a narrativa**
Plantilla nueva, en este orden:
1. **Portada cinematográfica**: nombre a tamaño display, una frase de valor, y una barra de ficha (Rol · Año · Estado · Stack) en mono. Debajo, medio a sangre (100vw con márgenes de 16–24px) con color propio del producto.
2. **Transición compartida** desde el índice: la imagen de la fila se expande hasta la portada (View Transitions API; revisar soporte en `node_modules/next/dist/docs/` antes de implementar).
3. **Reto → Enfoque → Resultado** en tres bloques grandes con número; cada uno con 2–3 frases, no párrafos. Lo que hoy está en `problem`, `solution`, `takeaway`.
4. **Recorrido visual fijado** (sticky): a la izquierda, la captura cambia; a la derecha, el texto de cada capacidad avanza con el scroll. Sustituye "Lo que toma forma".
5. **Decisiones técnicas** como fichas de "decisión / por qué / alternativa descartada". Es lo que distingue a un ingeniero de un maquetador para quien contrata.
6. **Galería** en carrusel horizontal arrastrable, con lightbox actual reutilizado.
7. **Siguiente proyecto** a pantalla completa: nombre gigante y la imagen que aparece al acercarse; clic lleva al siguiente caso con la misma transición.

**2d. Material visual**
- Grabar 1 loop de 6–10 s por proyecto principal (Averyn, Gloww, ABIS, Roster): 1280px, WebM/AV1 + MP4 H.264, sin audio, ≤1,5 MB, con poster AVIF.
- Presentar capturas en mockups sobrios (navegador mínimo / teléfono) con sombra suave, no capturas planas sobre gris.

### Fase 3 — Hero e inicio (2 días)

- **Titular** que hable al cliente, no al puesto. Ejemplo de dirección (ajustar con Daniel): *"Construyo software que tu negocio puede usar mañana."* Revelado palabra por palabra.
- Subtítulo de una línea + dos CTA ("Ver proyectos", "Agendar una llamada").
- **Bloque de datos verificables** al lado (inspirado en las estadísticas del referente, pero sólo cifras reales): nº de proyectos, años construyendo, stack principal, disponibilidad actual. Nada inventado.
- Retrato: foto nítida a color o eliminarlo del hero; hoy el morph borroso en gris resta confianza.
- Fondo: shader de degradado con grano a baja intensidad, cargado tras el LCP.

**Nuevas secciones del inicio** (orden final):
1. Hero
2. Trabajo seleccionado (Fase 2a)
3. **Servicios** — palabras gigantes ("Productos web", "Plataformas internas", "APIs e integraciones", "Landing pages") con ventana de video que se abre entre palabras al entrar en viewport.
4. **Cómo trabajo** — 4 pasos (Descubrir · Diseñar · Construir · Acompañar) con tiempos típicos.
5. Contacto — degradado vivo, titular grande, correo copiable con un clic, botón de WhatsApp y enlace a calendario.

### Fase 4 — Capa de movimiento (1–2 días, en paralelo con 2 y 3)

- `<RevealText>` (palabras), `<RevealMedia>` (clip-path), `<Magnetic>` (botones CTA, desplazamiento máx. 8px).
- Transiciones de página: fundido + desplazamiento de 24px, 400 ms; transición compartida en proyectos.
- Lenis ya existe: sincronizarlo con los efectos de scroll para evitar saltos.
- Regla: **un gesto protagonista por sección**; nada se anima dos veces; todo se desactiva con `prefers-reduced-motion` (estado final inmediato).

### Fase 5 — Rendimiento y QA (1–2 días)

- Fuentes: una sola familia variable + mono, `subsets: ["latin"]`, sólo los ejes usados. Eliminar Fraunces si se decide (ahorra ~60–90 KB).
- Cargar `matter-js` (stack de Sobre mí) y `ogl` con `dynamic(..., { ssr: false })` sólo al entrar en viewport.
- Videos: `preload="none"` + `IntersectionObserver` para reproducir/pausar; nunca más de un video activo.
- Imágenes: AVIF primero, `sizes` correctos, `priority` sólo en el LCP de cada ruta.
- Objetivos (Lighthouse móvil, build de producción): Performance ≥ 92 en todas las rutas, LCP < 2,5 s, CLS 0, TBT < 150 ms.
- Reejecutar `npm run verify:projects` y `npm run measure:projects` y guardar en `reports/` con carpeta nueva.
- Revisión en iPhone/Android reales antes de la presentación.

---

## 4. Calendario sugerido

| Día | Trabajo |
|---|---|
| 1 | Fase 0 + tokens de Fase 1 |
| 2–5 | Fase 2 (proyectos) + componentes de movimiento de Fase 4 |
| 6–7 | Fase 3 (hero, servicios, proceso, contacto) |
| 8 | Fase 5 (rendimiento, QA, dispositivos) |
| 9 | Ensayo de la presentación recorriendo el sitio; ajustes finales |

Si el tiempo es corto: Fase 0 + Fase 2 + Fase 5 ya cambian la percepción del sitio de forma notable.

---

## 5. Decisiones que necesita Daniel

**A. Familia tipográfica display** (todas con licencia libre para uso comercial):
- *Mona Sans* (GitHub, OFL, variable con ancho): técnica, con carácter. **Recomendada.**
- *Geist* corregida, usada a 600 con tracking negativo: cero coste de cambio, menos personalidad.
- *General Sans* / *Satoshi* (Fontshare, licencia libre): la más cercana en espíritu a Matter.

**B. Videos en bucle silenciosos con reproducción automática** al entrar en viewport (desactivados con movimiento reducido). Hoy `DESIGN.md` los prohíbe. Sin ellos, los proyectos dependen de capturas estáticas.

**C. Retrato en el hero**: foto nueva a color, mantener el morph, o quitarlo.

**D. Idioma**: sólo español, o añadir inglés si el negocio o futuros clientes lo necesitan.

**E. Datos del hero**: confirmar cifras reales (años de experiencia, proyectos entregados, disponibilidad).

---

## 6. Criterio de "terminado"

- Ningún proyecto se presenta con la misma composición que el anterior.
- En los primeros 5 segundos el visitante sabe qué ofrece Daniel y a quién.
- Las fuentes son idénticas en Windows, macOS, Android e iOS.
- Lighthouse móvil ≥ 92 en `/`, `/projects` y un caso; Axe sin infracciones.
- Todo el movimiento respeta `prefers-reduced-motion`.
- Ninguna cifra, cliente o resultado es inventado.
