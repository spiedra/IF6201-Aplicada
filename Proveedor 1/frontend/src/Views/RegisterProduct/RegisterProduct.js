import React from "react";
import { Container } from "react-bootstrap";
import FormDefault from "../../commons/FormDefault/FormDefault";
import Menu from "../../commons/Menu/Menu";
import "./RegisterProduct.css";

const RegisterProduct = () => {
  return (
    <Container className="product__container px-0">
      <Container>
        <Menu titleName="HachePe" />
      </Container>
      <Container className="d-flex justify-content-center">
        <FormDefault attribute={{ name: "producto", action: "Registrar" }} />
      </Container>
    </Container>
  );
};

export default RegisterProduct;