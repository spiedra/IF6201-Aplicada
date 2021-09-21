import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "../../../../commons/Button/Button";
import "./FormDef.css";
import Input from "../../../../commons/Input/Input";
import Label from "../../../../commons/Label/Label";
import { RegisterCategory } from "../../../../services/HachePeAPI";

const FormDef = () => {
  const [categoryName, setCategory] = useState("");

  function handleSubmit() {
    if (categoryName) {
      RegisterCategory(categoryName).then((data) => {
       //enviar un mensaje
      });
    }
  }

  function handleChange(categoryName, value) {
    setCategory(value)
  }

  return (
    <>
      <Form className="form__default">
        <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
        <Label text="Nombre categoria" />
          <Input
          attribute={{
            id: "idCategoryName",
            name: "categoryName",
            type: "text",
            placeholder: "Ingrese nombre de categoria",
          }}
          handleChange={handleChange}
        />
        </Form.Group>
        <Button text="Registrar" handleSubmit={handleSubmit}/>
      </Form>
    </>
  );
};

export default FormDef;
