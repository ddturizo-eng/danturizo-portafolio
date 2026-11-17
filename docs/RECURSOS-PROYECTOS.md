# Recursos de los proyectos

Inventario ejecutado con Sharp y FFprobe: 30 originales, 87.810.199 bytes, 0 errores y 0 duplicados exactos SHA-256. Se revisaron 50 candidatos visuales (imágenes y cinco momentos por video). No se considera la similitud perceptual como duplicado exacto.

Se prepararon 20 derivados a partir de 16 originales: 18 WebP (incluidos 4 fotogramas elegidos) y 2 MP4 H.264 silenciosos, 4.564.180 bytes en total. Esto describe selección y compresión combinadas, no una comparación de calidad equivalente. Videos: recorrido de Averyn de 22 s a 1280×630 y hardware SICAP de 6,75 s a 464×832. Los originales se conservan intactos.

## Archivos y procedencia

- Originales: media/source/{abis-upc,averyn,glow-makeup,hc-efectos,Norelo,Roster,sicap}. Fuera de public y Git.
- Inventario completo con dimensiones, orientación inferible por ancho/alto, duración, codec, audio, peso y hash: reports/media/inventory.json.
- Candidatos y segundos exactos: reports/media/review-candidates.json; planchas privadas sheet-1.png a sheet-5.png.
- Selección editorial: media/selections.json. Revisión por cada original: media/review-decisions.json.
- Derivados, descripciones, medidas y claves: lib/generated/media.json; contrato TypeScript: lib/media.ts.
- Originales no procesables: ninguno. Hay 10 originales retenidos por privacidad o decisión editorial, listados abajo.

## Material retenido

| ID (ruta exacta en inventario y revisión) | Motivo                                                                                                         |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| abis-upc-image-03                         | Panel redundante respecto de gestión electoral; no aporta un flujo distinto a la selección.                    |
| abis-upc-image-04                         | Papeleta con nombres y fotografías identificables; requiere revisión y autorización.                           |
| averyn-video-02                           | Captura facial de una persona identificable; retener hasta anonimización o autorización específica.            |
| glow-makeup-image-02                      | Galería visualmente redundante; se eligen composición editorial y móvil.                                       |
| hc-efectos-image-04                       | Contenido redundante de eventos; se prioriza hero, consulta y galería.                                         |
| hc-efectos-image-05                       | Red social y contenido de eventos redundante; no necesario para el caso.                                       |
| norelo-image-03                           | Escenario comercial con cifras simuladas; se priorizan mecanismos y controles.                                 |
| norelo-image-05                           | Calculadora de ingresos ilustrativos; evitar confundir estimaciones con resultados reales.                     |
| roster-image-01                           | Visual conceptual de concurrencia; el código revisado ejecuta una unidad de trabajo y no prueba ese dashboard. |
| sicap-video-01                            | Pantallas de entrenamiento con identidad visible y menor calidad; se elige video de hardware.                  |

### Publicados después de la revisión (17/11/2026)

- sicap-image-02: recortado a encabezado e indicadores agregados.
- sicap-image-03 y sicap-image-04: nombre del usuario difuminado con `scripts/anonymize-sicap.mjs`.
- sicap-video-03 (feria): publicado a petición del autor; el consentimiento de las personas que aparecen queda a su cargo. Sin audio, 28 s.

## Evidencia funcional

| Proyecto                | Fuente inspeccionada                                                                                                                                               | Conclusión y límites                                                                                                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Averyn                  | C:/averyn/README.md; C:/averyn-platform/averyn-site/README.md; averyn-web-accesos/README.md y package.json; averyn-core-accesos/package.json; videos suministrados | Hay una versión anterior HTML/JS simulada y una plataforma posterior Next/Nest con servicios separados. La landing muestra propuesta; no demuestra todo en producción.                                    |
| ABIS-UPC                | Brief del autor y cuatro capturas originales                                                                                                                       | Gestión electoral y enrolamiento visibles. Java/Javalin/Oracle/FastAPI proceden del contexto del autor; no se ejecutó el backend ni se auditó seguridad.                                                  |
| Gloww                   | C:/testing-clon/README.md, package.json y capturas                                                                                                                 | Demo conceptual Next/React/TS. Imágenes generadas, sin compra ni reserva real. Confirmar derechos del logo y revisión comercial de la composición antes de publicar el sitio del producto.                |
| HC Efectos              | C:/landing-cliente/package.json, app/layout.tsx y componentes; capturas                                                                                            | Next/React/TS/GSAP, servicios de efectos, galería y formulario. No se envió ningún formulario ni se midieron conversiones.                                                                                |
| Nerelo (carpeta Norelo) | C:/norelo/README.md y src/app/page.tsx; capturas                                                                                                                   | Prototipo funcional y marketing de automatización. Negocio y cifras simulados; no hay WhatsApp o LLM operativo demostrado.                                                                                |
| Roster                  | C:/roster/README.md, package.json, src/core/orchestrator/run.ts y src/cli/commands/run.ts                                                                          | CLI TypeScript con puertos, políticas y runNext. Ejecución de una unidad, sin prueba de concurrencia. Captura de ayuda suministrada; no se afirma correspondencia exacta de versión con el código actual. |
| SICAP                   | C:/siercp-web/README.md y package.json; capturas y videos                                                                                                          | Next/TypeScript/Firebase y prototipo físico. ESP32 según contexto del autor. Sin validación clínica ni precisión sensorial probada.                                                                       |

Las capturas se usan como documentación del trabajo suministrado por el autor. No se copian recursos de las referencias externas al producto. La revisión visual no sustituye una auditoría automatizada exhaustiva de datos personales ni la acreditación de derechos de terceros.
