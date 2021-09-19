import React from "react";
import { Container } from "react-bootstrap";
import FormDef from "../../commons/FormDef/FormDef";
import Menu from "../../commons/Menu/Menu";
import Tittle from "../../commons/Title/Title";
import "./RegisterCategory.css";

const RegisterCategory = () => {
  return (
    <Container className="category__container px-0">
      <Container>
        <Menu titleName="HachePe" />
      </Container>
      <Container className="d-flex justify-content-center">
        <FormDef />
      </Container>
    </Container>
  );
};

export default RegisterCategory;