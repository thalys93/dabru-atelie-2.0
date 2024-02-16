import { productData } from "./productData"

export interface Product_Type {
    id: number | string,
    nome: string,
    resume: string,
    valor: number,
    data_publicacao: string,
    imgLink: string,
    sobre: string,
    descricao: string,
    tipo: string,
    observacao: string,
    quantidade: number,
}

export interface colorType {
    id: number | string,
    cor: string,
}

export const getProducts = async () => {
    try {
        // await new Promise((resolve) => setTimeout(resolve, 2000))

        const products = productData

        if (products.length !== 0) {
            return products
        } else {
            throw new Error("Nenhum Produto Encontrado")
        }

    } catch (e) {
        console.log(e)
        throw new Error("Falha ao Buscar os Produtos")        
    }
}