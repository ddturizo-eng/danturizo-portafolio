# Validación de la experiencia de proyectos

Verificado el 17 de noviembre de 2026 en Windows, Node 24.21.0, Next.js 16.4.5 y Chromium 158.0.8127.18. Las comprobaciones usan la aplicación real y el runtime de navegador ya disponible en C:/testing-clon.

## Resultado

- Build de producción correcto: inicio, sobre mí, índice y los siete detalles prerenderizados. No se publicó un despliegue externo del sitio.
- Typecheck correcto. ESLint: cero errores; tres advertencias previas de `<img>` en education, stack y portrait-morph. No se eliminaron tests ni se desactivaron reglas.
- 24 combinaciones de rutas y viewport: índice y siete casos a 1440×1000, 768×1024 y 390×844. Sin overflow horizontal, errores JavaScript ni imágenes rotas; sin descarga ni montaje de videos antes de interacción.
- Axe sobre `#main-content`: cero infracciones WCAG A/AA en esas 24 combinaciones y en las muestras oscuras del índice, Averyn, Gloww y Roster. Esto no certifica todo el sitio.
- Galería: apertura con Enter, navegación con flechas, Escape y restauración del foco al disparador.
- Video: carga únicamente tras pulsar reproducir, controles nativos y duración verificada para Averyn. Copias silenciosas con texto descriptivo; no hay autoplay al llegar a la ruta.
- Error remoto de imagen simulado: recuperación a copia local confirmada. Ruta inexistente responde 404. Inicio y Sobre mí conservan HTTP 200.
- Adicional: viewport 320px sin overflow, navegación de 44px, hero sin animación bajo movimiento reducido; texto al 200% en tablet sin overflow.
- R2: 20 subidas correctas y HEAD público correcto para cada recurso; repetición con 20 objetos sin cambios. Credenciales ausentes en los 20 archivos revisados de `.next/static`; entorno y fuentes privadas ignorados por Git.
- `npm audit --omit=dev`: cero vulnerabilidades de producción al ejecutar la revisión. El conjunto completo del entorno informó siete vulnerabilidades moderadas de herramientas; no se aplicó una actualización masiva ajena al encargo.

## Lighthouse móvil, build de producción

Medición local con emulación móvil y throttling de Lighthouse. Dos rutas, una ejecución final por ruta; resultados de laboratorio, no datos de campo. Las rondas anteriores se conservan para no confundir optimización con una puntuación estable garantizada.

| Ruta             | Performance | Accessibility | Best Practices | SEO |   LCP |    TBT | CLS |
| ---------------- | ----------: | ------------: | -------------: | --: | ----: | -----: | --: |
| /projects        |          84 |           100 |            100 | 100 | 3,7 s | 250 ms |   0 |
| /projects/averyn |          92 |           100 |            100 | 100 | 3,3 s | 100 ms |   0 |

Evidencia final: reports/performance-optimized/{projects,averyn}.{json,html} y summary.json. El índice todavía tiene margen de optimización de JavaScript compartido y LCP. No se afirma haber alcanzado 100 de rendimiento ni haber medido todas las rutas con Lighthouse.

Las optimizaciones aplicadas incluyen videos bajo demanda, posters, WebP, next/image con sizes y prioridad selectiva, eliminación del shader en proyectos, carga diferida de WebGL en las superficies que lo conservan, contacto estático en el índice y desactivación del prefetch de siete casos simultáneos. La analítica Vercel sólo se monta en Vercel, evitando un 404 local sin alterar su uso en ese alojamiento.

## Reproducir

```powershell
npm run typecheck
npm run lint
npm run build
npm run start -- --port 3000
```

Desde otra terminal, con un directorio de salida nuevo:

```powershell
npm run verify:projects -- --runtime C:\testing-clon --out reports/visual/check-new
# Medir sin otras auditorías o builds ejecutándose en paralelo.
npm run measure:projects -- C:\testing-clon reports/performance-new
```

Los scripts reutilizan Playwright, @axe-core/playwright y Lighthouse del runtime indicado. En otra máquina se necesita un runtime que contenga esos paquetes y Chromium; no son dependencias de ejecución del sitio. La validación de 24 rutas y estados queda en `reports/visual/final-optimized/results.json`; la ronda previa válida también se conserva en `reports/visual/final/results.json`. Las capturas y las planchas privadas están fuera de Git.

## Revisión visual y crítica

Se inspeccionaron capturas reales de escritorio, tablet, móvil y tema oscuro. Rondas anteriores preservadas. Crítica independiente de Impeccable y cambios aplicados: docs/CRITICA-PROYECTOS.md. La primera valoración fue 25/32 y no se renombra como puntuación final tras editar. El detector de código no detectó patrones en su alcance; la revisión de navegador sí encontró jerarquía y contraste que fueron corregidos.

## Pendientes explícitos

- Un dominio personalizado para servir recursos en producción; r2.dev sigue siendo una URL de desarrollo limitada.
- Confirmación editorial opcional de roles, colaboradores y fechas que no aparecen documentados en algunos casos. Se omiten en lugar de inventarlos.
- Autorización o anonimización de los 14 originales retenidos, sólo si se desean añadir después. No se publicaron sus versiones retenidas.
- Validación con lector de pantalla y dispositivos físicos; no se simula haberla realizado.
- No se validaron operaciones reales de los productos mostrados: no se enviaron formularios, ejecutaron agentes, realizaron capturas biométricas ni probaron hardware desde el portafolio.

No faltan credenciales de R2. Los 30 originales se procesaron en inventario sin errores; el detalle de todos los archivos retenidos y sus motivos está en docs/RECURSOS-PROYECTOS.md y media/review-decisions.json.
