import { Col, Container, Row } from "react-bootstrap"
import { FaPlusCircle, FaShoppingCart } from "react-icons/fa"


function Home() {
  return (
    <Container>
      <Row>
        <Col sm>
          <section className="prose-lg lg:prose-lg mt-16 pb-28 lg:mt-28 lg:mb-0">
            <div className="flex flex-col justify-center items-center select-none">
              <h1 className="font-bebas text-gray font-light"> Dabru <br /> Ateliê </h1>
              <div className="line"></div>
            </div>
            <div className="text-center">
              <h3 className="font-abel text-gray font-regular select-none">
                Descobri no crochê a paixão por <b>artes</b> <br />
                <b>Manuais</b> e hoje transformei meu <br />
                hobbie em <b>trabalho</b>
              </h3>
            </div>
            <div className="flex flex-row gap-3 justify-center items-center">
              <a href="/Sobre">
                <button className="grayBTN font-bebas">
                  <FaPlusCircle className="mb-1" /> Conheça
                </button>
              </a>
              <a href="/Produtos">
                <button className="grayBTN font-bebas">
                  <FaShoppingCart className="mb-1" /> Produtos
                </button>
              </a>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default Home