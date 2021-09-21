import React, { useEffect, useState } from "react";
import { Button,  Table } from "react-bootstrap";
import { GetCategories } from "../../../../services/HachePeAPI";
import "./CategoryTable.css";

const CategoryTable = ({ text }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      return GetCategories().then((data) => {
        setData(data[0]);
      });
    })();
  }, []);

  return (
    <>
      <Table striped bordered hover  responsive="md">
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
                  <Button className="btn-danger mx-1">
                    Delete
                  </Button>
                  <Button className="btn-primary mx-1">
                    Modificar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default CategoryTable;
