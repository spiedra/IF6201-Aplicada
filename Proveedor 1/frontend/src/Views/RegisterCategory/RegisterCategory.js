import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { RegisterCategoryPost } from "../../services/testApi";
import Menu from "../../commons/Menu/Menu";
import FormDefault from "../../commons/FormDefault/FormDefault";
import "./RegisterCategory.css";
import ModalCustom from "../../commons/ModalCustom/ModalCustom";

const RegisterCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  // Modal
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(name, value) {
    setCategoryName(value);
  }

  function handleSubmit() {
    let category = { categoryName };
    if (category.categoryName !== null) {
      RegisterCategoryPost(category).then((data) => {
        setMessage("Categoría registrada correctamente");
        setShow(true);
      });
    }
  }

  return (
    <>
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
      <ModalCustom
        attribute={{
          message: message,
          show: show,
          handleClose: () => setShow(false),
        }}
      />
    </>
  );
};

export default RegisterCategory;
