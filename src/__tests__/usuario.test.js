import supertest from "supertest";
import app from "../app.js";
import Usuario from "../model/Usuario.js";
import { criaUsuarioELogar } from "../helpers/criaUsuarioELoga.js";
import { connectionDB } from "../connection/database.js";
import mongoose from "mongoose";

let dadosUsuario

beforeAll(async () => {
    await connectionDB()
})

beforeAll(async () => {
    const cadastraELoga = await criaUsuarioELogar("sai@gmail.com", "111222")
    dadosUsuario = cadastraELoga
})

afterAll(async () => {
    await Usuario.deleteOne({ email: "sai@gmail.com" })
    await mongoose.connection.close()
})

test("busca usuario por id sem erros", async () => {
    const resBuscaUsuario = await supertest(app)
    .post("/graphql")
    .send({ query: `query {usuario(id: "${dadosUsuario.id}") {id, email}}` })
    .set("Authorization", "Bearer " + dadosUsuario.token)
    .expect(200)

    expect(resBuscaUsuario.body.data.usuario.id).toBe(dadosUsuario.id)
    expect(resBuscaUsuario.body.data.usuario.email).toBe("sai@gmail.com")
})

test("retorna usuarios existentes e verifica se o usuario criado está na lista", async () => {
    const resUsuarios = await supertest(app)
    .post("/graphql")
    .send({ query: `query {usuarios {id, email}}` })
    .set("Authorization", "Bearer " + dadosUsuario.token)
    .expect(200)

    const existeUsuario = resUsuarios.body.data.usuarios.some(usuario => usuario.email === dadosUsuario.email)

    expect(existeUsuario).toBe(true)
    expect(resUsuarios.body.data.usuarios.length).toBeGreaterThan(0)
})

test("deve deletar o usuario criado", async () => {
    const resDeletaUsuario = await supertest(app)
    .post("/graphql")
    .send({ query: `mutation {deletarUsuario (id: "${dadosUsuario.id}") {id, email }}` })
    .set("Authorization", "Bearer " + dadosUsuario.token)
    .expect(200)

    const idUsuarioDeletado = resDeletaUsuario.body.data.deletarUsuario.id

    expect(idUsuarioDeletado).toBeDefined()
    expect(idUsuarioDeletado).toBe(dadosUsuario.id)
})