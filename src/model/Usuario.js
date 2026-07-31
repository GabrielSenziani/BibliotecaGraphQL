import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    }
})

const Usuario = mongoose.model("Usuario", UsuarioSchema)

export default Usuario
