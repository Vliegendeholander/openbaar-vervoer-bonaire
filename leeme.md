# Encuesta web — MOB-BON-2026 v1.3

Formulario de 4 idiomas (ES / NL / EN / PAP) con las 46 preguntas del máster,
todo el ruteo y todos los controles duros. Un solo archivo, sin dependencias.

## Puesta en marcha (unos 10 minutos)

### 1. Cree la hoja donde se guardarán los datos
1. Hoja de cálculo nueva en Google Sheets.
2. **Extensiones ▸ Apps Script**. Borre el contenido y pegue `apps-script.gs`.
3. **Implementar ▸ Nueva implementación ▸ Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
4. Copie la URL que termina en `/exec`.

### 2. Conecte el formulario
Abra `index.html` y sustituya la primera línea de código:

    const ENDPOINT = "";              →    const ENDPOINT = "https://script.google.com/…/exec";

Si la deja vacía, el formulario funciona igual pero, en vez de enviar, descarga
un archivo `.json` con las respuestas. Útil para probar sin tocar nada.

### 3. Publique el archivo
Cualquier alojamiento estático sirve. Las dos vías más rápidas:
- **Netlify Drop** (`app.netlify.com/drop`): arrastre la carpeta, obtiene un enlace al momento.
- **GitHub Pages**: suba `index.html` a un repositorio y active Pages.
- O el propio servidor del OLB, que es lo preferible.

### 4. Difunda con un enlace por canal
Añada `?canal=` al final del enlace. Se guarda en la columna `canal` y es lo que
permite estimar el sesgo del modo de recogida (nota N4 del máster):

    …/index.html?canal=CH1    QR en cartel o folleto
    …/index.html?canal=CH2    WhatsApp
    …/index.html?canal=CH3    redes sociales del OLB
    …/index.html?canal=CH4    correo o boletín
    …/index.html?canal=CH5    prensa o radio
    …/index.html?canal=CH6    levantamiento asistido con tablet
    (sin parámetro → CH99, origen desconocido)

## Descargar los datos
En la hoja: **Archivo ▸ Descargar ▸ Microsoft Excel (.xlsx)** o CSV.
Una fila por respuesta; la fila 1 son los nombres de variable del máster.
Las preguntas de selección múltiple van en una celda separadas por `;`
(por ejemplo `Pap;Ned` o `SRV05;SRV06`).

## Lo que hace el formulario
- Cambio de idioma en cualquier momento sin perder lo respondido.
- Guarda el progreso en el navegador: si cierran la pestaña, al volver siguen donde estaban.
- Ruteo completo: salto de B2–B10 y B12 si B1 = No; derivación de B5a desde B2_Motivo;
  lista filtrada de B5b; A5 solo si hay coches; D9 solo si hay menores; B14 solo si B13 = Sí;
  datos de contacto solo si F2 = Sí.
- Controles duros: A3 ≤ A2, B4 ≠ B3, rangos numéricos, máximo 4 opciones en E1 con
  regla de exclusividad, máximo 3 en B14.
- Cortes: consentimiento denegado, no residente, menor de 16 años.
- Los códigos guardados son los mismos del máster (BRR11, SEG1, GST2…), así que el
  fichero se cruza directamente con la especificación.

## Lo que NO incluye
- **Bloque C, el experimento de elección declarada.** Las 8 tarjetas no existen todavía:
  se generan con un diseño D-eficiente a partir de los priors del pretest. Cuando ese
  diseño exista, se añade.
## Datos de contacto: separados de las respuestas
Los tres campos (nombre, correo, teléfono) aparecen en la misma pantalla final, sin pasos de más,
pero se envían en una petición aparte a un SEGUNDO archivo de Google. En la hoja de contactos se
guarda solo la fecha (sin hora) y cada fila se inserta en una posición aleatoria, de modo que ni el
reloj ni el orden permiten emparejarlas con una respuesta. Es lo que exige el bloque F del máster.
Véase `ACTUALIZAR_SCRIPT.md`.

---

## A dónde van los datos (importante)

    teléfono de quien responde  →  POST  →  Apps Script  →  su hoja de Google  →  usted descarga Excel

La copia **no** se queda en el dispositivo de quien responde. Sale de ahí en cuanto pulsa enviar.

**Salvo si la línea ENDPOINT está vacía.** En ese caso el formulario descarga un `.json` en el
dispositivo, que es el modo de prueba. Para que no ocurra por descuido, el archivo muestra un
**aviso rojo en la cabecera** cuando ENDPOINT no está configurado. Si ve ese aviso, no publique.

### Si el teléfono no tiene cobertura
La respuesta se guarda en una cola dentro del navegador y se reintenta sola la próxima vez que
esa persona abra el enlace. Nada se pierde por una conexión mala.

### Cómo comprobar que funciona
1. Abra su enlace y rellene la encuesta una vez.
2. Mire la hoja: debe aparecer una fila nueva en unos segundos.
3. Añada `#estado` al final del enlace: le dirá si el destino está configurado y cuántas
   respuestas quedan en cola.

> Nota técnica: por cómo funciona Apps Script, el navegador envía la respuesta pero no puede leer
> la confirmación. Por eso existen la cola y la comprobación manual en la hoja. Haga siempre el
> envío de prueba del paso 1 antes de difundir el enlace.

## Otros destinos posibles
- **Servidor propio del OLB.** Si prefiere que los datos no pasen por Google, el mismo formulario
  puede enviar a un receptor propio (unas 20 líneas de PHP o Node que escriben un CSV). Pídalo.
- **LimeSurvey.** Es lo que especifica el máster y lo que corresponde para el campo real: el
  código fuente ya está en la carpeta del proyecto.
