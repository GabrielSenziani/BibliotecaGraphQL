import supertest from "supertest";
import app from "../app.js";


export async function criaUsuarioELogar(email, senha) {
    const dadosDoCadastro = await supertest(app)
    .post("/graphql")
    .send({query: `mutation { cadastrar(email: "${email}", senha: "${senha}") {id email} }`})

    const id = dadosDoCadastro.body.data.cadastrar.id

    const resLogin = await supertest(app)
        .post("/graphql")
        .send({ query: `mutation{ login(email: "${email}", senha: "${senha}") {token} }` })
       
       const token = resLogin.body.data.login.token

    return { email, senha, token, id }
}