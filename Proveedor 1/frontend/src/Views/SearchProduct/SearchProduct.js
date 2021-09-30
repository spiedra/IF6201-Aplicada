import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import TableDefault from "../../commons/Table/TableDefault";
import FormDefault from "../../commons/FormDefault/FormDefault";
import Menu from "../../commons/Menu/Menu";
import { SearchProductGet } from "../../services/testApi";

import "./SearchProduct.css";

const SearchProduct = () => {
  const [productName, setProductName] = useState("");
  const [list, setList] = useState("");

  function handleChange(name, value) {
    setProductName(value);
  }

  function handleSubmit() {
    if (productName) {
      SearchProductGet(productName).then((data) => {
        setList(data[0]);
      });
    }
  }

  return (
    <Container className="product__container px-0">
      <Container>
        <Menu titleName="HachePe" />
      </Container>
      <Container className="d-flex justify-content-center">
        <FormDefault attribute={
          {
            name: "searchProduct"
            , action: "Buscar"
          }}
          handleChange={handleChange}
          handleSubmit={handleSubmit} />

      </Container>
      
      <TableDefault
        attribute={
          {
            list
          }}

      />

    </Container>
  );
};

export default SearchProduct;