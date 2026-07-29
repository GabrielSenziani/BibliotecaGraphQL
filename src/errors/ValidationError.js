import { AppError } from "./AppError.js";

export class ValidationError extends AppError {
    constructor(message) {
        super(message, "BAD_USER_INPUT")
    }
}