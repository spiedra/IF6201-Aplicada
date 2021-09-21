import React from "react";
import { Form } from "react-bootstrap";
import Button from "../../../../commons/Button/Button";
import "./ProductForm.css";

const ProductForm = ({ attribute }) => {
  return (
    <>
      <Form className="form__product">
        <Form.Group className="mb-2" controlId="defaultForm">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="productName"
            name="n"
            placeholder={"Ingresa nombre del producto"}
            // onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="defaultForm">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="priceProduct"
            placeholder={"Ingresa el precio del producto"}
            min={0}
            // onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formFileLg" className="mb-2">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" size="lg" />
        </Form.Group>
        <Form.Group controlId="formFileLg" className="mb-2">
          <Form.Label>Cantidad existente</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            placeholder={"Ingresa la cantidad existentes"}
            min={0}
            // onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formFileLg">
          <Form.Label>Categoría</Form.Label>
          <Form.Select>
          <option value="0">Escoga alguna categoría</option>
            {attribute.data.map((item, index) => (
                <option key={index} value={index}>{item.NOMBRE_CATEGORIA}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button text="Registrar" />
      </Form>
    </>
  );
};

export default ProductForm;
