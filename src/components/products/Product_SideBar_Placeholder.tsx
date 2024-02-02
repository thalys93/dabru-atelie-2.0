import { Container, ListGroup, Placeholder, Spinner } from "react-bootstrap"
import { placeholderData } from "./placeholderData"


function Product_Sidebar_Placeholder() {
    return (
        <Container className="justify-start content-start items-start ">
            <ListGroup variant="flush" className="w-60" as='ol'>
                <ListGroup.Item>
                    {placeholderData.map((i) => (
                        <div className="flex flex-row justify-center items-center gap-2 lg:ml-5">
                            <Placeholder xs={7} key={i} />
                            <div>
                                <Spinner animation="border" size="sm" variant="primary" />
                            </div>
                        </div>
                    ))}
                </ListGroup.Item>
            </ListGroup>
        </Container>
    )
}

export default Product_Sidebar_Placeholder