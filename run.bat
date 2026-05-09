@echo off
REM =====================================================
REM Script para ejecutar la página romántica en Windows
REM =====================================================

echo.
echo ╔════════════════════════════════════════╗
echo ║     Página Romántica - Flask App       ║
echo ║   💕 Una carta interactiva de amor 💕  ║
echo ╚════════════════════════════════════════╝
echo.

REM Verificar si el entorno virtual existe
if not exist "venv" (
    echo [1/3] Creando entorno virtual...
    python -m venv venv
    echo ✓ Entorno virtual creado
    echo.
)

REM Activar entorno virtual
echo [2/3] Activando entorno virtual...
call venv\Scripts\activate.bat
echo ✓ Entorno virtual activado
echo.

REM Instalar dependencias
echo [3/3] Verificando dependencias...
pip install -r requirements.txt -q
echo ✓ Dependencias instaladas
echo.

REM Ejecutar Flask
echo Iniciando servidor...
echo.
cd app
python app.py

REM Mantener la ventana abierta si ocurre un error
if errorlevel 1 (
    echo.
    echo Error: No se pudo iniciar la aplicación
    pause
)
