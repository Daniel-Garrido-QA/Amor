"""
Aplicación Flask para página romántica dedicada a mi pareja
Autor: Daniel Garrido
Descripción: Experiencia web interactiva, emocional y visualmente impactante
"""

from flask import Flask, render_template, jsonify
import os
import socket
import sys
import traceback

# Inicializar la aplicación Flask
app = Flask(__name__, 
            template_folder=os.path.join(os.path.dirname(__file__), 'templates'),
            static_folder=os.path.join(os.path.dirname(__file__), 'static'))

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
    "mensajeFinal_parte3": "Y por un futuro próximo lleno de amor",
    "mensajeFinal_parte4": "Proximamente se nos viene el noviasgo y en unos cuantos años más, el matrimonio y la familia ❤️"
}

@app.route('/')
def index():
    """Ruta principal que renderiza la página romántica"""
    try:
        return render_template('index.html', data=romantic_data)
    except Exception as e:
        print(f"ERROR en ruta '/': {str(e)}", file=sys.stderr)
        traceback.print_exc()
        return f"Error: {str(e)}", 500

@app.route('/api/datos')
def obtener_datos():
    """Endpoint API para obtener datos románticos"""
    return jsonify(romantic_data)

@app.route('/api/milestones')
def obtener_milestones():
    """Endpoint API para obtener los hitos románticos"""
    try:
        return render_template('index.html', data=romantic_data), 404
    except:
        return jsonify({"status": "error", "mensaje": "Página no encontrada"}), 404

@app.errorhandler(500)
def error_servidor(error):
    """Manejo de errores 500"""
    print(f"ERROR 500: {str(error)}", file=sys.stderr)
    traceback.print_exc()
    try:
        return render_template('index.html', data=romantic_data), 500
    except:
        return jsonify({"status": "error", "mensaje": "Error interno del servidor"}), 404

@app.errorhandler(500)
def error_servidor(error):
    """Manejo de errores 500"""
    return render_template('index.html', data=romantic_data), 500

def _ip_en_lan():
    """IP para abrir desde otro dispositivo en la misma WiFi (no usar localhost en el móvil)."""
    try:
        # Método 1: Usar socket UDP (no requiere conexión real)
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(1)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        # Filtrar IPs locales válidas
        if ip and not ip.startswith('127.'):
            return ip
    except (OSError, socket.timeout):
        pass
    
    # Método 2: Obtener hostname y resolver
    try:
        hostname = socket.gethostname()
        ip = socket.gethostbyname(hostname)
        if ip and not ip.startswith('127.'):
            return ip
    except OSError:
        pass
    
    return None


if __name__ == '__main__':
    # host=127.0.0.1: solo en localhost (cada persona lo abre en su máquina)
    puerto = int(os.environ.get("PORT", "5000"))
    host = os.environ.get("FLASK_RUN_HOST", "127.0.0.1")
    print("╔════════════════════════════════════════╗")
    print("║       TE AMO MI PRINCESITA - A & D     ║")
    print("║   💕 Una carta interactiva de amor 💕  ║")
    print("╚════════════════════════════════════════╝")
    print(f"\n  Abre en tu navegador:  http://127.0.0.1:{puerto}/")
    print("  (O también: http://localhost:%s/)\n" % puerto)
    print("  Presiona Ctrl+C para detener el servidor\n")

    app.run(host=host, port=puerto, debug=app.config.get("DEBUG", False))
