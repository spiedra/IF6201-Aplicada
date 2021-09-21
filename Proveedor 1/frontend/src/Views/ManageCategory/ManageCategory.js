import React from "react";
import { Container } from "react-bootstrap";
import Menu from "../../commons/Menu/Menu";
import CategoryTable from "./Components/CategoryTable/CategoryTable";

const ManageCategory = () => {
  return (
    <>
      <div>
        <Menu titleName="HachePe" />
        <Container className="m-0 mt-4 ms-3">
          <h1>Gestionar categorias</h1>
          <hr />
        </Container>
        <Container className="mt-5">
          <CategoryTable/>
        </Container>
      </div>
    </>
  );
};

export default ManageCategory;
