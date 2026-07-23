import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema.js"
import resolvers from "./resolvers.js";
import { connectionDB } from "./connection/database.js";

await connectionDB()

const server = new ApolloServer({
    typeDefs, //schemas
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 }
}) 

console.log(`Servidor rodando em ${url}`);