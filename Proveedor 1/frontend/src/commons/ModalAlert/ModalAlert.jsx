import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalAlert = ({ attribute, handleClose}) => {
  return (
    <>
      <Modal show={attribute.show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>{attribute.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAlert;
