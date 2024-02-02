import { Container, Form, InputGroup } from 'react-bootstrap'
import { GoSearch } from "react-icons/go";


interface ProductSearchBarProps {
    queryText: string;
    onSearchItem: (query: string) => void;
}

function Product_SearchBar(props: ProductSearchBarProps) {
  const handleSearch = (query: string) => {
    props.onSearchItem(query)
  }

  return (
    <Container fluid>
        <InputGroup>             
            <InputGroup.Text>
                <GoSearch />
            </InputGroup.Text>
            <Form.Control type="text" onChange={(e) => handleSearch(e.target.value)} placeholder='Pesquisar Produtos'/>
        </InputGroup>
    </Container>
  )
}

export default Product_SearchBar