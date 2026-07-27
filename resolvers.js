import Livro  from "./model/Livro.js"
import Autor from "./model/Autor.js"
import mongoose from "mongoose"

const resolvers = {
    Query: {
        livros: async () => {
            return await Livro.find().populate("autor")
        },
        autores: async () => {
         return await Autor.find()
        },
        autor: async (_, args) => {
          const { id } = args

          if (!mongoose.Types.ObjectId.isValid(id)) {
            return null
          }
          const encontraIdAutor = await Autor.findById(id)

          if (!encontraIdAutor) {
            return null
          }
          return encontraIdAutor
        },
        livro: async (_, args) => {
        const { id } = args

        if (!mongoose.Types.ObjectId.isValid(id)) {
          return null
        }

        const encontraIdLivro = await Livro.findById(id)

        if (!encontraIdLivro) {
          return null
        }

        return await encontraIdLivro.populate("autor")
      }
    },

    Autor: {
     livros: async (parent) => {
      return await Livro.find({ autor: parent._id })
     }
    },
    Mutation: {
      criaLivro: async (_, { input }) => {
        const { autorId, ...dadosDoLivro } = input

        if (!mongoose.Types.ObjectId.isValid(autorId)) {
          return null
        }

        const autor = await Autor.findById(autorId)

        if (!autor) {
          return null
        }

        const novoLivro = await Livro.create({...dadosDoLivro, autor: autorId})

        const livroPopulado = await Livro
        .findById(novoLivro._id)
        .populate("autor")

        return livroPopulado
      },

      criaAutor: async (_, { input }) => {
        const novoAutor = await Autor.create(input)

        return novoAutor
      },
      atualizarLivro: async (_, { input }) => {
       const { id, autorId, ...novosDados} = input

       if (Object.values(novosDados).length === 0 && autorId === undefined) {
        return null
       }

       if (!mongoose.Types.ObjectId.isValid(id)) {
        return null
       }

       if (autorId) {
        if (!mongoose.Types.ObjectId.isValid(autorId)) {
          return null
        }
        const autor = await Autor.findById(autorId)

        if(!autor) {
         return null
        }

        novosDados.autor = autorId
       }

       const verificaLivro = await Livro.findById(id)

       if(!verificaLivro) {
        return null
       }

        return await Livro
       .findByIdAndUpdate(id, novosDados, {returnDocument: "after", runValidators: true})
       .populate("autor")
      },
      deletarLivro: async (_, args) => {
        const { id } = args

        if (!mongoose.Types.ObjectId.isValid(id)) {
          return null
        }
        
        const encontraLivroEDeleta = await Livro.findByIdAndDelete(id)

        if (!encontraLivroEDeleta) {
          return null
        }

        return encontraLivroEDeleta
      }
    }
   }
export default resolvers;