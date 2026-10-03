# Biblioteca de Mangás

**Avaliação 2 – FACET-SNP-310 – Frameworks Modernos para Desenvolvimento de Sistemas (2026.2)**

> Atividade avaliativa da disciplina de Frameworks Modernos para Desenvolvimento de Sistemas,
> Universidade do Estado de Mato Grosso (UNEMAT) – Faculdade de Ciências Exatas e Tecnológicas (FACET).
> Professor: Ivan Luiz Pedroso Pires.

## Integrantes

- Vinicius Gabriel Costa Almeida – @Vinicius-aalmeida
- João Gabriel de Jesus Pires Quintanilha – @jgjquintanilha

## Tema

Sistema web para organizar uma coleção pessoal de mangás. A entidade cadastrada é o **Mangá**, com os campos abaixo:

| Campo | Tipo | Componente Vuetify |
| --- | --- | --- |
| Título | texto | `v-text-field` |
| Autor | texto | `v-text-field` |
| Editora | texto | `v-text-field` |
| Gênero | seleção | `v-select` |
| Status (em andamento, completo, hiato, cancelado) | seleção | `v-select` |
| Ano de lançamento | número | `v-text-field type="number"` |
| Volumes | número | `v-text-field type="number"` |
| Nota (0 a 10) | número | `v-text-field type="number"` |
| Data de aquisição | data | `v-text-field type="date"` |
| Já li esta obra? | booleano | `v-switch` |
| CEP da compra | texto (formato validado) | `v-text-field` |
| Local de compra | texto (preenchido pela API) | `v-text-field` |
| URL da capa | texto (URL validada) | `v-text-field` |
| Sinopse | texto longo | `v-textarea` |

## Funcionalidades

- **CRUD de mangás** (`/crud`)
  - Listagem em `v-data-table` com ordenação, paginação e ações de editar e excluir por linha.
  - Cadastro e edição em `v-dialog`, com validação (campos obrigatórios, limites de ano, volumes e nota, formato de CEP e de URL) e mensagens de erro em português.
  - Exclusão com diálogo de confirmação.
  - Retorno visual de sucesso ou erro com `v-snackbar`.
- **Página de consulta com filtros** (`/consulta`), somente leitura
  - Busca textual geral (título, autor, editora, sinopse e gênero), sem diferenciar maiúsculas de minúsculas.
  - Filtros por seleção (gênero e status), intervalo numérico (ano de/até), intervalo de datas (aquisição de/até) e situação de leitura (todos / já lidos / não lidos).
  - Todos os filtros funcionam combinados, de forma reativa (`computed`), e há o botão **Limpar filtros**.
  - Contador de resultados e mensagem amigável quando nenhum registro atende aos filtros.
- **Dados compartilhados e persistentes**
  - CRUD e consulta usam a mesma fonte de dados (`src/services/storage.ts` e `src/composables/useMangas.ts`).
  - Os dados são gravados no `localStorage` (`JSON.stringify` / `JSON.parse`) e continuam após recarregar a página.
  - Na primeira execução, um catálogo inicial de mangás é carregado automaticamente.
- **API consumida:** [ViaCEP](https://viacep.com.br) via **Axios**. Ao informar o CEP da compra, o local é preenchido automaticamente, com indicador de carregamento (`:loading`) e tratamento de erros (CEP inválido, CEP não encontrado e falha de rede).
- **Navegação:** Vue Router com as rotas Início (`/`), CRUD (`/crud`) e Consulta (`/consulta`), acessíveis pelo menu lateral (`v-navigation-drawer`). A interface é responsiva.

## Tecnologias

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vuetify 3](https://vuetifyjs.com/)
- [Vue Router 4](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)

## Como executar

Pré-requisito: [Node.js](https://nodejs.org/) (versão LTS recomendada) instalado.

```bash
git clone https://github.com/jgjquintanilha/biblioteca-manga.git
cd biblioteca-manga
npm install
npm run dev
```

O Vite exibe no terminal o endereço para abrir o sistema no navegador (normalmente `http://localhost:5173`).

## Estrutura do projeto

```
src/
├── components/
│   └── MangaFormDialog.vue   # formulário de cadastro/edição (props + emits)
├── composables/
│   └── useMangas.ts          # estado compartilhado entre CRUD e consulta
├── plugins/
│   └── vuetify.ts            # configuração do Vuetify e do tema
├── router/
│   └── index.ts              # rotas da aplicação
├── services/
│   ├── api.ts                # consumo da API ViaCEP com Axios
│   ├── seed.ts               # catálogo inicial de mangás
│   └── storage.ts            # leitura e gravação no localStorage
├── types/
│   └── manga.ts              # tipos da entidade
├── views/
│   ├── HomeView.vue          # página inicial
│   ├── MangaCrudView.vue     # página de gerenciamento (CRUD)
│   └── ConsultaView.vue      # página de consulta com filtros
├── App.vue                   # layout, menu lateral e barra superior
└── main.ts
```