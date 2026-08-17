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

test("deve atualizar o livro criado", async () => {
    const resLivroAtualizado = await supertest(app)
    .post("/graphql")
    .send({ query: `mutation {atualizarLivro(input: {id: "${livroId}", titulo: "Piratas do Caribe", autorId: "${autorId}"}) {titulo, id} }` })
    .set("Authorization", "Bearer " + dadosUsuario.token)
    .expect(200)

    livroId = resLivroAtualizado.body.data.atualizarLivro.id

    expect(livroId).toBeDefined()
    expect(resLivroAtualizado.body.data.atualizarLivro.titulo).toBe("Piratas do Caribe")
})

test("não deve atualizar o livro criado por falta de dados", async () => {
    const resFaltaDados = await supertest(app)
    .post("/graphql")
    .send({ query: `mutation {atualizarLivro(input: {id: "${livroId}"}) {titulo, id} }` })
    .set("Authorization", "Bearer " + dadosUsuario.token)

    expect(resFaltaDados.body.data.atualizarLivro).toBeNull()
    expect(resFaltaDados.body.errors.length).toBeGreaterThan(0)
    expect(resFaltaDados.body.errors[0]).toHaveProperty("message", `Forneça pelo menos um dado para realizar a atualização do livro`)
})

test("deve retornar a lista de livros quando autenticado", async () => {
    const res = await supertest(app)
    .post("/graphql")
    .send({ query: `query { livros { titulo, id } }` })
    .set("Authorization", "Bearer " + dadosUsuario.token)
    .expect(200)

  expect(Array.isArray(res.body.data.livros)).toBe(true)
  expect(res.body.data.livros.length).toBeGreaterThan(0)
  expect(res.body.data.livros[0]).toHaveProperty("titulo")
})

test("deve deletar o livro criado", async () => {
    const resDeletaLivro = await supertest(app)
    .post("/graphql")
    .send({ query: `mutation {deletarLivro (id: "${livroId}") {titulo, id} }` })
    .set("Authorization", "Bearer " + dadosUsuario.token)
    .expect(200)

    const idDeletado = resDeletaLivro.body.data.deletarLivro.id

    expect(idDeletado).toBeDefined()
    expect(idDeletado).toBe(livroId)
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