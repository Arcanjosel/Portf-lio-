$ErrorActionPreference = "Stop"

# Ativa a venv e inicia o servidor FastAPI com reload
$venvPython = Join-Path $PSScriptRoot "..\.venv\Scripts\python.exe"
if (!(Test-Path $venvPython)) {
    Write-Error "Venv não encontrada em .venv. Crie com: py -m venv .venv"
}

& $venvPython -m uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000

