import { Col, Container, Figure, Row } from "react-bootstrap";

export const userProfileLink = "/img/profile_default_photo_alt.jpg"
export const boldClass = "hover:text-amber-100 transition-all duration-200"

export function About() {    
  return (
    <Container>
      <Row>
        <Col sm>
          <section className="prose-lg lg:prose-lg mt-10 pb-28 lg:mt-0 lg:mb-0 lg:pb-0 animate__animated animate__fadeIn animate__slow">
            <div className="flex flex-col justify-center items-center select-none lg:select-text">
              <Figure className="hover:scale-90 transition-all duration-200 animate__animated animate__fadeInUp animate__slower animate__delay-2s ">
                <Figure.Image
                src={userProfileLink}
                roundedCircle
                alt="Bruna Dutra"
                height={200}
                width={200}
                />
                <Figure.Caption className="text-center font-bebas text-gray text-xl lg:text-2xl">                  
                    Bruna Dutra                  
                </Figure.Caption>
              </Figure>
            </div>
            <div className="flex flex-col gap-0 justify-center items-center rounded flex-wrap animate__animated animate__fadeInUp animate__slower">
              <h3 className="font-abel text-PJwhite font-regular select-none lg:select-text bg-gray rounded-lg lg:w-7/12 p-2">
                <b className={boldClass}>Artesã</b> apaixonada por transformar fios de malha em <b className={boldClass}>bolsas e itens</b> de decoração únicos e charmosos. <br />
                Comecei como um <b className={boldClass}>hobby</b>, mas minha paixão me levou a criar um negócio <br />
                onde posso compartilhar meu talento e amor pelo artesanato com o mundo.
              </h3>
              <h3 className="font-abel text-PJwhite font-regular select-none lg:select-text bg-gray rounded-lg lg:w-7/12 p-2">
                Em cada peça, coloco meu cuidado e dedicação para garantir produtos de alta qualidade e <b className={boldClass}>design inovador.</b> <br />
                Acredito que o artesanato tem o poder de aquecer o coração e trazer beleza para a <b className={boldClass}>vida das pessoas.</b>
              </h3>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  );
}
