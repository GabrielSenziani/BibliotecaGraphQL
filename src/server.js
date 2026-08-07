import app from "./app.js";
import { connectionDB } from "./connection/database.js";

await connectionDB()

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
