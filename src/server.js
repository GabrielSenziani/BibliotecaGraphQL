import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import DataLoader from "dataloader";
import typeDefs from "./schema.js"
import resolvers from "./resolvers.js";
import { connectionDB } from "./connection/database.js";
import { buscaLivrosPorAutor } from "./loaders/livrosPorAutorLoader.js";
import { auth } from "./middlewares/authMiddleware.js";

await connectionDB()

const server = new ApolloServer({
    typeDefs, //schemas
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
    context: async ({ req }) => {
        const operacao = req.body?.query || ""

        const livrosPorAutorLoader = new DataLoader(buscaLivrosPorAutor)

        if (operacao.includes("cadastrar") || operacao.includes("login") || operacao.includes("IntrospectionQuery")) {
            return {
             livrosPorAutorLoader,
             usuario: null
            }
        }

        const usuario = await auth({ req })

        return{
         usuario,
         livrosPorAutorLoader
        }
    }
}) 

console.log(`Servidor rodando em ${url}`);