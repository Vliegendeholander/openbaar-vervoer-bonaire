/**
 * Receptor de respuestas — Encuesta de Movilidad y Transporte Público, Bonaire 2026
 * Instrumento MOB-BON-2026 v1.3
 *
 * Escribe en DOS destinos separados, a propósito:
 *
 *   envío de la encuesta        → hoja «respuestas» de ESTE archivo  (movilidad, anónimo)
 *   envío de datos de contacto  → hoja «contactos» de OTRO archivo   (nombre, correo, teléfono)
 *
 * Los dos salen de la misma pantalla final de index.html, pero son dos peticiones
 * independientes y acaban en dos archivos distintos.
 *
 * No existe ninguna clave que permita unir una fila de contactos con una de respuestas:
 * los contactos se guardan con la FECHA sin hora y se insertan en una POSICIÓN ALEATORIA,
 * de modo que ni el reloj ni el orden de escritura sirven para emparejarlos.
 * Es lo que exige el bloque F del documento máster.
 *
 * INSTALACIÓN
 *  1. Cree una SEGUNDA hoja de cálculo, vacía, llamada «Contactos MOB-BON-2026».
 *  2. Copie su ID de la barra de direcciones. En
 *       https://docs.google.com/spreadsheets/d/AQUI_VA_EL_ID/edit
 *     el ID es el trozo entre /d/ y /edit.
 *  3. Péguelo abajo, en ID_CONTACTOS.
 *  4. Implementar ▸ Gestionar implementaciones ▸ editar (lápiz) ▸ Versión: Nueva ▸ Implementar.
 *     OJO: si no crea una versión NUEVA, Google sigue sirviendo el código viejo.
 */

var ID_CONTACTOS = '';          // <<< PEGUE AQUÍ EL ID DE LA SEGUNDA HOJA

var HOJA = 'respuestas';
var HOJA_C = 'contactos';

// Orden fijo de columnas de las respuestas. Ya NO incluye datos de contacto.
var COLS = [
  'enviado', 'idioma', 'canal', 'instrumento',
  'Consent', 'Residencia', 'Edad',
  'A1_Barrio', 'A2_Personas', 'A3_MenoresEscolarizados', 'A4_Autos', 'A5_AutoAlquiler',
  'A6_Motor', 'A7_Bicicleta', 'A8_Licencia', 'A9_Idiomas', 'A10_IdiomaMas',
  'B1_ViajaFuera', 'B2_Motivo', 'B3_Origen', 'B4_Destino', 'B5a_TipoDestino',
  'B5b_DestinoEspecifico', 'B5c_DestinoNombre', 'B5d_DestinoBarrio', 'B6_Frecuencia',
  'B7_HoraIda', 'B8_HoraVuelta', 'B9_Modo', 'B10_Duracion', 'B11_Gasto',
  'B12_SegundoDestino', 'B13_ViajeNoRealizado', 'B14_MotivoNoRealizado', 'B15_Domingo',
  'D1_Ingreso', 'D2_LlegarFinMes', 'D3_GastoImprevisto', 'D4_Empleo', 'D5_Educacion',
  'D6_Genero', 'D7_Discapacidad', 'D8_TiempoEnIsla', 'D9_Escuela',
  'E1_Servicios', 'E2_Participar', 'E3_Mantenimiento', 'E4_Comentario',
  'E5_Seguridad_0', 'E5_Seguridad_1',
  'F2_ConsentContacto'
];

var COLS_C = ['fecha', 'idioma', 'nombre', 'email', 'telefono'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var p = JSON.parse(e.postData.contents);
    if (p.tipo === 'contacto') { guardarContacto(p); }
    else                        { guardarRespuesta(p); }
    return json({ok: true});
  } catch (err) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var er = ss.getSheetByName('errores') || ss.insertSheet('errores');
    er.appendRow([new Date(), String(err), e && e.postData ? e.postData.contents : '']);
    return json({ok: false});
  } finally {
    lock.releaseLock();
  }
}

function guardarRespuesta(p) {
  var r = p.respuestas || {};
  var sh = hoja(SpreadsheetApp.getActiveSpreadsheet(), HOJA, COLS);
  sh.appendRow(COLS.map(function (c) {
    var v = (c === 'enviado') ? p.enviado
          : (c === 'idioma')  ? p.idioma
          : (c === 'canal')   ? p.canal
          : (c === 'instrumento') ? p.instrumento
          : r[c];
    if (v === undefined || v === null) return '';
    return Array.isArray(v) ? v.join(';') : v;   // selección múltiple → «a;b;c»
  }));
}

function guardarContacto(p) {
  if (!ID_CONTACTOS) throw new Error('ID_CONTACTOS sin configurar');
  var sh = hoja(SpreadsheetApp.openById(ID_CONTACTOS), HOJA_C, COLS_C);

  // Solo la FECHA, nunca la hora: la hora permitiría emparejar con una respuesta.
  var hoy = Utilities.formatDate(new Date(), 'America/Curacao', 'yyyy-MM-dd');
  var fila = [hoy, p.idioma || '', p.nombre || '', p.email || '', p.telefono || ''];

  // Inserción en posición ALEATORIA: el orden de llegada tampoco sirve para emparejar.
  var n = sh.getLastRow();
  if (n <= 1) {
    sh.appendRow(fila);
  } else {
    var pos = Math.floor(Math.random() * (n - 1)) + 2;   // nunca la fila 1 (cabeceras)
    sh.insertRowBefore(pos);
    sh.getRange(pos, 1, 1, fila.length).setValues([fila]);
  }
}

function hoja(ss, nombre, cols) {
  var sh = ss.getSheetByName(nombre) || ss.insertSheet(nombre);
  if (sh.getLastRow() === 0) {
    sh.appendRow(cols);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, cols.length).setFontWeight('bold');
  }
  return sh;
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
           .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput(
    'MOB-BON-2026 endpoint activo · contactos ' + (ID_CONTACTOS ? 'configurados' : 'SIN CONFIGURAR'));
}
