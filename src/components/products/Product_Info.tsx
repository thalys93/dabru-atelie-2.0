import { useEffect, useState } from "react"
import { Col, Container, Figure, Row } from "react-bootstrap"
import { Product_Type, getProducts } from "../../utils/api/product_api"
import { BsBackpack } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import { CiRuler, CiShoppingBasket, CiBoxes } from "react-icons/ci";




function Product_Info() {

  const routeNameID = window.location.pathname.split('/')[2]
  const [product, setProduct] = useState([] as Product_Type[])
  const [allItems, setAllItems] = useState([] as Product_Type[])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRes = await getProducts();
        setAllItems(productRes as never);

        const filteredProduct = productRes?.find((product: Product_Type) => product.id === parseInt(routeNameID, 10));

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
        <Row key={pr.id} className="bg-PJwhite p-5 mt-4">
          <Col sm>
            <Figure className="border-2 border-opacity-15 border-gray p-2 rounded-lg shadow-lg shadow-gray">
              <h4 className="font-bebas text-xl text-gray text-center"> Detalhes da Bolsa </h4>
              <Figure.Image src={pr.imgLink || '/img/placeholder.jpg'} className="h-72 object-cover rounded-t-lg" />
              <Figure.Caption className="bg-white rounded-b-lg ">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row gap-2 items-center p-2">
                    <BsBackpack size={30} />
                    <span className="font-abel text-xl font-light select-none w-40">
                      {pr.nome}
                    </span>
                  </div>
                  <hr />

                  <div className="flex flex-row gap-2 justify-center items-center">
                    <div className="flex flex-row gap-1">
                      <CiRuler size={20} />
                      <span> Dim X : 5cm</span>
                    </div>
                    |
                    <div className="flex flex-row gap-1">
                      <CiRuler size={20} />
                      <span> Dim Y : 5cm</span>
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 justify-around items-center">
                    <div className="flex flex-row gap-1">
                      <CiBoxes  size={20} />
                      <span> Tipo : {pr.tipo}</span>
                    </div>  

                    <div className="flex flex-row gap-1">
                      <CiShoppingBasket size={20} />
                      <span> Pronta : Sim </span>
                      </div>      
                  </div>

                  <div className="flex flex-row gap-2 items-center p-2">
                    <MdOutlineAttachMoney size={25} />
                    <span className="font-abel text-lg font-light select-none">
                      Preço unitário: R$ {pr.valor.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Figure.Caption>
            </Figure>
          </Col>

          <Col sm>

          </Col>
        </Row>
      ))}
    </Container>
  )
}

export default Product_Info