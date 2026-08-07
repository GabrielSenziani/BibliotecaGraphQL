import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import DataLoader from "dataloader";
import { buscaLivrosPorAutor } from "./loaders/livrosPorAutorLoader.js";
import { auth } from "./middlewares/authMiddleware.js";
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";

const server = new ApolloServer({
    typeDefs, //schemas
    resolvers
})

await server.start()

const app = express()

app.use(express.json())

app.use("/graphql", expressMiddleware(server, 
    { context: async ({ req }) => {
           const livrosPorAutorLoader = new DataLoader(buscaLivrosPorAutor)
        
           const usuario = await auth({ req })
        
           return{
            usuario,
            livrosPorAutorLoader
        }
    }
}))

export default app