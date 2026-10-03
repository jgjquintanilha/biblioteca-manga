# Biblioteca de Mangás

Avaliação 2 – FACET-SNP-310 – Frameworks Modernos para Desenvolvimento de Sistemas (2026.2)

## Integrantes
- João Gabriel de Jesus Pires Quintanilha — @jgjquintanilha
- Nome Completo 2 — @usuario-github

## Tema
Biblioteca pessoal de mangás. A entidade `Manga` possui os campos:
título, autor, editora, gênero (seleção), status (seleção), ano (número),
volumes (número), nota (número), dataAquisicao (data), lido (booleano),
cepCompra + localCompra (consulta ViaCEP), sinopse e capa.

## Funcionalidades
- CRUD de mangás com `v-data-table`, formulário em `v-dialog`, validações em português, exclusão com confirmação e `v-snackbar` de retorno.
- Página de consulta com busca textual geral, 3+ filtros combinados (seleção de gênero/status, intervalo numérico de ano, intervalo de data de aquisição, booleano "lido"), botão Limpar filtros e contador de resultados.
- API consumida: **ViaCEP** (https://viacep.com.br) — auto-preenche o local de compra a partir do CEP, com `:loading` e tratamento de erro.
- Persistência em `localStorage` compartilhada entre CRUD e consulta.
- Rotas: `/` (início), `/crud`, `/consulta`, com menu lateral (`v-navigation-drawer`).

## Como executar
```bash
npm install
npm run dev