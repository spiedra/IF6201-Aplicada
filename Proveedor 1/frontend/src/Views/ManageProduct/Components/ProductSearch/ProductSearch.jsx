import React from "react";
import { Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";

// Icon
import iconSearch from  "../../../../assets/images/search_white_36dp.svg";

const ProductSearch = () => {
  return (
    <>
      <Row className="g-2">
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="Producto">
            <Form.Control type="text" placeholder="Computer" />
          </FloatingLabel>
        </Col>
        <Col md>
          <Button className="mt-1"><img src={iconSearch} alt="Icono no encontrado"/></Button>
        </Col>
      </Row>
    </>
  );
};

export default ProductSearch;
