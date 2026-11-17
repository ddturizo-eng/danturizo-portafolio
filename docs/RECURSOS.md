# Recursos para el portafolio

Lista de lo que falta para que el diseño no se vea genérico. Cada recurso dice **qué es, formato, tamaño y dónde va**.
Cuando tengas uno, ponlo en la ruta indicada con ese nombre exacto y avisa para conectarlo.

**Reglas generales**

- Formato: `.webp` (o `.avif`) para fotos y mockups, `.svg` para logos. Evita `.png` pesados.
- Peso: menos de **300 KB** por imagen; menos de **2 MB** por video.
- Nombres en minúsculas, sin espacios ni tildes: `averyn-cover.webp`, no `Averyn Portada.PNG`. Vercel distingue mayúsculas.
- Misma estética en todas: mismo fondo, misma luz, misma paleta (blanco/negro de la plantilla + 1 color de acento).

---

## 1. Hero (inicio)

| Recurso | Formato | Tamaño | Ruta |
|---|---|---|---|
| Retrato principal | webp | 1200 × 1200 (1:1) | `public/img/me/portrait.webp` |
| Retrato hover (otra pose: saludando, sonriendo, de lado) | webp | 1200 × 1200 (1:1) | `public/img/me/portrait-hover.webp` |

- Los dos con **el mismo encuadre, fondo y luz**; solo cambia la pose. La plantilla hace un morph entre ambos al pasar el mouse.
- Fondo liso (gris claro o blanco), de pecho hacia arriba, cara centrada en el tercio superior.
- La foto actual (`pruebap.jpg`) es vertical y formal; sirve de respaldo pero la versión cuadrada y más natural funciona mejor.

---

## 2. Proyectos

Nada de capturas de pantalla planas. Cada proyecto necesita una **portada compuesta**: la interfaz dentro de un mockup (laptop, navegador o teléfono) sobre un fondo de color o degradado propio del proyecto.

| Recurso por proyecto | Formato | Tamaño | Ruta |
|---|---|---|---|
| Portada (mockup compuesto) | webp | 1600 × 1200 (4:3) | `public/img/proyectos/<id>/cover.webp` |
| Video corto en loop (opcional, se reproduce al hover) | mp4 (H.264) + webm | 1280 × 960, 5–8 s, sin audio | `public/img/proyectos/<id>/preview.mp4` |
| Logo o ícono del proyecto | svg | cuadrado | `public/img/proyectos/<id>/logo.svg` |
| Capturas extra para un caso de estudio (opcional) | webp | 1600 px de ancho | `public/img/proyectos/<id>/01.webp`, `02.webp`… |

**Cómo hacer la portada**

