import { productData } from "./productData"

export interface Product_Type {
    id: number | string,
    nome: string,
    details: ProductDetails,
    valor: number,
    data_publicacao: string,
    descricao: string,
    quantidade: number,
    total: number,
}

interface ProductDetails {    
    resume: string,  
    imgLink: string,
    sobre: string,
    observacao: string,
    tipo:string,
    delivery: boolean,
    dimX: number,
    dimY: number,    
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