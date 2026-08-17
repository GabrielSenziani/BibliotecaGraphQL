import mongoose from "mongoose";
import { connectionDB } from "../connection/database.js";
import supertest from "supertest";
import app from "../app.js";
import Usuario from "../model/Usuario.js";
import { criaUsuarioELogar } from "../helpers/criaUsuarioELoga.js";

let dadosUsuario

beforeAll(async () => {
    await connectionDB()
})

beforeAll(async () => {
    const cadastraELoga = await criaUsuarioELogar("teste@teste.com", "123456")
    dadosUsuario = cadastraELoga
})

afterAll(async () => {
    await Usuario.deleteOne({ email: "teste@teste.com" })
    await mongoose.connection.close()
})

test("não deve retornar livros sem autenticação", async () => { 
    const resSemToken= await supertest(app)
    .post("/graphql")
    .send({ query: `query { livros { titulo, id } }` }) 

 expect(resSemToken.body.data).toBeNull()
 expect(resSemToken.body.errors.length).toBeGreaterThan(0)
 expect(resSemToken.body.errors[0]).toHaveProperty("message", `Acesso negado, é necessário estar logado em uma conta`)
})

test("não deve retornar livros com formato de token inválido", async () => {
    const tokenInvalido = "aksjakjddsjd"
    const restokenInvalido = await supertest(app)
    .post("/graphql")
    .send({ query: `query { livros { titulo, id } }` })
    .set("Authorization", "Bearer " + tokenInvalido)

expect(restokenInvalido.body.data).toBeUndefined()
expect(restokenInvalido.body.errors.length).toBeGreaterThan(0)
expect(restokenInvalido.body.errors[0]).toHaveProperty("message", `Formato do token inválido`)

})