import React from "react";
import { Form , FloatingLabel, Row, Col } from "react-bootstrap";
import Button from "../../../../commons/Button/Button";

// Icon
import iconSearch from  "../../../../assets/images/search_white_36dp.svg";

const ProductSearch = ({handleSubmit}) => {
  return (
    <>
      <Row className="g-2">
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="Producto">
            <Form.Control type="text" placeholder="Computer" />
          </FloatingLabel>
        </Col>
        <Col md>
          <Button className="mt-1" text="Buscar" handleSubmit={handleSubmit} icon={iconSearch} />
        </Col>
      </Row>
    </>
  );
};

export default ProductSearch;
