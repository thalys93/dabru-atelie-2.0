import { Container, Row, Col } from "react-bootstrap"
import { MdOutlineEmail, MdFacebook } from "react-icons/md";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { useState } from "react";
import { boldClass } from "../About";



function Contact() {

  const whatsappText = encodeURIComponent("Olá, gostaria de saber mais sobre os produtos do Ateliê")

  const [facebookContact, setFacebookContact] = useState("DaBru Ateliê")
  const [facebookLink, setFacebookLink] = useState("https://www.facebook.com/Dabruatelie")
  const [instagramContact, setInstagramContact] = useState("@dabruatelie")
  const [instagramLink, setInstagramLink] = useState("https://www.instagram.com/dabruatelie/")
  const [emailContact, setEmailContact] = useState("contato@dabruateliê.com.br")
  const [whatsappLink, setWhatsappLink] = useState(`https://api.whatsapp.com/send/?phone=555191597882&text=${whatsappText}`)

  const ulStyle = "flex flex-row items-center gap-1 animate__animated animate__fadeInLeft animate__slow"

  return (
    <Container>
      <Row>
        <Col sm>
          <section className="prose-lg lg:prose-lg mt-16 pb-28 lg:mt-28 lg:mb-0 animate__animated animate__fadeIn animate__slow">
            <div className="flex flex-col justify-center items-center select-none animate__animated animate__fadeInDown animate__slow">
              <h1 className="font-bebas text-gray font-light"> Contato </h1>
              <div className="line"></div>
            </div>
            <div>
              <div className="flex justify-center items-center">
                <ul className="flex flex-col font-abel text-gray font-regular select-none">
                  <a href={facebookLink} target="_blank" className={boldClass}>
                    <li className={ulStyle}>
                      <MdFacebook />
                      <div className="flex justify-center items-center align-middle text-start gap-1">
                        <b>Facebook:</b> {facebookContact}
                      </div>
                    </li>
                  </a>

                  <a href={instagramLink} className={boldClass} target="_blank">
                    <li className={ulStyle}>
                      <FaInstagram />
                      <div className="flex justify-center items-center align-middle text-start gap-1">
                        <b>Instagram:</b>
                        {instagramContact}
                      </div>
                    </li>
                  </a>

                  <a href={`mailto:${emailContact}`} className={boldClass} target="_blank">
                    <li className={ulStyle}>
                      <MdOutlineEmail />
                      <div className="flex justify-center items-center align-middle text-start gap-1">
                        <b>Email:</b>
                        {emailContact}
                      </div>
                    </li>
                  </a>
                </ul>
              </div>
              <div className="flex flex-col text-center items-center justify-center font-bebas text-gray font-light prose-lg lg:prose-xl animate__animated animate__fadeInUp animate__slow">
                <h3> Ficou Curiosa? me <br /> Chama no Whats </h3>
                <a href={whatsappLink} target="_blank" className={boldClass}>
                  <FaWhatsapp size={55} />
                </a>
              </div>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default Contact