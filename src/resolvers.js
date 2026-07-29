import Livro  from "./model/Livro.js"
import Autor from "./model/Autor.js"
import mongoose from "mongoose"
import { buscarPorId } from "./utils/buscaPorId.js"
import { ValidationError } from "./errors/ValidationError.js"

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

          const encontraIdAutor = await buscarPorId(Autor, id, "Autor")
          
          return encontraIdAutor
        },
        livro: async (_, args) => {
        const { id } = args

        const livro = await buscarPorId(Livro, id, "Livro")

        return livro.populate("autor")
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

        await buscarPorId(Autor, autorId, "Autor")

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
        const mensagem = "Forneça pelo menos um dado para realizar a atualização do livro"
        throw new ValidationError(mensagem)
       }

       await buscarPorId(Livro, id ,"Livro")

       if (autorId) {
        await buscarPorId(Autor, autorId, "Autor")

        novosDados.autor = autorId
       }

        return await Livro
       .findByIdAndUpdate(id, novosDados, {returnDocument: "after", runValidators: true})
       .populate("autor")
      },
      deletarLivro: async (_, args) => {
        const { id } = args

       await buscarPorId(Livro, id, "Livro")
        
        const encontraLivroEDeleta = await Livro.findByIdAndDelete(id)


        return encontraLivroEDeleta
      }
    }
   }
export default resolvers;