1. Toma la captura a 1440 px de ancho, en la pantalla más vistosa (dashboard, flujo principal), con datos realistas, no "Lorem ipsum".
2. Métela en un mockup: [shots.so](https://shots.so), [mockuuups.studio](https://mockuuups.studio) o Figma con un frame de navegador.
3. Fondo con el color de marca del proyecto. Inclina o recorta el mockup para que no sea una captura centrada sin más.
4. Exporta en 1600 × 1200 y comprime con [squoosh.app](https://squoosh.app).

**Estado por proyecto** (`<id>` es el que está en `lib/content.ts`)

| Proyecto | id | Tengo | Falta |
|---|---|---|---|
| Averyn | `averyn` | nada | portada, logo. Si no se puede mostrar la UI: diagrama de arquitectura C4 estilizado como portada |
| ABIS-UPC | `abis-upc` | captura plana | portada en mockup, foto en ExpoSoftware (con el lector de huella), logo |
| SICAP | `sicap` | captura plana | portada en mockup (laptop + celular), foto del maniquí/ESP32, video del dashboard en tiempo real |
| StockFlow | `stockflow` | captura plana | portada en mockup de escritorio (ventana JavaFX), logo |
| roster | `roster` | nada | portada: captura de terminal/diagrama del flujo PM → HR → especialistas, o GIF del agente trabajando |
| PersisteApp | `persiste` | nada | portada en mockup, logo |
| HC Efectos | `hc-efectos` | captura plana | portada en mockup, URL pública |
| Portal AYR Legal | `ayr-legal` | captura plana | portada en mockup, URL pública |

Prioridad: **Averyn, ABIS-UPC y SICAP** primero; son los que se ven en el inicio.

---

## 3. Sobre mí (la sección con menos imágenes)

### Polaroids (franja de 6 fotos arriba)

| Recurso | Formato | Tamaño | Ruta |
|---|---|---|---|
| 6 fotos personales | webp | 900 × 1200 (3:4, vertical) | `public/img/about/polaroid-1.webp` … `polaroid-6.webp` |

Ideas que cuentan algo de ti (no 6 selfies):

1. Presentando en ExpoSoftware UPC (con el stand o el premio).
2. Con tu equipo de ABIS-UPC o SICAP.
3. Hardware: el lector DigitalPersona, el ESP32 o el maniquí de RCP.
4. Tu setup / escritorio de trabajo.
5. Dando mentoría o en la universidad.
6. Algo personal fuera del código (deporte, hobby, Valledupar).

Cada foto con un pie de una línea (lugar o momento) que me pases en texto.

### Logos de experiencia

Ahora cada fila muestra una letra sobre un color. Con logos reales se ve como la plantilla original.

| Entidad | Formato | Ruta |
|---|---|---|
| Averyn | svg (o png 256 × 256 fondo transparente) | `public/img/logos/averyn.svg` |
| ABIS-UPC | svg | `public/img/logos/abis-upc.svg` |
| SICAP | svg | `public/img/logos/sicap.svg` |
| Universidad Popular del Cesar | svg | `public/img/logos/upc.svg` |
| Freelance | svg (tu logo personal / monograma "DT") | `public/img/logos/dt.svg` |
| Oracle Academy (formación) | svg | `public/img/logos/oracle.svg` |

- Versión **monocromática o a color** que se lea sobre fondo blanco (el contenedor es blanco en ambos temas).
- Si un proyecto no tiene logo, se puede diseñar un monograma simple; avísame y lo hago en SVG.

### Opcional para darle más vida

- Fotos de certificados Oracle Academy (o el PDF) para un enlace "ver credencial".
- Una foto de grupo o del evento para una sección "Reconocimientos" (ExpoSoftware, dos semestres).

---

## 4. Marca personal

| Recurso | Formato | Tamaño | Ruta |
|---|---|---|---|
| Logo / monograma "DT" | svg | — | `public/img/logos/dt.svg` |
| Favicon | svg | cuadrado | `app/icon.svg` (reemplaza el de la plantilla) |
| Imagen para compartir (Open Graph: WhatsApp, LinkedIn) | png o jpg | 1200 × 630 | `public/og.png` |
| Color de acento | hex | — | dímelo en texto (ej. el azul `#378ADD` de tu GitHub) |

---

## 5. 3D y animaciones scroll (fase siguiente)

No hacen falta todavía, pero si quieres adelantar:

- **Spline**: una escena tuya (ej. huella o rostro en wireframe para el tema biometría, o un objeto abstracto). Pásame el link público de la escena.
- **Modelo 3D** propio: `.glb` comprimido (Draco), menos de 3 MB, en `public/models/`.
- Referencias visuales: 2–3 links de sitios (Awwwards, Webflow) cuyo scroll te guste, para copiar la sensación, no el diseño.

---

## Checklist rápido

- [ ] Retrato + retrato hover (1:1)
- [ ] Portadas en mockup: Averyn, ABIS-UPC, SICAP
- [ ] Portadas en mockup: StockFlow, roster, PersisteApp, HC Efectos, AYR Legal
- [ ] 6 polaroids (3:4) + pies de foto
- [ ] Logos: Averyn, ABIS-UPC, SICAP, UPC, Oracle, monograma DT
- [ ] Favicon + imagen OG 1200 × 630
- [ ] Color de acento
- [ ] URLs públicas de HC Efectos y AYR Legal
