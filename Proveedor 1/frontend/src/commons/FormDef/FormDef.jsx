import React from "react";
import { Form } from "react-bootstrap";
import Tittle from "../Title/Title";
import Button from "../../commons/Button/Button";

import "./FormDef.css";

const FormDef = () => {
  return (
    <>
      <Form className="form__default">
        <Tittle text="Registrar categoria" />
        <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
          <Form.Label>Nombre de categoria</Form.Label>
          <Form.Control type="text" placeholder="Ingresa nombre de categoria" />
        </Form.Group>
        <Button text="Registrar" />
      </Form>
    </>
  );
};

export default FormDef;
