import Livro  from "./model/Livro.js"
import mongoose from "mongoose"

const resolvers = {
    Query: {
        livros: async () => {
            return await Livro.find()
        },
        livro: async (_, args) => {
        const { id } = args

        return await Livro.findById(id)
      }
    },
    Mutation: {
      criaLivro: async (_, args) => {
        const novoLivro = await Livro.create(args)

        return novoLivro
      },
      atualizarLivro: async (_, args) => {
       const { id, ...novosDados} = args

       return await Livro.findByIdAndUpdate(id, novosDados, {returnDocument: "after", runValidators: true})
      },
      deletarLivro: async (_, args) => {
        const { id } = args

        if (!mongoose.Types.ObjectId.isValid(id)) {
          return null
        }

        return await Livro.findByIdAndDelete(id)
      }
    }
   }
export default resolvers;