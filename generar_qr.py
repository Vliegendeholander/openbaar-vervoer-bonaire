#!/usr/bin/env python3
"""
Genera los códigos QR de la encuesta, uno por canal de difusión.

Uso:
    python3 generar_qr.py https://SU-SITIO.netlify.app

Crea la carpeta qr/ con un PNG y un SVG por canal.
El SVG es vectorial: úselo para imprenta (carteles, vallas) porque no pixela.
El PNG sirve para pantalla, WhatsApp y documentos de Word.
"""
import sys, os, segno

CANALES = [
    ('CH1', 'QR en cartel o folleto'),
    ('CH2', 'WhatsApp'),
    ('CH3', 'Redes sociales del OLB'),
    ('CH4', 'Correo o boletin'),
    ('CH5', 'Prensa o radio'),
    ('CH6', 'Tablet, levantamiento asistido'),
]

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    base = sys.argv[1].rstrip('/')
    os.makedirs('qr', exist_ok=True)
    print('Base:', base, '\n')
    for code, nombre in CANALES:
        url = '%s/?canal=%s' % (base, code)
        # corrección de errores alta: el QR sigue leyéndose con un 30 % dañado o tapado
        q = segno.make(url, error='h')
        q.save('qr/%s.png' % code, scale=12, border=4, dark='#1F4E79')
        q.save('qr/%s.svg' % code, scale=12, border=4, dark='#1F4E79')
        print('  %-4s  %-32s  %s' % (code, nombre, url))
    print('\nListo. %d codigos en la carpeta qr/' % len(CANALES))

if __name__ == '__main__':
    main()
