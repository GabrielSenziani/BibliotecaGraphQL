import Usuario from "../model/Usuario.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { ValidationError } from "../errors/ValidationError.js";
import { AuthenticationError } from "../errors/AuthenticationError.js";

export async function cadastrar (email, senha) {
  const verificaEmail = await Usuario.findOne({ email: email })

  if (verificaEmail) {
   throw new ValidationError("E-mail já cadastrado")
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10)

  const novoUsuario = await Usuario.create({
    email: email,
    senha: senhaCriptografada
  })
  
  return {id: novoUsuario._id, email: novoUsuario.email}
}

export async function login (email, senha) {
 const usuario = await Usuario.findOne({ email: email })

  if (!usuario) {
    throw new AuthenticationError("Email ou senha inválidos")
  }

  const comparaSenha = await bcrypt.compare(senha, usuario.senha)

  if (!comparaSenha) {
    throw new AuthenticationError("Email ou senha inválidos")
  }

  const chaveSecreta = process.env.JWT_SECRET

  const token = jwt.sign(
    {id: usuario._id}, 
        chaveSecreta, 
        {expiresIn: "1h"})

 return token
}