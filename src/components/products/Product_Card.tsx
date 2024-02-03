
import { Card } from 'react-bootstrap';
import { Product_Type } from '../../utils/api/product_api';
import { useEffect, useState } from 'react';

function Product_Card(props: Product_Type) {
    const [isAdded, setIsAdded] = useState(false)

    const handleAddToCart = () => {
        const cart = localStorage.getItem('@carrinho')
        if (cart) {
            const cartItems = JSON.parse(cart)
            cartItems.push(props)
            localStorage.setItem('@carrinho', JSON.stringify(cartItems))
        } else {
            localStorage.setItem('@carrinho', JSON.stringify([props]))
        }
    }

    const handleRemoveToCart = () => {
        const cart = localStorage.getItem('@carrinho')
        if (cart) {
            const cartItems = JSON.parse(cart)
            const newCartItems = cartItems.filter((item: Product_Type) => item.id !== props.id)
            localStorage.setItem('@carrinho', JSON.stringify(newCartItems))
        } else {
            localStorage.setItem('@carrinho', JSON.stringify([]))
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const cart = localStorage.getItem('@carrinho')
            if (cart) {
                const cartItems = JSON.parse(cart)
                const isAdded = cartItems.some((item: Product_Type) => item.id === props.id)
                setIsAdded(isAdded)
            }
        }, 950)
        return () => clearInterval(interval)
    }, [props])

    return (
        <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src={props.imgLink} className='h-72 object-cover' />
            <Card.Body>
                <Card.Title>{props.nome}</Card.Title>
                <Card.Text>
                    {props.sobre}
                </Card.Text>
                <Card.Text>
                    Preço: {props.valor} R$
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <div className="flex flex-row gap-2">
                    {isAdded ? (
                        <div className='flex gap-5'>
                            <div className='flex gap-2'>
                                <button className="btn btn-success" disabled>Adicionado</button>
                                <a href={`Produto/${props.id}/${props.nome}`}>
                                    <button className="btn btn-outline-dark">Detalhes</button>
                                </a>
                            </div>
                            <div>
                                <button className='btn btn-outline-danger' onClick={() => handleRemoveToCart()} > X </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <button className="btn btn-primary" onClick={() => handleAddToCart()}>Adicionar ao carrinho</button>

                            <a href={`Produto/${props.id}/${props.nome}`}>
                                <button className="btn btn-outline-dark">
                                    Detalhes
                                </button>
                            </a>
                        </>
                    )}
                </div>
            </Card.Footer>
        </Card>
    )
}

export default Product_Card