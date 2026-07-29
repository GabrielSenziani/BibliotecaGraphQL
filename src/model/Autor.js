import mongoose from "mongoose";

const AutorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    }
})

const Autor = mongoose.model("Autor", AutorSchema)

export default Autor