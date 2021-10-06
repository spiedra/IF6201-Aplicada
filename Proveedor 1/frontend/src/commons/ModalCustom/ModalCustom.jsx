import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalCustom = ({ attribute }) => {
  return (
    <>
      <Modal show={attribute.show} onHide={attribute.handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>{attribute.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={attribute.handleClose}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCustom;
