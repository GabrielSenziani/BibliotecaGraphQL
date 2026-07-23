const typeDefs = `#graphql
  type Livro {
   titulo: String!
   autor: String!
  }

  type Query {
   livros: [Livro]


  livro(id: ID!): Livro
  }

  type Mutation {
  criaLivro(
    titulo: String!
    autor: String!
  ): Livro

  atualizarLivro(
    id: ID!
    titulo: String!
    autor: String!
  ): Livro

  deletarLivro(
  id: ID!
  ): Livro
  }

`

export default typeDefs