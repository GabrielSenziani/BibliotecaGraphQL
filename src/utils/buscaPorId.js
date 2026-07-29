import mongoose from "mongoose";
import { NotFoundError } from "../errors/NotFoundError.js";
import { validaId } from "./validarObjectId.js";

export async function buscarPorId (Model, id, entidade) {
    validaId(id, entidade)

    const documento = await Model.findById(id)

    if (!documento) {
     throw new NotFoundError(entidade, id)
    }

    return documento
}