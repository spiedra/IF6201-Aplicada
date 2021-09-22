import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./ProductModal.css";

const ProductModal = ({
  handleClose,
  handleChange,
  handleUpdate,
  attribute,
}) => {
  return (
    <>
      <Modal size="lg" show={attribute.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2" controlId="defaultForm">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                defaultValue={attribute.currentProductName}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="defaultForm">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="productPrice"
                defaultValue={attribute.currentProductPrice}
                min={0}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFileLg" className="mb-2">
              <Form.Label>Imagen actual</Form.Label>
              <img
                src={require("../../../../assets/images/" + "guzzi.png").default
                  /*attribute.currentProductImg
                    ? require("../../../../assets/images/" + "guzzi.png"
                        //attribute.currentProductImg).default
                    : require("../../../../assets/images/guzzi.png").default*/
                }
                className="image__product--modal"
                alt="Imagen no encontrada"
              />
              <Form.Control 
              name="productPath"
              type="file"
              size="md" />
            </Form.Group>
            <Form.Group controlId="formFileLg" className="mb-2">
              <Form.Label>Cantidad existente</Form.Label>
              <Form.Control
                type="number"
                name="productStock"
                defaultValue={attribute.currentProductStock}
                min={0}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFileLg">
              <Form.Label>Categoría</Form.Label>
              <Form.Select name="categoryId" onChange = {(e) => handleChange(e.target.name, e.target.value)}>
                <option disabled selected value={attribute.currentProductIdCategory}>
                  {"Categoría actual: " + attribute.currentProductCategory}
                </option>
                {attribute.categories.map((item, index) => (
                  <option key={index} value={item.ID_CATEGORIA}>
                    {item.NOMBRE_CATEGORIA}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              handleUpdate({
                // categoryId: attribute.currentCategorId,
                // categoryName: attribute.currentCategory,
              })
            }
          >
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductModal;
