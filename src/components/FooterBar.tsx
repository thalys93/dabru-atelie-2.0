import { Container, Image } from "react-bootstrap"

function FooterBar() {
    return (
        <Container fluid>
            <footer>
                <div className="flex flex-col gap-3 justify-center items-center pt-5 pb-5 lg:pt-10 lg:pb-10">
                    <Image src="/img/footer_logo.png" height={120} width={120} />
                    <p className="text-stone-400 opacity-40 text-xs lg:text-sm select-none">© 2021 Dabru Ateliê. Todos os direitos reservados.</p>                
                </div>
            </footer>
        </Container>
    )
}

export default FooterBar