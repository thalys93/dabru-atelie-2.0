import { useEffect, useState } from "react"
import { Badge, Container, Image, Nav, Navbar } from "react-bootstrap"
import { TiShoppingCart } from "react-icons/ti"

function NavigationBar() {
    const routeName = window.location.pathname

    const [isAboutRoute, setIsAboutRoute] = useState(false)
    const [isProductRoute, setIsProductRoute] = useState(false)
    const [isContactRoute, setIsContactRoute] = useState(false)
    const [fullCart, setFullCart] = useState(false)
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {  
        const interval = setInterval(() => {      
            const cart = localStorage.getItem('@carrinho')                 
            if (cart !== '[]') {
                setCartItems(JSON.parse(cart as never))
                setFullCart(true)
            } else {
                setFullCart(false)
            }            
        }, 950)
        return () => clearInterval(interval)
    }, [fullCart])

    const checkRouteName = (routeName: string) => {
        if (routeName === '/Sobre') {
            setIsAboutRoute(true)
        } else if (routeName === '/Produtos') {
            setIsProductRoute(true)
        } else if (routeName === '/Contato') {
            setIsContactRoute(true)
        } else {
            setIsAboutRoute(false)
            setIsProductRoute(false)
            setIsContactRoute(false)
        }
    }

    useEffect(() => {
        checkRouteName(routeName)
    }, [routeName])


    return (
        <Navbar expand="lg" className="bg-gray">
            <Container>
                <Navbar.Brand href="/" className="transition-all">
                    <Image src="/img/logo_branco.png" width={50} roundedCircle />
                </Navbar.Brand>
                <button className="bg-white p-1 rounded-full">
                    {fullCart ? (
                        <div className="flex flex-row gap-1">
                            <TiShoppingCart className="text-gray" size={20} />
                            <Badge bg="danger" className="text-white">{cartItems.length}</Badge>
                        </div>
                    ) : (
                        <TiShoppingCart className="text-gray" size={20} />
                    )}
                </button>

                <Navbar.Toggle aria-controls="navbar-nav" className="border-0 active:border-0" id="navbar-nav">
                    <i className='bi bi-list text-PJwhite' />
                </Navbar.Toggle>

                <Navbar.Collapse className="justify-end font-blinker text-PJwhite">
                    <Nav className="text-end font-blinker">
                        <Nav.Link href="/Sobre" className={!isAboutRoute ? "text-PJwhite hover:text-amber-200 transition-all hover:underline underline-offset-4" : "text-amber-200 "}>Sobre</Nav.Link>
                        <Nav.Link href="/Produtos" className={!isProductRoute ? "text-PJwhite hover:text-amber-200 transition-all hover:underline underline-offset-4" : "text-amber-200 "}>Produtos</Nav.Link>
                        <Nav.Link href="/Contato" className={!isContactRoute ? "text-PJwhite hover:text-amber-200 transition-all hover:underline underline-offset-4" : "text-amber-200 "}>Contato</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar