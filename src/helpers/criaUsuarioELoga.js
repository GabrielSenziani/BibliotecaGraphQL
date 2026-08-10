import supertest from "supertest";
import app from "../app.js";


export async function criaUsuarioELogar(email, senha) {
    await supertest(app)
    .post("/graphql")
    .send({query: `mutation { cadastrar(email: "${email}", senha: "${senha}") {id email} }`})

    const resLogin = await supertest(app)
        .post("/graphql")
        .send({ query: `mutation{ login(email: "${email}", senha: "${senha}") {token} }` })
       
       const token = resLogin.body.data.login.token

    return { email, senha, token }
}