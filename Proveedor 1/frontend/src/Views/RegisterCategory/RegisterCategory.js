import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { RegisterCategoryPost } from "../../services/testApi";
import Menu from "../../commons/Menu/Menu";
import FormDefault from "../../commons/FormDefault/FormDefault";
import "./RegisterCategory.css";

const RegisterCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  function handleChange(name, value) {
    setCategoryName(value);
    console.log("Name: "+name+" "+value)
  }

  function handleSubmit() {
    let category = { categoryName };
    if (category.categoryName !== null) {
      RegisterCategoryPost(category).then((data) => {
        console.log("Registrado " + data);
      });
    }
  }

  return (
    <div className="container_form-category">
      <Menu titleName="HachePe" />
      <Container className="m-0 mt-4 ms-3">
        <h1>Registro categoría</h1>
        <hr className="h1" />
      </Container>
      <Container className="category__container px-0">
        <FormDefault
          attribute={{ name: "categoría", action: "Registrar" }}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Container>
    </div>
  );
};

export default RegisterCategory;