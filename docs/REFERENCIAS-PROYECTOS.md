# Referencias observadas

Se aplicó website-forensics en modo ANALYZE a componentes concretos, con contextos anónimos nuevos, viewport 1440×900 y 390×844, sin copiar activos ni ejecutar HTML capturado como aplicación. Runtime existente en C:/testing-clon; doctor verificó Playwright y Chromium 158.0.8127.18. No se instaló otro navegador.

## Emil Kowalski — lista de proyectos

URL: https://emilkowal.ski/; selector: main. Discover identificó header y main; se eligió main para observar lista de proyectos y ritmo de lectura. Evidencia local: reports/references/emil-capture y emil-spec/specification.json.

**Observado:** columna de 644px en escritorio, texto de 16px y línea de 24px; enlaces acompañados por una descripción breve y separación generosa. Captura muestra el banner del curso sin ocultarlo. El scroll al target coloca el inicio de main parcialmente bajo ese banner: no se interpreta el recorte inicial como diseño del sitio. Mobile se captura por separado.

**Inferido y aplicado:** dar a cada proyecto un nombre inequívoco y una frase útil, sin que insignias y etiquetas compitan con el trabajo. Se conserva la tipografía propia del portafolio, no la fuente del referente.

## Linear — presentación de producto

URL: https://linear.app/; selector: h1. Discover identificó 26 regiones; se limitó la captura posterior al titular y contexto del primer viewport. Evidencia: reports/references/linear-capture y linear-spec/specification.json.

**Observado:** H1 de 64px, line-height 64px, peso computado 510 y tracking -1.408px en escritorio. Alineación izquierda, alto contraste y producto visible a continuación. Las peticiones POST de telemetría fueron bloqueadas por el helper y se conservan en run.json; no hubo login, desafío de acceso ni formularios enviados. No se retiraron overlays.

**Inferido y aplicado:** texto de apertura breve y producto real como prueba visual. No se copia la composición completa, paleta oscura, imágenes ni UI del producto.

## Alcance y límites

Ambas capturas y sus run.json fueron inspeccionados, y se generaron especificaciones con `spec`. No se afirma recuperar breakpoints exactos ni movimiento JavaScript desde dos viewports. Las fuentes declaradas no prueban por sí solas los glifos utilizados. No se analizaron sesiones privadas ni flujos de compra.

Este encargo es una integración original en un portafolio existente, no una reconstrucción de los referentes: por eso no se publica un porcentaje pixelmatch entre sitios distintos. La comparación útil es antes/después local (reports/references/before-desktop.png y reports/visual/round-01, round-02 y final), además de pruebas funcionales y accesibilidad.

Repetir sin sobrescribir evidencia:

```powershell
node C:\Users\user\.codex\skills\website-forensics\scripts\forensics.mjs doctor --project C:\testing-clon
node C:\Users\user\.codex\skills\website-forensics\scripts\forensics.mjs capture --config reports/references/emil.json --out reports/references/emil-new --project C:\testing-clon
node C:\Users\user\.codex\skills\website-forensics\scripts\forensics.mjs spec --run reports/references/emil-new --out reports/references/emil-spec-new
```
