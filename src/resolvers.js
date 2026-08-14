import Livro  from "./model/Livro.js"
import Autor from "./model/Autor.js"
import mongoose from "mongoose"
import { buscarPorId } from "./utils/buscaPorId.js"
import { ValidationError } from "./errors/ValidationError.js"
import { cadastrar, login } from "./services/usuarioService.js"
import { requerAutenticacao } from "./middlewares/requerAuth.js"
import Usuario from "./model/Usuario.js"

const resolvers = {
    Query: {
        livros: requerAutenticacao (async (parent, args, context, info) => {
            return await Livro.find().populate("autor")
        }),
        autores: requerAutenticacao (async (parent, args, context, info) => {
         return await Autor.find()
        }),
        autor: requerAutenticacao (async (parent, args, context, info) => {
          const { id } = args

          const encontraIdAutor = await buscarPorId(Autor, id, "Autor")
          
          return encontraIdAutor
        }),
        livro: requerAutenticacao (async (parent, args, context, info) => {
        const { id } = args

        const livroPopulado = await buscarPorId(Livro, id, "Livro")

        return livroPopulado.populate("autor")
      }),
       usuarios: requerAutenticacao (async (parent, args, context, info) => {
         return await Usuario.find()
       }),
       usuario: requerAutenticacao (async (parent, args, context, info) => {
        const { id } = args

        const buscaUsuario = await buscarPorId(Usuario, id, "Usuario")

        return buscaUsuario
       })
    },

    Autor: {
     livros: async (parent, args, context) => {
      return await context.livrosPorAutorLoader.load(parent._id)
     }
    },
    Mutation: {
      criaLivro: requerAutenticacao (async (parent, args, context, info) => {
        const { autorId, ...dadosDoLivro } = args.input

        await buscarPorId(Autor, autorId, "Autor")

        const novoLivro = await Livro.create({...dadosDoLivro, autor: autorId})

        const livroPopulado = await Livro
        .findById(novoLivro._id)
        .populate("autor")

        return livroPopulado
      }),

      criaAutor: requerAutenticacao (async (parent, args, context, info) => {
        const novoAutor = await Autor.create(args.input)

        return novoAutor
      }),
      cadastrar: async (_, args) => {
       const { email, senha } = args

       const resultado = await cadastrar(email, senha)
       return resultado
      },
      login: async (_, args) => {
       const { email, senha } = args

       const resultado = await login(email, senha)
       return { token: resultado }
      },
      atualizarLivro: requerAutenticacao (async (parent, args, context, info) => {
       const { id, autorId, ...novosDados} = args.input

       if ((autorId == undefined) && Object.values(novosDados).length === 0) {
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
      }),
      deletarLivro: requerAutenticacao (async (parent, args, context, info) => {
        const { id } = args

       await buscarPorId(Livro, id, "Livro")
        
        const encontraLivroEDeleta = await Livro.findByIdAndDelete(id)


        return encontraLivroEDeleta
      }),

      deletarUsuario: requerAutenticacao (async (parent, args, context, info) => {
        const { id } = args

        await buscarPorId(Usuario, id, "Usuario")

        const encontraUsuarioEDeleta = await Usuario.findByIdAndDelete(id)

        return encontraUsuarioEDeleta
      })
    }
   }
export default resolvers;