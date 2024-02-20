
import { Card, Placeholder } from 'react-bootstrap';
export const imgPlaceholder = "/img/placeholder.jpg"

function Product_Card_placeholder() {    
    return (
        <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src={imgPlaceholder} className='h-72 object-cover animate-pulse' />
            <Card.Body>
                <Placeholder as={Card.Title} animation='wave'>
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation='wave'>        
                    <Placeholder xs={7} /> 
                    <Placeholder xs={4} /> 
                    <Placeholder xs={4} /> 
                    <Placeholder xs={6} />                     
                </Placeholder>
                <Placeholder as={Card.Text} animation='wave'>        
                    <Placeholder xs={2} />                                      
                </Placeholder>
            </Card.Body>
            <Card.Footer>
                <div className="flex flex-row gap-2">
                    <Placeholder.Button variant='primary' xs={4} aria-hidden="true"/>
                    <Placeholder.Button variant='secondary'xs={4} aria-hidden="true"/>
                </div>
            </Card.Footer>
        </Card>
    )
}

export default Product_Card_placeholder