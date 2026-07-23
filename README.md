#  BibliotecaGraphQL

API GraphQL para gerenciamento de livros desenvolvida com **Node.js**, **Apollo Server**, **MongoDB** e **Mongoose**.

Este projeto foi criado com o objetivo de estudar os conceitos fundamentais do GraphQL, implementando um CRUD completo utilizando Queries e Mutations.

---

##  Tecnologias

- Node.js
- GraphQL
- Apollo Server
- MongoDB Atlas
- Mongoose
- dotenv

---

##  Estrutura do projeto

```
BibliotecaGraphQL
│
├── connection
│   └── database.js
│
├── model
│   └── Livro.js
│
├── .env.example
├── .gitignore
├── package.json
├── resolvers.js
├── schema.js
└── server.js
```

---

##  Configuração

Clone o repositório:

```bash
git clone https://github.com/GabrielSenziani/BibliotecaGraphQL.git
```

Entre na pasta:

```bash
cd BibliotecaGraphQL
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` utilizando o `.env.example` como referência.

Exemplo:

```env
MONGO_URI=sua_string_de_conexao
```

---

##  Executando o projeto

```bash
npm start
```

O Apollo Server será iniciado em:

```
http://localhost:3000
```

---

#  Schema

## Livro

```graphql
type Livro {
  titulo: String!
  autor: String!
}
```

---

#  Queries

## Buscar todos os livros

```graphql
query {
  livros {
    titulo
    autor
  }
}
```

## Buscar um livro por ID

```graphql
query {
  livro(id: "ID_DO_LIVRO") {
    titulo
    autor
  }
}
```

---

#  Mutations

## Criar livro

```graphql
mutation {
  criaLivro(
    titulo: "1984"
    autor: "George Orwell"
  ) {
    titulo
    autor
  }
}
```

---

## Atualizar livro

```graphql
mutation {
  atualizarLivro(
    id: "ID_DO_LIVRO"
    titulo: "Novo título"
    autor: "Novo autor"
  ) {
    titulo
    autor
  }
}
```

---

## Deletar livro

```graphql
mutation {
  deletarLivro(
    id: "ID_DO_LIVRO"
  ) {
    titulo
    autor
  }
}
```

---

#  Objetivo

Este projeto foi desenvolvido para praticar os conhecimentos em GraphQL, utilizando Apollo Server integrado ao MongoDB através do Mongoose.
---
