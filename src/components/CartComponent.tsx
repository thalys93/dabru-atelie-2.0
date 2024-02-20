
import { useEffect, useState } from 'react'
import { Badge, Card, Container } from 'react-bootstrap'
import { TiShoppingCart } from 'react-icons/ti'
import { Product_Type } from '../utils/api/product_api'
import { BiCheckCircle, BiInfoCircle, BiLeftArrow, BiRightArrow, BiTrash } from 'react-icons/bi'
import { BsXLg } from 'react-icons/bs'

function CartComponent() {
    const [fullCart, setFullCart] = useState(false)
    const [openCart, setOpenCart] = useState(false)
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        const interval = setInterval(() => {
            const cart = localStorage.getItem('@carrinho')
            if (cart !== '[]' && cart !== null) {
                setCartItems(JSON.parse(cart as never))
                setFullCart(true)
            } else {
                setFullCart(false)
            }
        }, 950)
        return () => clearInterval(interval)
    }, [fullCart])

    const handleOpenCart = () => {
        setOpenCart(!openCart)
    }
    
    const handleAddItem = (itemID: number | string) => {
        const updatedItems = cartItems.map((item: Product_Type) => {
            if (item.id === itemID) {
                item.quantidade += 1
                item.total = item.valor * item.quantidade
                return item
            } else {
                return item
            }
        })
        setCartItems(updatedItems as never)
        localStorage.setItem('@carrinho', JSON.stringify(updatedItems))
    };

    const handleRemoveItem = (itemID: number | string) => {
        const updatedItems = cartItems.map((item: Product_Type) => {
            if (item.id === itemID) {
                item.quantidade -= 1
                item.total = item.valor * item.quantidade
                return item
            } else {
                return item
            }
        })
        setCartItems(updatedItems as never)
        localStorage.setItem('@carrinho', JSON.stringify(updatedItems))
    };   

    const handleRemoveCartItem = (itemID: number | string) => {
        const updatedCartItems = cartItems.filter((item: Product_Type) => item.id !== itemID);
        setCartItems(updatedCartItems)
        localStorage.setItem('@carrinho', JSON.stringify(updatedCartItems))
    }

    return (
        <>
            {openCart ? (
                <div className='fixed bottom-0 right-1 flex flex-col items-center lg:items-end -mb-2 lg:mb-0 lg:m-3 animate__animated animate__fadeInUp'>
                    <div className='bg-PJwhite pt-2 pb-2 rounded-xl flex flex-col gap-2 shadow-lg'>
                        <div className='bg-stone-50 -mt-2 rounded-t-xl items-center'>
                            <div className='flex justify-between items-center'>
                                <button className='p-3 lg:p-2'>
                                    <BsXLg onClick={handleOpenCart} />
                                </button>

                                <h1 className='text-lg font-abel select-none'>Carrinho de Compras</h1>

                                <div className='mr-10'></div>

                            </div>
                        </div>
                        {cartItems.length === 0 ? (
                            <div className='bg-white p-2 rounded-lg'>
                                <p>Carrinho vazio</p>
                            </div>
                        ) : (
                            cartItems.map((item: Product_Type, i) => (
                                <Container>
                                    <Card className='flex flex-row items-center p-1 shadow-xl' key={i}>
                                        <Card.Img variant='left' src={item.details.imgLink || 'https://via.placeholder.com/150'} width={60} />
                                        <Card.Body>
                                            <Card.Text>{item.nome}</Card.Text>
                                            <Card.Text>
                                                R$ {item.total.toFixed(2)}
                                            </Card.Text>
                                        </Card.Body>

                                        <div className='flex flex-col items-center gap-1'>
                                            <a className='cursor-pointer' href={`Produto/${item.id}/${item.nome}`}><BiInfoCircle className='text-emerald-600' /></a>
                                            <button onClick={() => handleRemoveCartItem(item.id)}> <BiTrash className='text-red-500' /> </button>
                                            <div className='flex flex-row items-center gap-1 select-none'>
                                                <button onClick={() => handleRemoveItem(item.id)}> <BiLeftArrow /> </button>
                                                <span> {item.quantidade} </span>
                                                <button onClick={() => handleAddItem(item.id)}> <BiRightArrow /> </button>
                                            </div>
                                        </div>
                                    </Card>
                                </Container>
                            ))
                        )}
                        <div className='bg-stone-50 p-2 flex justify-between items-end rounded-t-lg'>
                            <div className='flex flex-col p-2 '>
                                <h1 className='text-sm font-abel text-stone-400'>
                                    Total:
                                </h1>
                                <h1 className='text-lg font-abel text-stone-700'>
                                    R$ {cartItems.reduce((acc: number, item: Product_Type) => acc + item.total, 0).toFixed(2)}
                                </h1>
                            </div>

                            <a href={`/Checkout`}>
                                <button className='bg-emerald-500 flex flex-row gap-1 items-center text-white p-2 border-[1.5px] rounded-lg hover:bg-emerald-400 transition-all duration-300'>
                                    <BiCheckCircle /> Finalizar compra
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='fixed bottom-0 right-1 justify-end items-end m-3'onClick={handleOpenCart} >
                    <button className='flex flex-row rounded-full bg-PJwhite p-2 border-transparent border-2 hover:border-gray transition-all duration-300 animate__animated animate__fadeInDown'>
                        <Badge bg='danger' className='absolute -right-1 top-0 text'>
                            <span>
                                {cartItems.length}
                            </span>
                        </Badge>
                        <TiShoppingCart size={30} className='text-gray' />
                    </button>
                </div>
            )
            }
        </ >
    )
}

export default CartComponent