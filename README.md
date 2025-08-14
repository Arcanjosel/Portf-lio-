# Portfólio Moderno (FastAPI + React)

Aplicação de portfólio full‑stack com backend em Python (FastAPI/SQLite/SQLModel/ReportLab) e frontend em React (Vite + TypeScript + MUI + Tailwind + Framer Motion + react-image-gallery).

## Tecnologias
- Backend: FastAPI, SQLModel/SQLAlchemy (SQLite local), ReportLab, Uvicorn
- Frontend: React, Vite, TypeScript, MUI, Tailwind CSS, Framer Motion, react-image-gallery, Axios, Tabler Icons
- Dev: PowerShell, Python venv, Node.js (npm), Chocolatey (Windows)

## Requisitos
- Python 3.11+ (recomendado 3.11 ou 3.12)
- Node.js LTS e npm
- Windows PowerShell (sugerido executar como Administrador para instalar Node via Chocolatey)

Opcional: use `scripts/install_node.ps1` para instalar Node LTS pelo Chocolatey.

## Estrutura
```
backend/
  app/
    database.py        # engine SQLite e sessão
    models.py          # SQLModel (Profile, Project, Experience, Skill, BudgetRequest)
    pdf.py             # geração de PDF com ReportLab
    routers/portfolio.py  # endpoints REST e PDF
    main.py            # instancia FastAPI + CORS
  dev.ps1              # script para iniciar Uvicorn
  requirements.txt
frontend/
  src/
    pages/App.tsx                      # app principal com tabs Projetos/Orçamento
    components/GalleryDialog.tsx       # galeria por projeto
    components/ProjectPresentationDialog.tsx  # apresentação Myrthes
    components/Footer.tsx
    assets/{ct.png,myrthes.png,logo.png}
  index.html, vite.config.ts, tailwind.config.js, styles.css
README.md
```

## Setup rápido
### 1) Backend
```powershell
# na raiz do projeto
py -m venv .venv
./.venv/Scripts/Activate.ps1
pip install -r backend/requirements.txt
# popular o banco com dados iniciais
python -c "from backend.app.seed import main; main()"
# iniciar o servidor
powershell -NoProfile -ExecutionPolicy Bypass -File backend/dev.ps1
# API: http://127.0.0.1:8000
# Docs: http://127.0.0.1:8000/docs
```

### 2) Frontend
```powershell
cd frontend
npm install
npm run dev
# App: http://127.0.0.1:5173/
```

## Funcionalidades
- Perfil, Projetos, Skills e Experiências servidos pela API
- Galeria específica por projeto (abre ao clicar no card)
- Apresentação detalhada para o projeto "Myrthes Costuras"
- Tema escuro, animações modernas, botões com degradê aurora
- Guia de uso em `docs/GUIDE.md` com placeholders de imagens
- Geração de PDF do portfólio (`Baixar PDF`)
- Aba "Orçamento" com formulário de briefing e envio para a API
- Rodapé profissional e ícones Tabler integrados

## Endpoints principais
- GET `/api/profile`
- GET `/api/projects`
- GET `/api/skills`
- GET `/api/experiences`
- POST `/api/budget` (envio do briefing)
- GET `/api/budget`
- GET `/api/pdf` (PDF inline)

## Variáveis e Banco de Dados
- Banco local: `backend/app/database.py` usa `sqlite:///./portfolio.db` na raiz do projeto
- Ao iniciar o app, as tabelas são criadas automaticamente

## Dicas de uso
- Se os projetos não aparecerem, garanta que:
  - O backend está rodando em `http://127.0.0.1:8000`
  - Você executou o seed (`python -c "from backend.app.seed import main; main()"`)
  - A aba "Projetos" está selecionada
- Imagens da galeria: coloque os arquivos em `frontend/src/assets/` conforme nomes esperados no componente
- Caso a galeria fique preta ao abrir após uma apresentação, isso foi tratado fechando o diálogo anterior antes de abrir a galeria.

## Scripts úteis
- `backend/dev.ps1` inicia o Uvicorn com reload
- `npm run dev` sobe o Vite
- `npm run build` build de produção do frontend

## Licença
Uso pessoal/portfólio. Adapte conforme necessário.
