import React from "react";
import { Container } from "react-bootstrap";
import FormDef from "./Components/FormDef/FormDef";
import Menu from "../../commons/Menu/Menu";
import "./RegisterCategory.css";

const RegisterCategory = () => {
  return (
    <div className="container_form-category">
      <Menu titleName="HachePe" />
      <Container className="m-0 mt-4 ms-3">
        <h1>Registrar categorias</h1>
        <hr className="h1"/>
      </Container>
      <Container className="category__container px-0">
        <FormDef />
      </Container>
    </div>
  );
};

export default RegisterCategory;
