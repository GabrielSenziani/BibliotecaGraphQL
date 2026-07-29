import mongoose from "mongoose";
import "dotenv/config"

export async function connectionDB () {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Conectado ao banco de dados")
}