import React, { useEffect, useState } from "react";
import { Button, Form, Image, Modal, Table } from "react-bootstrap";
import { GetCategories } from "../../../../services/HachePeAPI";
import iconDelete from "../../../../assets/images/delete_white_36dp.svg";
import iconEdit from "../../../../assets/images/edit_white_36dp.svg";
import "./CategoryTable.css";

const CategoryTable = () => {
  const [data, setData] = useState([]);
  const [currentCategory, setValueCategory] = useState();

  // Modal handlers
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  // const handleSaveChange = () => console.log("saving changes");

  const handleShow = (value) => {
    setValueCategory(value);
    setShow(true);
  };

  const handleChange = (name, value) => {
    setValueCategory(value);
    console.log("name: " + name + ", value:  " + value);
  };

  const handleDeleteCategory = (idCategory) => {
    console.log("Button delete: " + idCategory);
  };

  useEffect(() => {
    (async () => {
      return GetCategories().then((data) => {
        setData(data[0]);
      });
    })();
  }, []);

  return (
    <>
      <Table striped bordered hover responsive="md">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Nombre categoria</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.ID_CATEGORIA}</td>
                <td>{item.NOMBRE_CATEGORIA}</td>
                <td>
                  <Button
                    id={index}
                    className="btn-danger mx-1 mb-sm-2"
                    onClick={() => handleDeleteCategory(item.ID_CATEGORIA)}
                  >
                    <Image src={iconDelete} alt="Icono de eliminar" />
                  </Button>
                  <Button
                    className="btn-primary mx-1"
                    onClick={() => handleShow(item.NOMBRE_CATEGORIA)}
                  >
                    <Image src={iconEdit} alt="Icono de modificar" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal size="lg" show={show} onHide={handleClose}>
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
                value={currentCategory}
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

export default CategoryTable;
