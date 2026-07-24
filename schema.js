const typeDefs = `#graphql
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

  type Query {
   livros: [Livro!]!

   livro(id: ID!): Livro

   autores: [Autor]

   autor(id: ID!): Autor
  }

  type Mutation {
  criaLivro(
    titulo: String!
    autorId: ID!
  ): Livro

  criaAutor(
  nome: String!
  idade: Int!
  ): Autor

  atualizarLivro(
    id: ID!
    titulo: String
    autorId: ID
  ): Livro

  deletarLivro(
  id: ID!
  ): Livro
  }

`

export default typeDefs