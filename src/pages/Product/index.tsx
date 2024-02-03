import { Col, Container, Navbar, Row } from "react-bootstrap"
import Product_SearchBar from "../../components/products/Product_SearchBar"
// import Product_Sidebar from "../../components/products/Product_Sidebar"
import React, {useEffect, useState } from "react"
import { Product_Type, getProducts } from "../../utils/api/product_api";
import Product_Card_placeholder from "../../components/products/Product_Card_placeholder";
import Product_Sidebar_Placeholder from "../../components/products/Product_SideBar_Placeholder";
import { placeholderData } from "../../components/products/placeholderData";
// import Product_Card from "../../components/products/Product_Card";
const Product_Sidebar = React.lazy(() => import('../../components/products/Product_Sidebar'))
const Product_Card = React.lazy(() => import('../../components/products/Product_Card'))


function Product() {

  const [originalProducts, setOriginalProducts] = useState([] as Product_Type[]);
  const [products, setProducts] = useState([] as Product_Type[]);
  const [productCounts, setProductCounts] = useState({} as { [key: string]: number });
  const [filterType, setFilterType] = useState('');
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);


  const handleFilterByType = (tipo: string) => {
    setFilterType(tipo)
  }

  const handleFilterByText = (text: string) => {
    setFilterText(text)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const response = await getProducts();

      if (response !== null && response !== undefined) {
        setOriginalProducts(response as never);
        setProducts(response as never);
        setLoading(false);

      } else {
        console.error('Erro ao buscar produtos');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let filteredProducts = [...originalProducts];

      if (filterType !== '') {
        filteredProducts = filteredProducts.filter(pr => pr.tipo === filterType);
      }

      if (filterText !== '') {
        filteredProducts = filteredProducts.filter(pr => pr.nome.toLowerCase().includes(filterText.toLowerCase()));
      }

      setProducts(filteredProducts);
    };

    filterProducts();
  }, [filterType, filterText, originalProducts]);

  useEffect(() => {
    const groupedProducts = originalProducts.reduce((acc, curr) => {
      if (acc[curr.tipo]) {
        acc[curr.tipo] += 1;
      } else {
        acc[curr.tipo] = 1;
      }
      return acc;
    }, {} as { [key: string]: number });

    setProductCounts(groupedProducts);
  }, [originalProducts]);


  const SideBarComponent = <Navbar expand="lg">
    <Navbar.Toggle aria-controls="sidebar-nav" className="border-0 active:border-0" id="sidebar-nav" />
    <Navbar.Collapse className="flex flex-col justify-start font-blinker text-PJwhite">
      <h1 className="text-2xl text-gray font-bold select-none">Categorias</h1>
      <div className="line"></div>
      {loading ? (
        <Product_Sidebar_Placeholder/>
      ) : (
        Object.entries(productCounts).map(([tipo, count], i) => (
          <Product_Sidebar
            tipo={tipo}
            key={i}
            index={i + 1}
            items={count}
            onTipoChange={handleFilterByType}
          />
        ))
      )}
    </Navbar.Collapse>
  </Navbar>;

  const Products_List = <Container fluid className="flex sm:justify-center sm:items-center sm:mt-5 lg:mt-0 flex-col lg:flex-row flex-wrap gap-3">
    {loading ? (   
      placeholderData.map((i) => (
        <Product_Card_placeholder key={i}/>
      ))   
    ) : (
      products.map((pr, i) => (
        <Product_Card
          key={i}
          nome={pr.nome}
          valor={pr.valor}
          sobre={pr.sobre}
          imgLink={pr.imgLink}
          id={pr.id}
          data_publicacao={pr.data_publicacao}
          tipo={pr.tipo}
          descricao={pr.descricao}
          resume={pr.resume}
          observacao={pr.observacao}
          />
      ))
    )}
  </Container>;

  return (
    <Container>
      <Row>
        <section className="mt-3 mb-3">
          <Product_SearchBar queryText='' onSearchItem={handleFilterByText} />
        </section>
        <Col sm className="lg:flex bg-white p-3">
          <div className="flexflex-col">
            {SideBarComponent}
          </div>
          <div>
            {Products_List}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Product