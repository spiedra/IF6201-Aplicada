import React, { useEffect, useState } from "react";
import { Button, Image, Table } from "react-bootstrap";
import {
  DeleteCategory,
  GetCategories,
  UpdateCategory,
} from "../../../../services/HachePeAPI";
import CategoryModal from "../CategoryModal/CategoryModal";

// Images
import iconDelete from "../../../../assets/images/delete_white_36dp.svg";
import iconEdit from "../../../../assets/images/edit_white_36dp.svg";

// Style
import "./CategoryTable.css";

const CategoryTable = () => {
  // States
  const [data, setData] = useState([]);
  const [currentCategory, setValueCategory] = useState();
  const [currentCategorId, setCategoryId] = useState();
  const [show, setShow] = useState(false);

  // Handlers
  const handleClose = () => setShow(false);

  const handleSubmit = (category) => {
    if (category) {
      UpdateCategory(category).then((data) => {
        setShow(false);
        window.location.reload(false);
      });
    }
  };

  const handleShow = (category) => {
    setCategoryId(category.categoryId);
    setValueCategory(category.categoryName);
    setShow(true);
  };

  const handleChange = (name, value) => {
    setValueCategory(value);
  };

  const handleDeleteCategory = (idCategory) => {
    console.log("Button delete: " + idCategory);
    DeleteCategory(idCategory).then((data) => {
      if (data) {
        window.location.reload(false);
      }
    });
  };

  // Getting the list of categories
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
                    className="btn-danger mx-1"
                    onClick={() => handleDeleteCategory(item.ID_CATEGORIA)}
                  >
                    <Image src={iconDelete} alt="Icono de eliminar" />
                  </Button>
                  <Button
                    className="btn-primary mx-1"
                    onClick={() =>
                      handleShow({
                        categoryId: item.ID_CATEGORIA,
                        categoryName: item.NOMBRE_CATEGORIA,
                      })
                    }
                  >
                    <Image src={iconEdit} alt="Icono de modificar" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CategoryModal
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        attribute={{
          show: show,
          currentCategorId: currentCategorId,
          currentCategory: currentCategory,
        }}
      />
    </>
  );
};

export default CategoryTable;
