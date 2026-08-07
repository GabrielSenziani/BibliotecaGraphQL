import mongoose from "mongoose";
import { connectionDB } from "../connection/database.js";
import supertest from "supertest";
import app from "../app.js";
import Usuario from "../model/Usuario.js";

let token

beforeAll(async () => {
    await connectionDB()
})

beforeAll(async () => {
    await supertest(app)
    .post("/graphql")
    .send({ query: `mutation{ cadastrar(email: "teste@teste.com", senha: "123456") {id email} }` })

    const resLogin = await supertest(app)
    .post("/graphql")
    .send({ query: `mutation{ login(email: "teste@teste.com", senha: "123456") {token} }` })
   
   console.log(resLogin.body)
   
   token = resLogin.body.data.login.token
})

afterAll(async () => {
    await Usuario.deleteOne({ email: "teste@teste.com" })
    await mongoose.connection.close()
})

test("deve retornar a lista de livros quando autenticado", async () => {
    const res = await supertest(app)
    .post("/graphql")
    .send({ query: `query { livros { titulo, id } }` })
    .set("Authorization", "Bearer " + token)
    .expect(200)

  expect(Array.isArray(res.body.data.livros)).toBe(true)
  expect(res.body.data.livros.length).toBeGreaterThan(0)
  expect(res.body.data.livros[0]).toHaveProperty("titulo")
})