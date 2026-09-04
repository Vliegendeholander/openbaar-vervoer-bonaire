# Cómo conectar la encuesta a su hoja de datos

Tiempo: unos 8 minutos. Necesita una cuenta de Google.
Al terminar tendrá un enlace para compartir y una hoja donde caen todas las respuestas.

> **Si su Google está en neerlandés** (menús «Bestand, Bewerken, Bekijken…»), los nombres de los
> menús cambian. Están todos en la tabla del final: **Equivalencias ES / NL**. El más importante:
> donde digo «Extensiones» usted verá **Uitbreidingen**.

---

## Paso 1 · Cree la hoja donde se guardarán los datos

Abra <https://sheets.new>. Se crea una hoja vacía.
Póngale nombre, por ejemplo **Respuestas MOB-BON-2026**.

## Paso 2 · Abra el editor de scripts

En el menú de la hoja: **Extensiones ▸ Apps Script**
(en neerlandés: **Uitbreidingen ▸ Apps Script**).
Se abre una pestaña nueva con un archivo que contiene:

    function myFunction() {
    }

**Borre eso.** Seleccione todo (Ctrl+A o Cmd+A) y elimínelo.

## Paso 3 · Pegue el código

Abra `apps-script.gs` (está en esta misma carpeta), copie **todo** su contenido y péguelo
en el editor vacío.

Guarde con el icono del disquete, o Ctrl+S / Cmd+S.

## Paso 4 · Publique el script

Arriba a la derecha: botón azul **Implementar ▸ Nueva implementación**
(NL: **Implementeren ▸ Nieuwe implementatie**).

1. Pulse el icono del engranaje ⚙ junto a «Seleccionar tipo» (NL: «Type selecteren»).
2. Elija **Aplicación web** (NL: **Web-app**).
3. Rellene así:
   - Descripción / Beschrijving: `MOB-BON-2026`
   - Ejecutar como / Uitvoeren als: **Yo** / **Ik**
   - Quién tiene acceso / Wie heeft toegang: **Cualquier usuario** / **Iedereen**   ← imprescindible
4. Pulse **Implementar** / **Implementeren**.

## Paso 5 · Autorice (aquí es donde se atasca todo el mundo)

Google le mostrará una advertencia que **parece un error pero no lo es**. Es normal:
el script es suyo y Google no lo ha revisado.

1. **Autorizar acceso** / **Toegang autoriseren** → elija su cuenta.
2. Aparece «Google no ha verificado esta aplicación» / «Google heeft deze app niet geverifieerd».
3. Pulse **Configuración avanzada** / **Geavanceerd** (abajo a la izquierda, en letra pequeña).
4. Pulse **Ir a MOB-BON-2026 (no seguro)** / **Ga naar MOB-BON-2026 (onveilig)**.
5. Pulse **Permitir** / **Toestaan**.

No está haciendo nada inseguro: está autorizando su propio script a escribir en su propia hoja.

## Paso 6 · Copie la URL

Al terminar aparece **URL de la aplicación web** (NL: **Web-app-URL**). Es algo así:

    https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxxxxxxx/exec

Cópiela. **Tiene que terminar en `/exec`.**

## Paso 7 · Péguela en el formulario

Abra `index.html` con un editor de texto (TextEdit, Bloc de notas, VS Code…).
En la **línea 24** verá:

    const ENDPOINT = "";

Pegue su URL entre las comillas:

    const ENDPOINT = "https://script.google.com/macros/s/AKfycbx.../exec";

Guarde el archivo.

> Si prefiere, mándeme la URL y se la dejo puesta y probada.

## Paso 8 · Compruebe que funciona ANTES de difundir

1. Abra `index.html` en su navegador.
2. **No debe aparecer la franja roja.** Si aparece, la URL no quedó bien pegada.
3. Rellene la encuesta entera una vez, con datos de prueba.
4. Vuelva a la hoja de Google: debe haber una fila nueva en unos segundos.

Si la fila aparece, ya está. Borre esa fila de prueba antes de empezar de verdad.

## Paso 9 · Publique el archivo y comparta el enlace

Necesita que `index.html` esté en internet. La vía más rápida y gratuita:

- Entre en <https://app.netlify.com/drop>
- Arrastre la carpeta `03_Encuesta_web` a la ventana
- Le da un enlace público al momento, del tipo `https://algo-algo.netlify.app`

Otras opciones: GitHub Pages, o el propio servidor del OLB (preferible).

### Un enlace distinto por canal de difusión
Añada `?canal=` al final. Queda registrado en la hoja y es lo que permite estimar
el sesgo del modo de recogida:

    …netlify.app/?canal=CH1    QR en cartel o folleto
    …netlify.app/?canal=CH2    WhatsApp
    …netlify.app/?canal=CH3    redes sociales del OLB
    …netlify.app/?canal=CH4    correo o boletín
    …netlify.app/?canal=CH5    prensa o radio
    …netlify.app/?canal=CH6    tablet, levantamiento asistido

## Paso 10 · Descargue los datos cuando quiera

En la hoja: **Archivo ▸ Descargar ▸ Microsoft Excel (.xlsx)**
(NL: **Bestand ▸ Downloaden ▸ Microsoft Excel (.xlsx)**).
Una fila por respuesta. La fila 1 son los nombres de variable del máster.
Las preguntas de selección múltiple van separadas por punto y coma: `Pap;Ned`, `SRV01;SRV05`.

---

## Si algo falla

| Síntoma | Causa | Solución |
|---|---|---|
| Franja roja en la cabecera | ENDPOINT vacío o mal pegado | Repase el paso 7: comillas y `/exec` |
| No aparece ninguna fila | «Quién tiene acceso» no es «Cualquier usuario» | Implementar ▸ Gestionar implementaciones ▸ editar ▸ corregir |
| Sigue sin aparecer | Cambió el código y no reimplementó | Implementar ▸ **Gestionar** implementaciones ▸ editar ▸ Versión: **Nueva** ▸ Implementar |
| Quiero ver el estado | — | Añada `#estado` al final del enlace |

Al cambiar el código del script hay que crear una **versión nueva**; si no, Google sigue
sirviendo la anterior. Es el error más común después del de la autorización.


---

## Equivalencias ES / NL

Si su Google está en neerlandés:

| Español | Nederlands |
|---|---|
| Extensiones ▸ Apps Script | **Uitbreidingen ▸ Apps Script** |
| Implementar ▸ Nueva implementación | Implementeren ▸ Nieuwe implementatie |
| Seleccionar tipo ⚙ | Type selecteren ⚙ |
| Aplicación web | Web-app |
| Descripción | Beschrijving |
| Ejecutar como: Yo | Uitvoeren als: Ik |
| Quién tiene acceso: Cualquier usuario | Wie heeft toegang: **Iedereen** |
| Autorizar acceso | Toegang autoriseren |
| Google no ha verificado esta aplicación | Google heeft deze app niet geverifieerd |
| Configuración avanzada | Geavanceerd |
| Ir a … (no seguro) | Ga naar … (onveilig) |
| Permitir | Toestaan |
| URL de la aplicación web | Web-app-URL |
| Gestionar implementaciones | Implementaties beheren |
| Archivo ▸ Descargar ▸ Excel | Bestand ▸ Downloaden ▸ Microsoft Excel (.xlsx) |
| Hoja / pestaña | Blad |

### Nota sobre la pestaña «Blad1»
Déjela como está. El script crea automáticamente una pestaña nueva llamada **respuestas**
la primera vez que llegue un envío, y ahí es donde caen los datos. `Blad1` se queda vacía;
no pasa nada.
