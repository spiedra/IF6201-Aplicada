import React from "react";
import { Form, FloatingLabel, Row, Col, Button } from "react-bootstrap";

const ProductSearch = ({ handleSubmit }) => {
  return (
    <>
      <Row className="g-2">
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="Producto">
            <Form.Control type="text" placeholder="Computer" />
          </FloatingLabel>
        </Col>
        <Col md>
          <Button className="mt-1" variant="dark">
            <img
            alt="Icono buscar"
              src={
                require("../../../../assets/images/search_white_36dp.svg")
                  .default
              }
            ></img>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ProductSearch;
