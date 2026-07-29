import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
 constructor (entidade, id) {
    super(`${entidade} com id "${id}" não encontrado`, "NOT_FOUND")
 }
}