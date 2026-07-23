import mongoose from "mongoose";

const LivroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    }
})

const Livro = mongoose.model("Livro", LivroSchema)

export default Livro