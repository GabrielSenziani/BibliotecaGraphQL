import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import DataLoader from "dataloader";
import { buscaLivrosPorAutor } from "./loaders/livrosPorAutorLoader.js";
import { auth } from "./middlewares/authMiddleware.js";
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";

const server = new ApolloServer({
    typeDefs, //schemas
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
})

await server.start()

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.redirect("/graphql")
})

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