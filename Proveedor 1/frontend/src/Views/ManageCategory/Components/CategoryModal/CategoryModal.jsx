import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CategoryModal = ({handleClose, handleChange, attribute}) => {
  return (
    <>
      <Modal size="lg" show={attribute.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nuevo nombre</Form.Label>
              <Form.Control
                type="text"
                name="currentCategory"
                value={attribute.currentCategory}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CategoryModal;
