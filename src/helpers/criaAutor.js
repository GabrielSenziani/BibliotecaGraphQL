import supertest from "supertest";
import app from "../app.js";

export async function criaAutor(token, nome, idade) {
    const resAutores = await supertest(app)
    .post("/graphql")
    .send({ query: `mutation {criaAutor(input: { nome: "${nome}", idade: ${idade} }) {id, nome}}` })
    .set("Authorization", "Bearer " + token)
    
    return { nome, idade, id: resAutores.body.data.criaAutor.id }
}