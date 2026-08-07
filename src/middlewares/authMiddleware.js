import jwt from "jsonwebtoken"
import { AuthenticationError } from "../errors/AuthenticationError.js"
import Usuario from "../model/Usuario.js"

export async function auth ({ req }) {
  const authorization = req.headers.authorization

  if (!authorization) {
    return null
  }

  if (!authorization.startsWith("Bearer ")) {
    throw new AuthenticationError("Formato do token inválido")
  }

  const pegaToken = authorization.split(" ")[1]
  
  let payload
  try {
   payload = jwt.verify(pegaToken, process.env.JWT_SECRET)
  } catch(error) {
   if (error.name === "TokenExpiredError") {
    throw new AuthenticationError("O token enviado expirou")
   } else {
    throw new AuthenticationError("Formato do token inválido")
   }
  }

  const usuario = await Usuario.findById(payload.id)

  if (usuario === null) {
    throw new AuthenticationError("Usuario não encontrado")
  }

  return usuario
}