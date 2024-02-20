import { useEffect, useState } from 'react'
import { Badge, Col, Container, Figure, ListGroup, Row } from 'react-bootstrap'
import { Product_Type } from '../../utils/api/product_api'
import { BiInfoCircle, BiLeftArrow, BiRightArrow, BiTrash } from 'react-icons/bi'

function CheckoutResume() {

  const [cartItems, setCartItems] = useState([])
  useEffect(() => {
    const interval = setInterval(() => {
      const cart = localStorage.getItem('@carrinho')
      if (cart !== '[]' && cart !== null) {
        setCartItems(JSON.parse(cart as never))
      }
    }, 950)
    return () => clearInterval(interval)
  }, [cartItems])

  const handleRemoveCartItem = (itemID: number | string) => {
    const updatedCartItems = cartItems.filter((item: Product_Type) => item.id !== itemID);
    setCartItems(updatedCartItems)
    localStorage.setItem('@carrinho', JSON.stringify(updatedCartItems))
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

  return (
    <Container>
      <Row>
        <Col className='overflow-y-auto' sm>
          <ListGroup className="flex flex-col flex-shrink-0 h-[23.2rem]">
            {cartItems.map((item: Product_Type) => (
              <ListGroup.Item key={item.id} className="flex flex-row justify-between items-center">
                <Figure className='flex flex-row items-center gap-2'>
                  <div className='flex flex-row items-start gap-2'>
                  <Badge bg="secondary" className='text-stone-300 absolute left-[1px] -top-[1px]'>{item.quantidade}x</Badge>
                  <a href={`Produto/${item.id}/${item.nome}`} target='_blank'>
                    <Figure.Image
                      width={60}
                      height={60}
                      alt="50x50"
                      src={item.details.imgLink || "https://via.placeholder.com/50"}
                      rounded
                    />
                  </a>
                  </div>
                  <Figure.Caption className='w-24 lg:w-auto'>
                    <span className='text-md lg:text-lg'>{item.details.resume}</span>
                  </Figure.Caption>
                </Figure>
                <div className='flex flex-col justify-center items-center gap-1'>
                  <div className='flex flex-row gap-2'>
                    <a className='cursor-pointer hover:scale-105 transition-all duration-150' href={`Produto/${item.id}/${item.nome}`} target='_blank'><BiInfoCircle className='text-emerald-600 hover:text-emerald-300 transition-all duration-100' /></a>
                    <button onClick={() => handleRemoveCartItem(item.id)} className='hover:scale-105 transition-all duration-150'> <BiTrash className='text-red-500 hover:text-red-300 transition-all duration-100' /> </button>
                  </div>
                  <div className='flex flex-row items-center gap-1 select-none'>
                    <button onClick={() => handleRemoveItem(item.id)}> <BiLeftArrow className='text-stone-500' /> </button>
                    {/* <span className='select-none text-sm text-stone-400'> {item.quantidade}x </span> */}
                    <p className='select-none text-lg text-emerald-500 font-abel font-semibold'>{item.total} R$ </p>
                    <button onClick={() => handleAddItem(item.id)}> <BiRightArrow className='text-stone-500' /> </button>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <ListGroup>
          <ListGroup.Item className="flex flex-row justify-between items-center">
            <span className='text-md lg:text-lg'>Total</span>
            <p className='select-none'>{cartItems.reduce((acc: number, item: Product_Type) => acc + item.total, 0).toFixed(2)} R$</p>
          </ListGroup.Item>
        </ListGroup>
      </Row>
    </Container>
  )
}

export default CheckoutResume