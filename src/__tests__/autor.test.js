import mongoose from "mongoose";
import { connectionDB } from "../connection/database.js";
import supertest from "supertest";
import app from "../app.js";
import Usuario from "../model/Usuario.js";
import { criaUsuarioELogar } from "../helpers/criaUsuarioELoga.js";
import Autor from "../model/Autor.js";

let idAutor
let dadosUsuario

beforeAll(async () => {
    await connectionDB()
})

beforeAll(async () => {
    const cadastraELoga = await criaUsuarioELogar("robo123@gmail.com", "111222")
    dadosUsuario = cadastraELoga
})

afterAll(async () => {
    await Autor.deleteOne({ _id: idAutor })
    await Usuario.deleteOne({ email: "robo123@gmail.com" })
    await mongoose.connection.close()
})

test("deve criar um autor com sucesso", async () => {
  const resAutor = await supertest(app)
  .post("/graphql")
  .send({ query: `mutation { criaAutor(input: { nome: "José", idade: 64 }) { id nome } }`})
  .set("Authorization", "Bearer " + dadosUsuario.token)
  .expect(200)

  idAutor = resAutor.body.data.criaAutor.id

  expect(idAutor).toBeDefined()
  expect(resAutor.body.data.criaAutor.nome).toBe("José")
})