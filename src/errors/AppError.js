import { GraphQLError } from "graphql";

export class AppError extends GraphQLError {
    constructor(message, code = "INTERNAL_ERROR", extra = {}) {
        super(message, {
            extensions: {
                code,
                ...extra
            }
        })
    }
}