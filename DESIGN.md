# Dirección visual

Referente de método: David Haz (tipografía protagonista, movimiento con intención, pocos elementos ejecutados al máximo) y Emil Kowalski (animaciones cortas, interrumpibles, sólo transform/opacity/filter). No se copian textos, fuentes ni composición.

## Tipografía

Una familia: Mona Sans (variable, ejes `wght` y `wdth`), cargada con `next/font` en `<html>`. Display a peso 620, `font-stretch: 112%`, tracking −0.04 a −0.055em, line-height 0.86–0.98. Lectura a ancho normal, 15–17px, line-height 1.55–1.7. Geist Mono para metadatos: 11–12px, mayúsculas, tracking +0.08em. Sin serif ni cursivas de acento: el énfasis se marca con tono atenuado (42% del primer plano). Clases: `.display-xxl`, `.display-xl`, `.display-lg`, `.display-md`, `.eyebrow`.

## Movimiento

Easing principal `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`. Titulares entran palabra por palabra con blur (`BlurText`), una sola vez. Medios entran abriendo una ventana con `clip-path` (`RevealMedia`). Hover sólo en punteros finos. Todo se desactiva con `prefers-reduced-motion`.

Efecto de firma: `Displacement` de Canvas UI sobre la portada de cada caso (Chromium 157+ con HTML-in-canvas; en otros navegadores, portada estática). No añadir más efectos WebGL por página.

## Proyectos

Índice como lista tipográfica con vista previa que sigue al cursor. Casos: título display, ficha (rol, estado, año, stack), portada, introducción grande, reto/enfoque, grabación, capacidades, galería, decisiones, resultado, siguiente proyecto.

Grabaciones: se cargan cerca del viewport, se reproducen silenciadas en bucle mientras están visibles y se pausan al salir; controles propios (reproducir, barra, tiempo, pantalla completa). Con movimiento reducido no hay reproducción automática. Horizontales en marco de navegador; verticales en marco de teléfono.

## Superficies

Fondos de producto con color propio (`--work-bg`). Radios 20–28px en contenedores, 8–12px en medios internos. Controles de 44px mínimo, foco de 2px. En móvil, una columna con imágenes completas.
