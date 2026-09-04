# Códigos QR por canal de difusión

## Generarlos

Cuando tenga su enlace público (el de Netlify o el del OLB), ejecute:

```
cd 03_Encuesta_web
python3 generar_qr.py https://SU-SITIO.netlify.app
```

Crea la carpeta `qr/` con **6 códigos**, uno por canal, en dos formatos:

| Archivo | Para qué |
|---|---|
| `CH1.svg` … `CH6.svg` | **Imprenta**: carteles, folletos, vallas. Es vectorial, no pixela por grande que lo haga. |
| `CH1.png` … `CH6.png` | **Pantalla**: WhatsApp, redes, Word, PowerPoint. 588 × 588 px. |

Si no tiene `segno` instalado: `pip3 install segno`.

## Cuál es cuál

| Código | Canal | Dónde usarlo |
|---|---|---|
| CH1 | QR en cartel o folleto | Carteles en paradas, Sentro di Bario, supermercados, Mariadal |
| CH2 | WhatsApp | Difusión por mensajería |
| CH3 | Redes sociales del OLB | Facebook, Instagram |
| CH4 | Correo o boletín | Boletín del OLB, correo a empleados |
| CH5 | Prensa o radio | Nota de prensa, cuña de radio |
| CH6 | Tablet, levantamiento asistido | La tablet del encuestador en campo |

**Use uno distinto en cada sitio.** No es burocracia: la columna `canal` de su hoja es lo que
después permite comparar quién respondió por cada vía y corregir el sesgo del modo de recogida
(nota N4 del máster). Si reparte el mismo QR en todas partes, esa información se pierde y ya no
se recupera.

## Cómo imprimirlo bien

- **Tamaño mínimo: 3 × 3 cm** en un folleto que se lee de cerca. Para un cartel a 2 metros de
  distancia, mínimo **10 × 10 cm**. Regla práctica: el lado del QR ≈ la distancia de lectura ÷ 10.
- **Deje el margen blanco.** El borde blanco alrededor forma parte del código; si lo recorta, muchos
  teléfonos dejan de leerlo.
- **No lo estire.** Tiene que quedar cuadrado.
- **Contraste.** Los códigos salen en azul oscuro sobre blanco. Si los pone sobre un fondo de color,
  ponga debajo un recuadro blanco.
- Llevan **corrección de errores alta**: siguen leyéndose aunque se dañe o se tape hasta un 30 % de
  la superficie. Por eso aguantan bien la intemperie y se les puede poner un logo pequeño en el centro.

## Ponga siempre texto al lado

Un QR solo no basta: quien no sepa escanear queda fuera, y en Bonaire eso correlaciona con la edad
y con el nivel de ingresos, que es justo la población que menos quiere perder. Acompáñelo del enlace
escrito y de una frase en los cuatro idiomas:

> **Enkuesta di transporte públiko** · encuesta.bonaire.nl
> Papiamentu · Nederlands · English · Español · 10 minüt

## Compruébelos antes de imprimir

Escanee cada QR con su propio teléfono y confirme dos cosas: que abre la encuesta, y que en la barra
de direcciones aparece el `?canal=CHx` correcto. Un cartel mal impreso son semanas de datos sin
etiquetar.
