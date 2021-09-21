import React from "react";
import { Form } from "react-bootstrap";
import Button from "../Button/Button";
import "./FormDefault.css";

const FormDefault = ({ attribute, handleChange, handleSubmit, param }) => {
  return (
    <>
      <Form className="form__default">
        <Form.Group className="mb-3 mt-4" controlId="defaultForm">
          <Form.Label>Nombre de {attribute.name}</Form.Label>
          <Form.Control
            type="text"
            name={attribute.name}
            placeholder={"Ingresa nombre de " + attribute.name}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
          <Button text={attribute.action} handleSubmit={handleSubmit} />
        </Form.Group>
      </Form>
    </>
  );
};

export default FormDefault;