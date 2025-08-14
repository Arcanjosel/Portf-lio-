# Requisitos do Projeto

- Python 3.13+ (recomendado) com `pip`
- Node.js LTS 22.x (para o frontend React/Vite)
- Chocolatey (opcional, para instalar Node.js no Windows)

## Backend (Python)
- Dependências listadas em `backend/requirements.txt`
- Criar e ativar venv:
  - PowerShell: `py -m venv .venv` e `./.venv/Scripts/Activate.ps1`
  - Instalar deps: `pip install -r backend/requirements.txt`

## Frontend (Node)
- Requer Node.js LTS 22.x
- Após instalar Node: `npm create vite@latest frontend -- --template react-ts`
- Entrar na pasta `frontend` e instalar deps: `npm install`

## Instalação do Node com Chocolatey (Windows)
- Abrir PowerShell como Administrador e executar:
```powershell
choco install nodejs-lts -y --no-progress
```
- Alternativa com script deste repositório (tenta autoelevar):
```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/install_node.ps1
```

