# Actualizar el script para separar los datos de contacto (opción D)

Su script actual guarda nombre, correo y teléfono en la misma fila que las respuestas.
Estos pasos lo cambian para que vayan a **otro archivo, sin ninguna clave que los una**.

## 1. Cree la segunda hoja

Abra <https://sheets.new>. Llámela **Contactos MOB-BON-2026**. Déjela vacía.

Copie su **ID** de la barra de direcciones. En una URL así:

    https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/edit

el ID es `1AbCdEfGhIjKlMnOpQrStUvWxYz` — el trozo entre `/d/` y `/edit`.

## 2. Pegue el código nuevo

Vuelva al Apps Script (**Uitbreidingen ▸ Apps Script** desde la hoja de respuestas).
Borre todo y pegue el `apps-script.gs` nuevo.

En la línea del principio, pegue el ID entre las comillas:

    var ID_CONTACTOS = '1AbCdEfGhIjKlMnOpQrStUvWxYz';

Guarde (Cmd+S).

## 3. Cree una VERSIÓN NUEVA de la implementación

Este paso es el que más se olvida. **Implementeren ▸ Implementaties beheren** (no «Nieuwe
implementatie») ▸ icono del **lápiz** ▸ Versión: **Nieuwe versie** ▸ **Implementeren**.

La URL no cambia. Si en vez de esto crea una implementación nueva, obtendrá una URL distinta
y tendría que cambiarla en los dos HTML.

## 4. Compruebe

Abra su URL de `/exec` en el navegador. Debe responder:

    MOB-BON-2026 endpoint activo · contactos configurados

Si dice **SIN CONFIGURAR**, el ID no quedó bien pegado.

## 5. Prueba de extremo a extremo

1. Rellene la encuesta y responda **Sí** a «¿Desea dejar sus datos de contacto?».
2. En la **misma pantalla final** aparecen los tres campos: nombre, correo, teléfono.
   No hay que cambiar de página ni pulsar ningún enlace.
3. Rellénelos y pulse **Enviar mis datos**.
4. Compruebe las dos hojas:
   - *Respuestas*: fila nueva, **sin** nombre ni correo (ya no existen esas columnas).
   - *Contactos*: fila nueva con nombre, correo y teléfono.
5. Borre las filas de prueba de las dos.

Fíjese en que son **dos envíos distintos**: al pulsar «Enviar respuestas» se guarda la encuesta,
y al pulsar «Enviar mis datos» se guarda el contacto. Para quien responde es una sola pantalla
seguida; por dentro son dos peticiones a dos archivos distintos.

## Qué cambia exactamente

| Antes | Ahora |
|---|---|
| 54 columnas, con `F3_Nombre`, `F4_Email`, `F5_Telefono` | 51 columnas, **sin** datos de contacto |
| Todo en la misma fila | Dos archivos distintos |
| Marca de tiempo con hora en ambos | Contactos con **fecha sin hora** |
| Filas en orden de llegada | Contactos insertados en **posición aleatoria** |
| — | Para el encuestado, **una sola pantalla**: no hay pasos ni clics de más |

Las dos últimas líneas son las que cierran el asunto: sin hora y sin orden, no queda ningún
rastro técnico para emparejar una fila de contactos con una de respuestas. `F2_ConsentContacto`
(Sí/No) sí se queda en las respuestas, porque es un dato sustantivo y no identifica a nadie.

## Ventaja práctica
Ahora puede compartir la hoja de **Contactos** con quien lleve la comunicación del OLB
sin darle acceso a los datos de movilidad. Con una sola hoja, quien veía una lo veía todo.
