import { BiLeftArrowCircle, BiX, BiXCircle } from "react-icons/bi"
import NavigationBar from "../../components/NavigationBar"
import { CloseButton, Col, Container, FloatingLabel, Form, Image, InputGroup, Modal, Row, Spinner } from "react-bootstrap"
import { BsBoxSeam, BsBuilding, BsCalendar3Event, BsEnvelopeAt, BsGift, BsPeople, BsPerson, BsWhatsapp } from "react-icons/bs"
import { FormEvent, useEffect, useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import CheckoutResume from "../../components/checkout/CheckoutResume";
import { Product_Type } from "../../utils/api/product_api";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";


interface CheckoutData {
    name: string;
    lastName: string;
    phone: string;
    email: string;
    cep: string;
    address: string;
    number: string;
    complement: string;
    neighborhood: string;
    paymentForm: string;
    preventDefault: () => void;
}

function Checkout_Entrega() {

    // First part of form
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [ddd] = useState<number>(55);
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    // Second part of form
    const [cep, setCep] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [complement, setComplement] = useState<string>('');
    const [neighborhood, setNeighborhood] = useState<string>('');


    // Third part of form
    const [paymentForm, setPaymentForm] = useState<string>('ñ selecionado');

    const [selectedCard, setSelectedCard] = useState<boolean>(false);
    const [selectedPix, setSelectedPix] = useState<boolean>(false);
    const [selectedMoney, setSelectedMoney] = useState<boolean>(false);

    const [cartItems, setCartItems] = useState([])
    useEffect(() => {
        const interval = setInterval(() => {
            const cart = localStorage.getItem('@carrinho')
            if (cart !== '[]' && cart !== null) {
                setCartItems(JSON.parse(cart as never))
            }
        }, 950)
        return () => clearInterval(interval)
    }, [cartItems])

    const totalOFItems = cartItems.reduce((acc: number, item: Product_Type) => acc + item.valor, 0).toFixed(2)

    const handleSelectedCard = () => {
        switch (paymentForm) {
            case "cartao":
                setSelectedCard(true);
                setSelectedPix(false);
                setSelectedMoney(false);
                return
            case "pix":
                setSelectedPix(true);
                setSelectedCard(false);
                setSelectedMoney(false);
                return
            case "dinheiro":
                setSelectedMoney(true);
                setSelectedPix(false);
                setSelectedCard(false);
                return
            default:
                return
        }
    }

    useEffect(() => {
        handleSelectedCard()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentForm])

    const [sucessData, setSucessData] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const formData = {
        numero_pedido: Math.floor(Math.random() * 1000) + 1,
        name: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        cep: cep,
        address: address,
        number: number,
        complement: complement,
        neighborhood: neighborhood,
        paymentForm: paymentForm,
        pedido: cartItems,
        total: totalOFItems + " R$"
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sendData = async (e: CheckoutData | any) => {
        e.preventDefault();

        try {
            console.log("enviando dados para o servidor...");
            setLoading(true);


        } catch (e) {
            console.log("Erro ao enviar dados para o servidor!");
            console.log(e);
        } finally {
            setTimeout(() => {
                console.log("Dados enviados com sucesso!");
                console.log(formData);
            }, 2000)

            await new Promise((resolve) => setTimeout(resolve, 2000));

            setSucessData(true);
            setShowModal(true);
            setLoading(false);
        }
    }

    const handleClose = () => {
        setShowModal(false);
    }



    return (
        <>
            <NavigationBar />
            <Modal show={showModal} onHide={handleClose} centered onEscapeKeyDown={handleClose}>
                <div className="bg-gray">
                    <Modal.Header className=" text-stone-200 flex flex-row  items-center">
                        <Modal.Title className="flex flex-row gap-1 items-center select-none font-blinker"> <FaRegCircleCheck /> Compra Realizada com Sucesso</Modal.Title>
                        <BiXCircle className="text-stone-200 text-2xl hover:text-stone-500 transition-all duration-150 cursor-pointer" onClick={handleClose}/>
                    </Modal.Header>
                    <Modal.Body className="bg-white">
                        <div className="font-blinker">
                            <h1 className="flex flex-row gap-1 text-xl items-center select-none text-stone-600"> Parabens!! </h1>
                            <p className="text-stone-400 ">
                                Seu pedido foi realizado com sucesso, em breve você receberá um e-mail com as informações do pedido.
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="bg-white">
                        <button className="flex flex-row font-blinker items-center gap-1 btn bg-gray text-stone-200 hover:bg-stone-500 hover:text-stone-100"> <BsWhatsapp className="text-emerald-500" onClick={handleClose} /> Enviar Mensagem </button>
                    </Modal.Footer>
                </div>
            </Modal>

            <Container>
                <Row className="bg-white rounded-lg mt-3">
                    <Col>
                        <a className="flex flex-row gap-1 items-center text-gray text-md font-blinker m-1" href="/Produtos">
                            <BiLeftArrowCircle /> Voltar para Produtos
                        </a>
                        <section>
                            <h1 className="text-gray text-3xl font-blinker font-light"> Checkout </h1>
                            <span className="text-stone-400 font-blinker font-light"> Preencha com seus dados e escolha a forma de pagamento desejada. </span>
                            <div className="bg-stone-400 w-full h-[1.3px] mt-2 mb-2"></div>

                            <Form onSubmit={(e: FormEvent<HTMLFormElement>) => sendData(e)}>
                                <article>
                                    <h3 className="text-stone-500 font-blinker lg:text-xl select-none"> 1. Informações de Contato </h3>
                                    <div className="pt-2 pb-2">
                                        <Row>
                                            <Col sm>
                                                <Form.Group>
                                                    <InputGroup>
                                                        <InputGroup.Text className="border-stone-200 rounded-xl"><BsPerson className="text-gray" /></InputGroup.Text>
                                                        <FloatingLabel label="Primeiro Nome">
                                                            <Form.Control type="text" className="border-stone-200 rounded-xl" required onChange={(e) => setFirstName(e.target.value)} />
                                                        </FloatingLabel>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>

                                            <Col sm lg="5">
                                                <Form.Group>
                                                    <InputGroup>
                                                        <InputGroup.Text className="border-stone-200 rounded-xl"><BsPeople className="text-gray" /></InputGroup.Text>
                                                        <FloatingLabel label="Sobrenome">
                                                            <Form.Control type="text" className="border-stone-200 rounded-xl" required onChange={(e) => setLastName(e.target.value)} />
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
                                                            <Form.Control type="text" className="border-stone-200 rounded-xl" required onChange={(e) => setPhone(e.target.value)} />
                                                        </FloatingLabel>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>

                                            <Col sm>
                                                <Form.Group className="mt-3">
                                                    <InputGroup>
                                                        <InputGroup.Text className="border-stone-200 rounded-xl"><BsEnvelopeAt className="text-gray" /></InputGroup.Text>
                                                        <FloatingLabel label="E-mail">
                                                            <Form.Control type="email" className="border-stone-200 rounded-xl" required onChange={(e) => setEmail(e.target.value)} />
                                                        </FloatingLabel>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                </article>
                                <article className="pt-3">
                                    <h3 className="text-stone-500 font-blinker lg:text-xl select-none"> 2. Informações de Entrega </h3>
                                    <div className="pt-2 pb-2">
                                        <Row>
                                            <Col sm>
                                                <Form.Group>
                                                    <InputGroup>
                                                        <InputGroup.Text className="border-stone-200 rounded-xl"><BsBoxSeam className="text-gray" /></InputGroup.Text>
                                                        <FloatingLabel label="CEP">
                                                            <Form.Control type="text" className="border-stone-200 rounded-xl" required onChange={(e) => setCep(e.target.value)} />
                                                        </FloatingLabel>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>

                                            <Col sm lg="4">
                                                <Form.Group>
                                                    <InputGroup>
                                                        <InputGroup.Text className="border-stone-200 rounded-xl"><BsBuilding className="text-gray" /></InputGroup.Text>
                                                        <FloatingLabel label="Endereço">
                                                            <Form.Control type="text" className="border-stone-200 rounded-xl" required onChange={(e) => setAddress(e.target.value)} />
                                                        </FloatingLabel>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>

                                            <Col sm lg="3">
                                                <Form.Group>
                                                    <InputGroup>
                                                        <InputGroup.Text className="border-stone-200 rounded-xl"><BsCalendar3Event className="text-gray" /></InputGroup.Text>
                                                        <FloatingLabel label="Número">
                                                            <Form.Control type="number" className="border-stone-200 rounded-xl" required onChange={(e) => setNumber(e.target.value)} />
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
                                                            <Form.Control type="text" className="border-stone-200 rounded-xl" required onChange={(e) => setComplement(e.target.value)} />
                                                        </FloatingLabel>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>

                                            <Col sm lg="4">
                                                <Form.Group>
                                                    <InputGroup>
                                                        <InputGroup.Text className="border-stone-200 rounded-xl"><BsBoxSeam className="text-gray" /></InputGroup.Text>
                                                        <FloatingLabel label="Bairro">
                                                            <Form.Control type="text" className="border-stone-200 rounded-xl" required onChange={(e) => setNeighborhood(e.target.value)} />
                                                        </FloatingLabel>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                </article>
                                <article className="pt-3">
                                    <h3 className="text-stone-500 font-blinker lg:text-xl select-none">3. Forma de Pagamento</h3>
                                    <div className="pt-2 pb-2">
                                        <article className="flex flex-row gap-1">
                                            <button
                                                className={!selectedCard ? "btn border-gray text-stone-500 font-blinker hover:bg-sky-500 hover:text-sky-200 flex flex-row items-center" : "btn bg-sky-500 text-stone-200 hover:bg-sky-500 hover:text-stone-200 font-blinker flex flex-row items-center"}
                                                onClick={() => setPaymentForm("cartao")} aria-required="true" type="button"
                                                disabled
                                            >
                                                <Image src="/png/mercado_brand.png" alt="Cartão" width={30} />
                                                Desativado
                                            </button>
                                            <button
                                                className={!selectedPix ? "btn border-gray text-stone-500 font-blinker hover:bg-emerald-600 hover:text-sky-200 flex flex-row items-center gap-1" : "btn bg-emerald-600 text-sky-200 font-blinker hover:bg-emerald-800 hover:text-sky-100 flex flex-row items-center gap-1"}
                                                onClick={() => setPaymentForm("pix")} aria-required="true" type="button"
                                            >
                                                <Image src="/png/pix_brand.png" alt="Pix" width={20} />
                                                Pix
                                            </button>
                                            <button
                                                className={!selectedMoney ? "btn border-gray text-stone-500 font-blinker hover:bg-emerald-800 hover:text-sky-100 flex flex-row items-center" : "btn bg-emerald-800 text-sky-100 font-blinker hover:bg-emerald-800 hover:text-sky-100 flex flex-row items-center"}
                                                onClick={() => setPaymentForm("dinheiro")} aria-required="true" type="button"
                                            >
                                                <MdAttachMoney className="text-emerald-400 text-xl" />
                                                Dinheiro
                                            </button>
                                        </article>
                                    </div>
                                </article>
                                <div className="mt-2 mb-2 items-center flex ">
                                    {!loading ? (
                                        <button className="btn p-2 bg-sky-500 text-sky-200 font-blinker hover:bg-sky-600 hover:text-sky-100">
                                            Finalizar Compra
                                        </button>
                                    ) : (
                                        <button className="btn p-2 bg-sky-500 text-sky-200 font-blinker hover:bg-sky-600 hover:text-sky-100 animate-pulse flex flex-row items-center gap-1">
                                            Carregando <Spinner animation="border" variant="light" size="sm" />
                                        </button>
                                    )}
                                </div>
                            </Form>
                        </section>
                    </Col>
                    <Col sm>
                        <section className="lg:mt-20">
                            <CheckoutResume />
                        </section>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Checkout_Entrega