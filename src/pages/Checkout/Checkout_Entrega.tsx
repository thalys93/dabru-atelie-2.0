import { BiLeftArrowCircle } from "react-icons/bi"
import NavigationBar from "../../components/NavigationBar"
import { Col, Container, FloatingLabel, Form, InputGroup, Row } from "react-bootstrap"
import { BsBoxSeam, BsBuilding, BsCalendar3Event, BsEnvelopeAt, BsPeople, BsPerson } from "react-icons/bs"
import { useState } from "react";

function Checkout_Entrega() {

    const [ddd] = useState<number>(55);

    // const [phone, setPhone] = useState<number>('');        

    return (
        <>
            <NavigationBar />
            <Container>
                <Row className="bg-white rounded-lg">
                    <Col>
                        <a className="flex flex-row gap-1 items-center text-gray text-md font-blinker m-1" href="/Produtos">
                            <BiLeftArrowCircle /> Voltar para Produtos
                        </a>
                        <section>
                            <h1 className="text-gray text-3xl font-blinker font-light"> Checkout </h1>
                            <span className="text-stone-400 font-blinker font-light"> Preencha com seus dados e escolha a forma de pagamento desejada. </span>
                            <div className="bg-stone-400 w-full h-[1.3px] mt-2 mb-2"></div>

                            <article>
                                <h3 className="text-gray font-blinker font-light"> 1. Informações de Contato </h3>
                                <div className="pt-2 pb-2">
                                    <Row>
                                        <Col sm>
                                            <Form.Group>
                                                <InputGroup>
                                                    <InputGroup.Text className="border-stone-200 rounded-xl"><BsPerson className="text-gray" /></InputGroup.Text>
                                                    <FloatingLabel label="Primeiro Nome">
                                                        <Form.Control type="text" className="border-stone-200 rounded-xl" />
                                                    </FloatingLabel>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>

                                        <Col sm lg="5">
                                            <Form.Group>
                                                <InputGroup>
                                                    <InputGroup.Text className="border-stone-200 rounded-xl"><BsPeople className="text-gray" /></InputGroup.Text>
                                                    <FloatingLabel label="Sobrenome">
                                                        <Form.Control type="text" className="border-stone-200 rounded-xl" />
                                                    </FloatingLabel>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm lg="5">
                                            <Form.Group className="mt-3">
                                                <InputGroup>
                                                    <InputGroup.Text className="border-stone-200 rounded-xl"> <span className="fi fi-br mr-1"></span> +{ddd} </InputGroup.Text>
                                                    <FloatingLabel label="Telefone">
                                                        <Form.Control type="text" className="border-stone-200 rounded-xl" />
                                                    </FloatingLabel>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>

                                        <Col sm>
                                            <Form.Group className="mt-3">
                                                <InputGroup>
                                                    <InputGroup.Text className="border-stone-200 rounded-xl"><BsEnvelopeAt className="text-gray" /></InputGroup.Text>
                                                    <FloatingLabel label="E-mail">
                                                        <Form.Control type="email" className="border-stone-200 rounded-xl" />
                                                    </FloatingLabel>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                            </article>
                            <article className="pt-3">
                                <h3 className="text-gray font-blinker font-light"> 2. Informações de Entrega </h3>
                                <div className="pt-2 pb-2">
                                    <Row>
                                        <Col sm>
                                            <Form.Group>
                                                <InputGroup>
                                                    <InputGroup.Text className="border-stone-200 rounded-xl"><BsBoxSeam className="text-gray" /></InputGroup.Text>
                                                    <FloatingLabel label="CEP">
                                                        <Form.Control type="text" className="border-stone-200 rounded-xl" />
                                                    </FloatingLabel>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>

                                        <Col sm lg="4">
                                            <Form.Group>
                                                <InputGroup>
                                                    <InputGroup.Text className="border-stone-200 rounded-xl"><BsBuilding className="text-gray" /></InputGroup.Text>
                                                    <FloatingLabel label="Endereço">
                                                        <Form.Control type="text" className="border-stone-200 rounded-xl" />
                                                    </FloatingLabel>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>

                                        <Col sm lg="3">
                                            <Form.Group>
                                                <InputGroup>
                                                    <InputGroup.Text className="border-stone-200 rounded-xl"><BsCalendar3Event className="text-gray" /></InputGroup.Text>
                                                    <FloatingLabel label="Número">
                                                        <Form.Control type="text" className="border-stone-200 rounded-xl" />
                                                    </FloatingLabel>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="mt-2">
                                        <Col sm lg="5">
                                            <Form.Group>
                                                <InputGroup>
                                                    <InputGroup.Text className="border-stone-200 rounded-xl"><BsBoxSeam className="text-gray" /></InputGroup.Text>
                                                    <FloatingLabel label="Complemento">
                                                        <Form.Control type="text" className="border-stone-200 rounded-xl" />
                                                    </FloatingLabel>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>

                                        <Col sm lg="4">
                                            <Form.Group>
                                                <InputGroup>
                                                    <InputGroup.Text className="border-stone-200 rounded-xl"><BsBoxSeam className="text-gray" /></InputGroup.Text>
                                                    <FloatingLabel label="Bairro">
                                                        <Form.Control type="text" className="border-stone-200 rounded-xl" />
                                                    </FloatingLabel>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                            </article>
                            <article className="pt-3">
                                <h3 className="text-gray font-blinker font-light">3. Forma de Pagamento</h3> 
                                <div className="pt-2 pb-2">
                                    
                                </div>
                            </article>

                        </section>
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Checkout_Entrega