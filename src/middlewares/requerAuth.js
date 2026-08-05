import { AuthenticationError } from "../errors/AuthenticationError.js"

export function requerAutenticacao(resolverOriginal) {
    return function(parent, args, context, info) {
        if (!context.usuario) {
          throw new AuthenticationError("Acesso negado, é necessário estar logado em uma conta")
        }

        return resolverOriginal(parent, args, context, info)
    }
}