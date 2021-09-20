import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import FormDefault from "../../commons/FormDefault/FormDefault";
import Menu from "../../commons/Menu/Menu";
import "./RegisterCategory.css";
import { RegisterCategoryPost } from "../../services/testApi"



const RegisterCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  function handleChange(name, value) {
    setCategoryName(value);
  }

  function handleSubmit() {
    let category = {categoryName};
    if (category.categoryName !== null) {
      RegisterCategoryPost(category).then((data) => {
        console.log("Registrado "+ data)
      });
    }
  }

  return (
    <Container className="category__container px-0">
      <Container>
        <Menu titleName="HachePe" />
      </Container>
      <Container className="d-flex justify-content-center">
        <FormDefault attribute={
          {name : "categoria"
          , action : "Registrar"}
          } 
          handleChange={handleChange}
          handleSubmit={handleSubmit}/>
      </Container>
    </Container>
  );
};

export default RegisterCategory;