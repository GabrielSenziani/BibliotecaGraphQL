# BibliotecaGraphQL

API GraphQL para gerenciamento de livros e autores, desenvolvida com **Node.js**, **Apollo Server**, **MongoDB** e **Mongoose**.

O projeto foi desenvolvido com o objetivo de aprofundar os conhecimentos em **GraphQL**, explorando Queries, Mutations, autenticação, regras de negócio, testes automatizados, integração contínua e deploy automático.

---

## Tecnologias

- Node.js
- GraphQL
- Apollo Server
- MongoDB Atlas
- Mongoose
- JWT
- dotenv
- Jest
- Supertest
- GitHub Actions
- Render

---

## Funcionalidades

- Cadastro e autenticação de usuários
- Autenticação utilizando JWT
- Cadastro de autores
- Listagem de autores
- Cadastro de livros
- Listagem de livros
- Busca de livro por ID
- Atualização de livros
- Exclusão de livros
- Validação de regras de negócio
- Proteção de operações por autenticação
- Testes automatizados
- Pipeline de CI com GitHub Actions
- Deploy automático através do Render

---

## Estrutura do projeto

```text
BibliotecaGraphQL
│
├── src
│   ├── __tests__
│   │   ├── autor.test.js
│   │   ├── livro.test.js
│   │   ├── usuario.test.js
│   │   └── teste.js
│   │
│   ├── connection
│   │   └── database.js
│   │
│   ├── helpers
│   │   ├── criaAutor.js
│   │   └── criaUsuarioELoga.js
│   │
│   ├── model
│   │   ├── Autor.js
│   │   ├── Livro.js
│   │   └── Usuario.js
│   │
│   ├── resolvers.js
│   ├── schema.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
└── ...
```

> A estrutura acima apresenta os principais diretórios e arquivos do projeto.

---

# Configuração

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

Crie um arquivo `.env` e o `.env.test` utilizando o `.env.example` como referência.

Exemplo:

```env
MONGO_URI=sua_string_de_conexao
JWT_SECRET=sua_chave_secreta
```

```env.test
MONGO_URI=sua_string_de_conexao_para_testes
```

Para os testes automatizados, é utilizado um banco de dados separado através das variáveis de ambiente de teste.

---

# Executando o projeto

Execute:

```bash
npm start
```

O Apollo Server será iniciado localmente.

A API GraphQL estará disponível em:

```text
http://localhost:3000/graphql
```

---

# GraphQL

A API utiliza **Queries** para consultas e **Mutations** para operações que modificam os dados.

As operações protegidas exigem autenticação através de um token JWT.

## Autenticação

O fluxo de autenticação consiste em:

1. Cadastrar um usuário;
2. Realizar login;
3. Receber o token JWT;
4. Utilizar o token para acessar as operações protegidas.

O token deve ser enviado através do header:

```text
Authorization: Bearer SEU_TOKEN
```

---

# Queries

## Listar livros

```graphql
query {
  livros {
    id
    titulo
    isbn
    autor {
      id
      nome
    }
  }
}
```

## Buscar livro por ID

```graphql
query {
  livro(id: "ID_DO_LIVRO") {
    id
    titulo
    isbn
    autor {
      id
      nome
    }
  }
}
```

---

# Mutations

## Cadastro de usuário

```graphql
mutation {
  cadastro(
    email: "usuario@email.com"
    senha: "123456"
  ) {
    ...
  }
}
```

## Login

```graphql
mutation {
  login(
    email: "usuario@email.com"
    senha: "123456"
  ) {
    ...
  }
}
```

Após realizar o login, o token JWT retornado deve ser utilizado para acessar as operações protegidas.

---

## Criar livro

```graphql
mutation {
  criaLivro(
    titulo: "1984"
    isbn: "9780451524935"
    autorId: "ID_DO_AUTOR"
  ) {
    id
    titulo
    isbn
  }
}
```

## Atualizar livro

```graphql
mutation {
  atualizarLivro(
    id: "ID_DO_LIVRO"
    titulo: "Novo título"
    isbn: "NOVO_ISBN"
    autorId: "ID_DO_AUTOR"
  ) {
    id
    titulo
    isbn
  }
}
```

## Deletar livro

```graphql
mutation {
  deletarLivro(
    id: "ID_DO_LIVRO"
  ) {
    id
    titulo
    isbn
  }
}
```

---

# Testes automatizados

O projeto possui testes automatizados utilizando **Jest** e **Supertest**.

Para executar todos os testes:

```bash
npm test
```

Os testes verificam diferentes cenários da aplicação, incluindo:

- operações bem-sucedidas;
- validações;
- autenticação;
- autorização;
- regras de negócio;
- dados inválidos;
- ausência de autenticação;
- tokens inválidos;
- tentativa de manipulação de recursos pertencentes a outros usuários.

Os testes utilizam um banco de dados separado do ambiente de desenvolvimento.

---

# CI/CD

O projeto utiliza **GitHub Actions** para automatizar a execução dos testes.

A cada `push` realizado na branch `main`, o workflow executa as etapas de integração contínua.

O fluxo consiste em:

```text
Push
  ↓
Checkout do código
  ↓
Configuração do Node.js
  ↓
Instalação das dependências
  ↓
Execução dos testes
  ↓
Deploy
```

Caso os testes falhem, o pipeline é interrompido, impedindo que uma versão que não passou pela validação automatizada avance para o deploy.

---

# Deploy

O projeto está configurado para realizar **deploy automático através do Render**.

O repositório do GitHub é integrado ao serviço de hospedagem, permitindo que novas alterações sejam disponibilizadas automaticamente após passarem pelo fluxo de CI/CD.

---

# Variáveis de ambiente

O projeto utiliza variáveis de ambiente para evitar que informações sensíveis sejam armazenadas diretamente no código.

### Ambiente de desenvolvimento

```env
MONGO_URI=sua_string_de_conexao
JWT_SECRET=sua_chave_secreta
```


```env.test
MONGO_URI=sua_string_de_conexao_para_testes
```

### Ambiente de testes

Os testes utilizam uma configuração de banco separada para evitar que os dados do ambiente de desenvolvimento sejam utilizados durante a execução da suíte de testes.

As informações sensíveis utilizadas pelo CI são armazenadas como **Secrets** no GitHub.

---

# Objetivo

Este projeto foi desenvolvido para aprofundar conhecimentos em desenvolvimento de APIs GraphQL utilizando **Apollo Server**, além de praticar conceitos de:

- GraphQL;
- modelagem de dados com MongoDB e Mongoose;
- autenticação e autorização;
- JWT;
- regras de negócio;
- testes automatizados;
- integração contínua;
- deploy automático;
- organização de código.

O projeto também serve como laboratório para comparar conceitos de uma API GraphQL com os conhecimentos previamente adquiridos no desenvolvimento de APIs REST.
