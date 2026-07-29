import mongoose from "mongoose";
import { ValidationError } from "../errors/ValidationError.js"

export function validaId (id, entidade) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const mensagem = `O ID "${id}" da ${entidade} é inválido`
        throw new ValidationError(mensagem)
    }
}