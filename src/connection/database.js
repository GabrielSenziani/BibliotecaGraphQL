import mongoose from "mongoose";
import dotenv from "dotenv"

const arquivoEnv = process.env.NODE_ENV === "test" ? ".env.test" : ".env"
dotenv.config({ path: arquivoEnv })

export async function connectionDB () {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Conectado ao banco de dados")
}