import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Menu from "../../commons/Menu/Menu";
import { GetCategories } from "../../services/HachePeAPI";
import ProductForm from "./Components/ProductForm/ProdructForm";
import "./RegisterProduct.css";

const RegisterProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      return GetCategories().then((data) => {
        setData(data[0]);
      });
    })();
  }, []);

  return (
    <div className="container_form-category">
      <Menu titleName="HachePe" />
      <Container className="m-0 mt-4 ms-3">
        <h1>Registrar productos</h1>
        <hr className="h1" />
      </Container>
      <Container className="product__container--register px-0 mb-5">
        <ProductForm
        attribute={{data: data}}
          // handleChange={handleChange}
          // handleSubmit={handleSubmit}
        />
      </Container>
    </div>
  );
};

export default RegisterProduct;
