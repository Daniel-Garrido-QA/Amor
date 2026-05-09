#!/bin/bash

# =====================================================
# Script para ejecutar la página romántica en macOS/Linux
# =====================================================

echo ""
echo "╔════════════════════════════════════════╗"
echo "║     Página Romántica - Flask App       ║"
echo "║   💕 Una carta interactiva de amor 💕  ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Verificar si Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 no está instalado"
    echo "Instala Python desde: https://www.python.org/"
    exit 1
fi

# Verificar si el entorno virtual existe
if [ ! -d "venv" ]; then
    echo "[1/3] Creando entorno virtual..."
    python3 -m venv venv
    echo "✓ Entorno virtual creado"
    echo ""
fi

# Activar entorno virtual
echo "[2/3] Activando entorno virtual..."
source venv/bin/activate
echo "✓ Entorno virtual activado"
echo ""

# Instalar dependencias
echo "[3/3] Verificando dependencias..."
pip install -r requirements.txt -q
echo "✓ Dependencias instaladas"
echo ""

# Ejecutar Flask
echo "Iniciando servidor..."
echo ""
cd app
python app.py

# Mostrar mensaje si hay error
if [ $? -ne 0 ]; then
    echo ""
    echo "Error: No se pudo iniciar la aplicación"
    exit 1
fi
