# Crítica y mejoras de proyectos

Method: dual-agent (A: /root/design_critique · B: /root/technical_critique)

Objetivo: app/projects/page.tsx y app/projects/[slug]/page.tsx. Impeccable /critique se aplicó después de construir la primera base. A inspeccionó el diseño y la galería sin ver el detector; B ejecutó detector y navegador sin leer A. No se presentan las puntuaciones como métricas de rendimiento ni como un juicio final actualizado automáticamente.

## Evaluación de diseño (antes del pulido)

| Heurística                        | Puntuación | Observación                                                                |
| --------------------------------- | ---------: | -------------------------------------------------------------------------- |
| Visibilidad del estado            |          3 | Estados de proyecto y contador de galería claros.                          |
| Correspondencia con el mundo real |          3 | Español claro; responsabilidad personal no documentada en todos los casos. |
| Control y libertad                |          4 | Volver, siguiente, modal nativo, Escape y flechas.                         |
| Consistencia                      |          3 | Sistema coherente; CTA redundante de proyectos.                            |
| Prevención de errores             |          3 | Interacciones simples y controles nativos.                                 |
| Reconocimiento                    |          3 | Faltaba conectar algunas imágenes con la explicación.                      |
| Flexibilidad y eficiencia         |        n/a | Superficie Experience, sin flujo operativo repetitivo.                     |
| Estética y minimalismo            |          3 | Buena jerarquía, con repetición del titular.                               |
| Recuperación                      |          3 | Fallback implementado; su prueba fue posterior.                            |
| Ayuda/documentación               |        n/a | Superficie de exposición, sin tarea que necesite manual.                   |
| **Total**                         |  **25/32** | **Bueno; puntuación previa a las correcciones.**                           |

Especificidad: índice asimétrico y colores del propio producto; la presentación de Roster aporta carácter propio. El esqueleto común de los casos facilita explorar, pero no debe convertirse en texto idéntico con una imagen distinta.

## Hallazgos y resolución

- P2: titular repetido antes y después de la portada. Resuelto: la introducción ahora abre con «El proyecto», sin repetir la frase editorial.
- P2: responsabilidad personal incompleta. Se conservan roles documentados; no se inventan para llenar todas las fichas. Pendiente editorial opcional: confirmar contribución, colaboradores y fechas de Gloww, Nerelo y Roster.
- P2: galería desconectada del razonamiento. Se añadieron descripciones específicas y etiquetas de interfaz conceptual, landing o datos simulados, en lugar de una etiqueta genérica en todas las imágenes.
- Jerarquía H1 → H3 del índice. Resuelto: «Trabajo seleccionado» es H2.
- Contraste bajo en la ubicación del contacto. Confirmado por Axe y corregido de 45% a 65% de opacidad del primer plano. Auditoría posterior: sin infracciones en las superficies comprobadas.
- CTA «Ver proyectos» dentro del mismo índice. Eliminado de esa ruta, preservado en otras superficies.
- Navegación de 32px. Ajustada a controles de 44px y transición de la selección sin movimiento cuando se solicita reducción.

## Detector y señales que no son defectos

CLI `detect --json --changed`: una ejecución, exit 0, cero hallazgos; evidencia en reports/impeccable-detector.json. Sólo cubre archivos cambiados. La inspección de navegador con inyección temporal detectó cuatro señales: serif en cursiva, contraste bajo, marcos anidados del contacto y salto de encabezados. Cursiva y marcos no se interpretan como defectos por sí solos; contraste y encabezados sí se verificaron y corrigieron.

El overlay se inyectó correctamente en un navegador headless; no quedó un overlay visible para el usuario. Ambos servidores temporales del detector se detuvieron sin modificar el archivo de entrada. Ignore list ausente. No se compartió contexto entre evaluaciones.

## Personas y recorrido

- Cliente potencial: debe entender su problema y la responsabilidad de Daniel. Se conserva el alcance real y se evita inventar contribuciones no documentadas.
- Visitante móvil: se corrigió el overflow de la rejilla, se aumentaron controles y se redujo la repetición textual.
- Visitante con teclado: apertura por Enter, flechas, Escape y devolución de foco probadas; los videos no se descargan antes de solicitar reproducción.

## Iteración aplicada

| Ronda/modo       | Evidencia                         | Cambio                                                                                               |
| ---------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Base             | reports/visual/round-01           | Se detectaron variable tipográfica cíclica, overflow móvil, recorte de portadas y shader distractor. |
| /polish y /adapt | reports/visual/round-02           | Fraunces real, rejilla sin overflow, portadas completas y fondo limpio.                              |
| /critique        | Evaluaciones A/B independientes   | Compresión de narrativa, jerarquía, captions y contacto contextual.                                  |
| /harden          | reports/visual/final/results.json | Teclado, foco, 404, errores remotos, video bajo demanda y claro/oscuro.                              |
| /optimize        | reports/performance\*             | Precarga selectiva, sin prefetch de siete casos, shaders diferidos, contacto estático en índice.     |

Preguntas omitidas: el usuario ya autorizó implementar las mejoras y pidió continuar sin entregar una simple lista de sugerencias. No hubo decisiones nuevas que requirieran detener la implementación.
