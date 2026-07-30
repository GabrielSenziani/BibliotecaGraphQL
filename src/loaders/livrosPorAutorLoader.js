import Livro from "../model/Livro.js";

export async function buscaLivrosPorAutor (ids) {
    const livro = await Livro.find({
        autor:{
            $in: ids
        }
    })
    return ids.map(id => {
        return livro.filter(livro => livro.autor.toString() === id.toString())
    }) 
}