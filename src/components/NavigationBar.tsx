import { useEffect, useState } from "react"
import { Container, Image, Nav, Navbar } from "react-bootstrap"

function NavigationBar() {
    const routeName = window.location.pathname

    const [isAboutRoute, setIsAboutRoute] = useState(false)
    const [isProductRoute, setIsProductRoute] = useState(false)
    const [isContactRoute, setIsContactRoute] = useState(false)
    const [imgSrc, setImgSrc] = useState('/img/logo_branco.png')
    const [hovered, setHovered] = useState(false)

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

    const handleMouseIN = () => {
        setImgSrc('/img/logo_invertido.png')
        setHovered(true)
    }

    const handleMouseOUT = () => {
        setHovered(false)
        setImgSrc('/img/logo_branco.png')
    }


    return (
        <Navbar expand="lg" className="bg-gray">
            <Container>
                <Navbar.Brand href="/" className={!hovered? "transition-all animate__animated" : "animate__animated animate__fadeIn transition-all"}>
                    <Image src={imgSrc} width={50} roundedCircle onMouseOver={handleMouseIN} onMouseOut={handleMouseOUT}/>
                </Navbar.Brand>
                
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