import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import DataLoader from "dataloader";
import typeDefs from "./schema.js"
import resolvers from "./resolvers.js";
import { connectionDB } from "./connection/database.js";
import { buscaLivrosPorAutor } from "./loaders/livrosPorAutorLoader.js";

await connectionDB()

const server = new ApolloServer({
    typeDefs, //schemas
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
    context: async () => {
        return{
         livrosPorAutorLoader: new DataLoader(buscaLivrosPorAutor)
        }
    }
}) 

console.log(`Servidor rodando em ${url}`);