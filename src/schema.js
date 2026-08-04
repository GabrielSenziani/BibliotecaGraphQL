const typeDefs = `#graphql
  input LivroInput {
  titulo: String!
  autorId: ID!
  }

  input AutorInput {
  nome: String!
  idade: Int!
  }

  input UpdateLivroInput {
  id: ID!
  titulo: String
  autorId: ID
  }

  type Livro {
   id: ID!
   titulo: String!
   autor: Autor!
  }

  type Autor {
   id: ID!
   nome: String!
   idade: Int!
   livros: [Livro!]!
  }

  type Usuario {
   id: ID!
   email: String!
  }

  type LoginResponse {
   token: String!
  }

  type Query {
   livros: [Livro!]!

   livro(id: ID!): Livro

   autores: [Autor!]!

   autor(id: ID!): Autor
  }

  type Mutation {
  criaLivro(input: LivroInput!): Livro

  criaAutor(input: AutorInput!): Autor

  atualizarLivro(input: UpdateLivroInput!): Livro

  deletarLivro(
  id: ID!
  ): Livro

  cadastrar(
  email: String!
  senha: String!
  ): Usuario

  login(
  email: String!
  senha: String!
  ): LoginResponse
}

`

export default typeDefs