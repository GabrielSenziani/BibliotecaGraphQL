import supertest from "supertest";
import app from "../app.js";


export async function criaUsuarioELogar(email, senha) {
    const dadosDoCadastro = await supertest(app)
    .post("/graphql")
    .send({query: `mutation { cadastrar(email: "${email}", senha: "${senha}") {id email} }`})

    if (dadosDoCadastro.body.errors || !dadosDoCadastro.body.data?.cadastrar) {
        console.error("Erro no GraphQL ao CADASTRAR usuário:", email);
        console.error(JSON.stringify(dadosDoCadastro.body.errors || dadosDoCadastro.body, null, 2));
        throw new Error(`Falha no cadastro do usuário de testes (${email}).`);
    }

    const id = dadosDoCadastro.body.data.cadastrar.id

    const resLogin = await supertest(app)
        .post("/graphql")
        .send({ query: `mutation{ login(email: "${email}", senha: "${senha}") {token} }` })
       
    if (resLogin.body.errors || !resLogin.body.data?.login) {
        console.error("Erro no GraphQL ao LOGAR usuário:", email);
        console.error(JSON.stringify(resLogin.body.errors || resLogin.body, null, 2));
        throw new Error(`Falha no login do usuário de testes (${email}).`);
    }

       const token = resLogin.body.data.login.token

    return { email, senha, token, id }
}