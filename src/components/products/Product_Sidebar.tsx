import { useState } from "react"
import { Badge, Container, ListGroup } from "react-bootstrap"

interface sideBarProps {
    tipo: string
    index: number
    items: number
    onTipoChange: (tipo: string) => void
}

function Product_Sidebar(props: sideBarProps) {
    const [clicked, setClicked] = useState(false)

    const handleSetItemFilter = (tipo: string) => {
        props.onTipoChange(tipo)
        setClicked(true)
    }

    const handleRemoveFilter = () => {
        props.onTipoChange('')
        setClicked(false)
    }
    return (
        <Container className="justify-start content-start items-start ">
            <ListGroup variant="flush" className="w-60" as='ol'>
                <ListGroup.Item className="flex justify-between align-middle">
                    <div onClick={() => handleSetItemFilter(props.tipo)} className="hover:cursor-pointer hover:text-stone-300 transition-all duration-300">
                        {props.index}. {props.tipo}
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <Badge bg="primary" className="rounded-full items-center">
                            {props.items}
                        </Badge>
                        {clicked ? (
                            <Badge bg="danger" className="rounded-full items-center hover:cursor-pointer" onClick={handleRemoveFilter}>
                                X
                            </Badge>
                        ) : null}
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Container>
    )
}

export default Product_Sidebar