### Guia de Uso – Portfólio de Sistemas (NR-13 e Myrthes)

Este guia organiza as telas principais e diálogos de ambos os sistemas, com placeholders para você colar screenshots. Basta salvar as imagens nos caminhos indicados e estes links funcionarão.

## Estrutura sugerida
- `docs/`
  - `nr13/`
    - `main_window.png`
    - `login.png`
    - `clientes.png`
    - `equipamentos.png`
    - `valvulas.png`
    - `manometros.png`
    - `inspecoes.png`
    - `manutencoes.png`
    - `calibracoes.png`
    - `relatorios.png`
    - `configuracoes.png`
  - `myrthes/`
    - `main_window.png`
    - `dashboard.png`
    - `pedidos.png`
    - `clientes.png`
    - `servicos.png`
    - `estoque.png`
    - `sincronizacao.png`
    - `configuracoes.png`
    - `impressora.png`

Dicas:
- Resolução recomendada: 1920x1080, tema escuro, zoom 100%.
- Nomeie os arquivos exatamente como acima para os links funcionarem.
- Otimize as imagens (pngquant/squoosh) antes de versionar.

---

## Sistema NR-13 – Gestão de Equipamentos de Pressão

### Janela Principal
- Navegação entre módulos e visão geral.

![NR-13 — Janela Principal](nr13/main_window.png)

### Login
- Autenticação inicial.

![NR-13 — Login](nr13/login.png)

### Clientes
- Cadastro, busca e validação de CNPJ/CPF.

![NR-13 — Clientes](nr13/clientes.png)

### Equipamentos (Vasos/Caldeiras)
- Especificações técnicas, relacionamento com cliente.

![NR-13 — Equipamentos](nr13/equipamentos.png)

### Dispositivos de Segurança
- Válvulas:

![NR-13 — Válvulas](nr13/valvulas.png)

- Manômetros:

![NR-13 — Manômetros](nr13/manometros.png)

### Inspeções
- Programação, resultados e agendamento.

![NR-13 — Inspeções](nr13/inspecoes.png)

### Manutenções
- Preventivas/corretivas, peças e custos.

![NR-13 — Manutenções](nr13/manutencoes.png)

### Calibrações
- Ensaios, certificados e upload para cloud.

![NR-13 — Calibrações](nr13/calibracoes.png)

### Relatórios
- Filtros, períodos e exportação (PDF/Excel).

![NR-13 — Relatórios](nr13/relatorios.png)

### Configurações
- Banco de dados, Google Cloud, logging e cache.

![NR-13 — Configurações](nr13/configuracoes.png)

Checklist de captura (NR-13):
- [ ] Login
- [ ] Janela principal
- [ ] Clientes
- [ ] Equipamentos
- [ ] Válvulas
- [ ] Manômetros
- [ ] Inspeções
- [ ] Manutenções
- [ ] Calibrações
- [ ] Relatórios
- [ ] Configurações

---

## Myrthes Costuras – Gestão de Oficina

### Janela Principal
- Cabeçalho, navegação, tema.

![Myrthes — Janela Principal](myrthes/main_window.png)

### Dashboard
- Serviços mais/menos rentáveis, receita por dia e exportação CSV.

![Myrthes — Dashboard](myrthes/dashboard.png)

### Pedidos
- Criar, buscar, filtrar, marcar entregue, remover em lote, imprimir recibo.

![Myrthes — Pedidos](myrthes/pedidos.png)

### Clientes
- Cadastro e listagem.

![Myrthes — Clientes](myrthes/clientes.png)

### Serviços
- Cadastro, ativação/desativação, ajuste de preços e filtros.

![Myrthes — Serviços](myrthes/servicos.png)

### Estoque
- Itens e ajustes de quantidades.

![Myrthes — Estoque](myrthes/estoque.png)

### Sincronização
- Fila local (SQLite), informar JSON, disparo de envio manual.

![Myrthes — Sincronização](myrthes/sincronizacao.png)

### Configurações
- Tema, fonte, caminhos e ajustes gerais.

![Myrthes — Configurações](myrthes/configuracoes.png)

### Impressora Térmica
- USB/Serial/IP, parâmetros e teste.

![Myrthes — Impressora](myrthes/impressora.png)

Checklist de captura (Myrthes):
- [ ] Janela principal
- [ ] Dashboard
- [ ] Pedidos
- [ ] Clientes
- [ ] Serviços
- [ ] Estoque
- [ ] Sincronização
- [ ] Configurações
- [ ] Impressora
