import mongoose from "mongoose";
import { connectionDB } from "../connection/database.js";
import supertest from "supertest";
import app from "../app.js";
import Usuario from "../model/Usuario.js";
import { criaUsuarioELogar } from "../helpers/criaUsuarioELoga.js";
import Autor from "../model/Autor.js";
import Livro from "../model/Livro.js";
import { criaAutor } from "../helpers/criaAutor.js";

let dadosUsuario
let autorId
let livroId

beforeAll( async () => {
    await connectionDB()
})

beforeAll(async () => {
    const cadastraELoga = await criaUsuarioELogar("livro123@gmail.com", "111222")
    dadosUsuario = cadastraELoga

    console.log(dadosUsuario)
})

beforeAll(async () => {
    const criaOAutor = await criaAutor(dadosUsuario.token, "Miguel", 25)
    autorId = criaOAutor.id
})

afterAll(async () => {
    await Livro.findByIdAndDelete(livroId)
    await Autor.findByIdAndDelete(autorId)
    await Usuario.deleteOne({ email: "livro123@gmail.com" })
    await mongoose.connection.close()
})

test("deve criar um livro sem erro nenhum", async () => {
    const resCriaLivro = await supertest(app)
    .post("/graphql")
    .send({ query: `mutation {criaLivro(input: {titulo: "Cavaleiro das Trevas", autorId: "${autorId}"}) {titulo, id} }` })
    .set("Authorization", "Bearer " + dadosUsuario.token)
    .expect(200)

  livroId = resCriaLivro.body.data.criaLivro.id

  expect(livroId).toBeDefined()
  expect(resCriaLivro.body.data.criaLivro.titulo).toBe("Cavaleiro das Trevas")
})

test("não deve criar um livro por conta da ausência de autor", async () => {
    const novoId = new mongoose.Types.ObjectId()
    const resAutorAusente = await supertest(app)
    .post("/graphql")
    .send({ query: `mutation {criaLivro (input: {titulo: "10 Mandamentos", autorId: "${novoId}"}) {titulo, id}}` })
    .set("Authorization", "Bearer " + dadosUsuario.token)

    expect(resAutorAusente.body.data.criaLivro).toBeNull()
    expect(resAutorAusente.body.errors.length).toBeGreaterThan(0)
    expect(resAutorAusente.body.errors[0]).toHaveProperty("message", `Autor com id "${novoId}" não encontrado`)
})