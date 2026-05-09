"""
Aplicación Flask para página romántica dedicada a mi pareja
Autor: Daniel Garrido
Descripción: Experiencia web interactiva, emocional y visualmente impactante
"""

from flask import Flask, render_template, jsonify
import os
import socket

# Inicializar la aplicación Flask
app = Flask(__name__, 
            template_folder='templates',
            static_folder='static')

# Configuración (FLASK_DEBUG=0 | 1 en producción)
app.config['DEBUG'] = os.environ.get('FLASK_DEBUG', '1').lower() in ('1', 'true', 'yes')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-cambia-en-produccion')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# Datos románticos - Puedes personalizarlos
romantic_data = {
    "parejas": {
        "el": "❤️ Daniel",
        "ella": "Anastasia ❤️"
    },
    "milestones": [
        {
            "titulo": "Nuestro primer mensaje",
            "fecha": "26 de Febrero 2026",
            "icono": "✉️",
            "descripcion": "Todo comenzó con un mensaje que cambió nuestras vidas para siempre"
        },
        {
            "titulo": "Nuestro primer beso",
            "fecha": "01 de Marzo 2026",
            "icono": "😘",
            "descripcion": "Nuestro primer beso, inolvidable"
        },
        {
            "titulo": "Nuestra primera salida al cine",
            "fecha": "Día Especial",
            "icono": "🎬",
            "descripcion": "El dia que fuimos al cine juntos por primera vez"
        },
        {
            "titulo": "Nuestra salida al M.U.T.",
            "fecha": "Día Especial",
            "icono": "🛍️",
            "descripcion": "El dia que fuimos a pasear al mall juntos"
        },
        {
            "titulo": "Nuestra primera excursión al cerro San Cristobal",
            "fecha": "01 de Mayo 2026",
            "icono": "🏞️",
            "descripcion": "Fuimos a pasear al cerro San Cristobal por primera vez y pasamos al Jardin Japones, un día inolvidable"
        },
        {
            "titulo": "Supermercado coreano por primera vez",
            "fecha": "02 de Mayo 2026",
            "icono": "🍜",
            "descripcion": "Cuando fuimos al Gangnam market a comer Ramen, Mochis y tomar jugitos"
        },
        {
            "titulo": "Nuestra primera salida al parque",
            "fecha": "02 de Mayo 2026",
            "icono": "🌳",
            "descripcion": "Fuimos a pasear al parque por primera vez y pasamos un día increíble juntos"
        },
        {
            "titulo": "Todos los recuerdos que vienen",
            "fecha": "Eternamente",
            "icono": "💫",
            "descripcion": "Cada día junto a ti es un nuevo recuerdo"
        }
    ],
    "mensaje_principal": "Eres la mejor parte de mis días ❤️",
    "mensajeFinal_parte1": "Y esto recién comienza...",
    "mensajeFinal_parte2": "Vamos por muchos más recuerdos lindos juntos ❤️",
    "mensajeFinal_parte3": "Y por un futuro próximo lleno de amor"
}

@app.route('/')
def index():
    """Ruta principal que renderiza la página romántica"""
    return render_template('index.html', data=romantic_data)

@app.route('/api/datos')
def obtener_datos():
    """Endpoint API para obtener datos románticos"""
    return jsonify(romantic_data)

@app.route('/api/milestones')
def obtener_milestones():
    """Endpoint API para obtener los hitos románticos"""
    return jsonify(romantic_data['milestones'])

@app.errorhandler(404)
def pagina_no_encontrada(error):
    """Manejo de errores 404"""
    return render_template('index.html', data=romantic_data), 404

@app.errorhandler(500)
def error_servidor(error):
    """Manejo de errores 500"""
    return render_template('index.html', data=romantic_data), 500

def _ip_en_lan():
    """IP para abrir desde otro dispositivo en la misma WiFi (no usar localhost en el móvil)."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(0.5)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except OSError:
        return None


if __name__ == '__main__':
    # host=0.0.0.0: escucha en la red local; el móvil entra por http://TU_IP_PC:puerto
    puerto = int(os.environ.get("PORT", "5000"))
    host = os.environ.get("FLASK_RUN_HOST", "0.0.0.0")
    print("╔════════════════════════════════════════╗")
    print("║     Página Romántica - A&D             ║")
    print("║   💕 Una carta interactiva de amor 💕  ║")
    print("╚════════════════════════════════════════╝")
    print(f"\n  En esta PC:  http://127.0.0.1:{puerto}/")
    lan = _ip_en_lan()
    if lan:
        print(f"  En el celu:  http://{lan}:{puerto}/  (misma WiFi)\n")
    else:
        print("  En el celu:  http://<IP-de-esta-PC>:%s/  (misma WiFi)\n" % puerto)
    print("  Si no carga: firewall de Windows → permitir Python en red privada.\n")
    print("  Presiona Ctrl+C para detener el servidor\n")

    app.run(host=host, port=puerto, debug=app.config.get("DEBUG", False))
