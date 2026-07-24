import mongoose from "mongoose";

const LivroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Autor"
    }
})

const Livro = mongoose.model("Livro", LivroSchema)

export default Livro