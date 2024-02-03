import { useEffect, useState } from "react"
import { Card, Col, Container, Figure, Row } from "react-bootstrap"
import { Product_Type, colorType, getProducts } from "../../utils/api/product_api"
import { BsBackpack } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import { CiRuler, CiShoppingBasket, CiBoxes } from "react-icons/ci";
import { colorData } from "../../utils/api/colorData";




function Product_Info() {

  const routeNameID = window.location.pathname.split('/')[2]
  const routeProductName = window.location.pathname.split('/')[3]
  const [product, setProduct] = useState([] as Product_Type[])
  const [allItems, setAllItems] = useState([] as Product_Type[])
  const [colors, setColors] = useState([] as colorType[])
  const [isAdded, setIsAdded] = useState(false)

  const truncateResume = (resume: string) => {
    if (resume.length > 20) {
      return resume.slice(0, 20) + "..."
    } else {
      return resume
    }
  }

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const colorsData = colorData;
        setColors(colorsData as never);
      } catch (e) {
        console.log(e);
      }
    }
    fetchColors();
  }, [colors])

  useEffect(() => {
    const interval = setInterval(() => {
      const cart = localStorage.getItem('@carrinho')
      if (cart) {
        const cartItems = JSON.parse(cart)
        const product = cartItems.find((item: Product_Type) => item.id === parseInt(routeNameID, 10))
        const isAdded = cartItems.some((item: Product_Type) => item.id === product.id)
        setIsAdded(isAdded)
      }
    }, 950)
    return () => clearInterval(interval)
  }, [product, routeNameID, isAdded])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRes = await getProducts();
        setAllItems(productRes as never);

        const filteredProduct = productRes?.find((product: Product_Type) => product.id === parseInt(routeNameID, 10));
        if (allItems) {
          allItems.map((pr) => pr.resume = truncateResume(pr.nome))
        }

        if (filteredProduct) {
          setProduct([filteredProduct] as never[]);
        } else {
          console.log("Nenhum produto encontrado com o ID fornecido.");
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchProduct();
  }, [routeNameID, allItems]);

  return (
    <Container>
      {product.map((pr) => (
        <Row key={pr.id} className="bg-PJwhite p-2 lg:p-5 mt-4 gap-3">
          <Col sm>
            <Row>
              <div className="flex flex-col lg:flex-row bg-white rounded-b-lg items-center">
                <Col className="flex flex-col justify-center items-center">
                  <h4 className="font-bebas text-xl text-gray mt-2 mb-2"> Detalhes da Bolsa </h4>
                  <Figure className="border-2 border-opacity-15 border-gray rounded-lg shadow-lg shadow-gray mb-2">
                    <Figure.Image src={pr.imgLink || '/img/placeholder.jpg'} className="h-80 object-cover rounded-t-lg" />
                  </Figure>
                </Col>
                {product_details(pr)}
              </div>
            </Row>
          </Col>
          <Col sm>
            {product_information(pr, colors as never, isAdded, routeProductName)}
          </Col>
        </Row>
      ))}
      <Row>
        <Col className="bg-PJwhite">
          <h4 className="font-bebas text-xl text-gray mt-2 mb-2 text-center"> Produtos Relacionados </h4>
          <hr />
          <div className="flex flex-row gap-2 items-center justify-center mt-2 bg-white p-4 overflow-x-auto animate__animated animate__fadeIn">
            {allItems.map((pr, i) => (
              <Row key={i}>
                <div className="flex-shrink-0 w-32 lg:w-40 mr-3">
                  <Card className="hover:scale-95 transition-transform duration-100">
                    <Card.Img variant="top" src={pr.imgLink || '/img/placeholder.jpg'} alt={pr.nome} className="h-40 object-cover" />
                    <Card.Body className="flex flex-col justify-center items-center">
                      <Card.Title className="font-abel text-lg font-light select-none">
                        {pr.resume}
                      </Card.Title>
                      <a href={`/Produto/${pr.id}/${pr.nome}`}>
                        <button className="btn btn-primary hover:scale-95 transition-transform duration-100"> Ver Mais </button>
                      </a>
                    </Card.Body>
                  </Card>
                </div>
              </Row>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Product_Info

function product_details(pr: Product_Type) {
  return (
    <div className="flex flex-col gap-3 justify-start">
      <div className="flex flex-row gap-2 items-center p-2">
        <BsBackpack size={30} />
        <span className="font-abel text-xl font-light select-none w-40">
          {pr.nome}
        </span>
      </div>
      <hr />

      <div className="flex flex-row gap-2 justify-between items-center">
        <div className="flex flex-row gap-1">
          <CiRuler size={20} />
          <span> Dim X : 5cm</span>
        </div>

        <div className="flex flex-row gap-1">
          <CiRuler size={20} />
          <span> Dim Y : 5cm</span>
        </div>
      </div>

      <hr />

      <div className="flex flex-row gap-2 justify-between items-center">
        <div className="flex flex-row gap-1">
          <CiBoxes size={20} />
          <span> Tipo : {pr.tipo}</span>
        </div>

        <div className="flex flex-row gap-1">
          <CiShoppingBasket size={20} />
          <span> Pronta : Sim </span>
        </div>
      </div>

      <hr />
      <div className="flex flex-row gap-2 items-center p-2">
        <MdOutlineAttachMoney size={25} />
        <span className="font-abel text-lg font-light select-none">
          Preço unitário: R$ {pr.valor.toFixed(2)}
        </span>
      </div>
    </div>
  )
}

function product_information(pr: Product_Type, colors: colorType[], isAdded: boolean = false, routeProductName: string) {

  const handleSendWhatsapp = (product: Product_Type, routeProductName: string) => {
    const message = encodeURIComponent(
      `> Atendimento Dabru Ateliê \n` +
      "\n" +
      `Olá Tudo bem? , gostaria de saber sobre o produto\n` +
      "\n" +
      `- 📄 Nome: *${product.nome}*\n` +
      `- 💰 Valor: *${product.valor.toFixed(2)} Reais*\n` +
      `- 📋 Código: *#${product.id}*\n` +
      `- 🌐 Link: http://192.168.100.66:5173/Produto/${product.id}/${routeProductName}`
    )
    // const phone = "555191597882";
    const phone_dev = "555191485593"
    // const phone_dev_2 ="555193284665"
    window.open(`https://api.whatsapp.com/send?phone=${phone_dev}&text=${message}`, '_blank');
  }

  
  const handleAddToCart = () => {
    const cart = localStorage.getItem('@carrinho')
    if (cart) {
        const cartItems = JSON.parse(cart)
        cartItems.push(pr)
        localStorage.setItem('@carrinho', JSON.stringify(cartItems))
    } else {
        localStorage.setItem('@carrinho', JSON.stringify([pr]))
    }
}

  return (
    <Row className="flex flex-col bg-white rounded-b-lg items-center">
      <Col>
        <div>
          <h4 className="font-bebas text-xl text-gray mt-2 mb-2 text-center"> Informações do Produto </h4>
          <hr />
          <p className="font-abel text-lg  font-light select-none p-2">
            {pr.descricao}
          </p>
        </div>
        <div>
          <h4 className="font-bebas text-xl text-gray mt-2 mb-2 text-center"> Cores Disponíveis </h4>
          <hr />

          <ul className="p-2 flex flex-row flex-wrap items-center gap-3 justify-center">
            {colors.map((color, i) => (
              <li key={i} className={`aspect-square w-16 rounded-full shadow-md hover:scale-95 transition-transform duration-200`}
                style={{ backgroundColor: color.cor, boxShadow: "0 2px 2px 2px " + color.cor }}
              ></li>
            ))}
          </ul>

          <div>
            <h4 className="font-bebas text-xl text-gray mt-2 mb-2 text-center"> Observações </h4>
            <hr />
            <p className="font-abel text-lg font-light select-none p-2 text-center">
              {pr.observacao}
            </p>
          </div>
        </div>
      </Col>

      <Col sm className="flex flex-row justify-center items-center gap-3 p-2">
        {isAdded ? (
          <button className="btn btn-outline-danger" disabled> Adicionado </button>
        ) : (
          <button className="btn btn-outline-primary" onClick={() => handleAddToCart()}> Adicionar </button>
        )}
        <button className="btn btn-outline-success" onClick={() => handleSendWhatsapp(pr, routeProductName)}> Whatsapp </button>
      </Col>
    </Row>
  )
}
