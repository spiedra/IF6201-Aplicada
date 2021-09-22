import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Menu from "../../commons/Menu/Menu";
import { GetCategories, GetProducts } from "../../services/HachePeAPI";
import ProductSearch from "./Components/ProductSearch/ProductSearch";
import ProductTable from "./Components/ProductTable/ProductTable";
import "./ManageProduct.css";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Getting the list of products
  useEffect(() => {
    (async () => {
      return GetProducts().then((data) => {
        setProducts(data[0]);
      });
    })();
  }, []);

  // Getting the list of categories
  useEffect(() => {
    (async () => {
      return GetCategories().then((data) => {
        setCategories(data[0]);
      });
    })();
  }, []);

  function handleSubmit(name, value){
    console.log("Hola estoy de prueba");
  }

  return (
    <>
      <div>
        <Menu titleName="HachePe" />
        <Container className="m-0 mt-4 ms-3">
          <h1>Gestión productos</h1>
          <hr />
        </Container>
        <Container className="mt-4">
          <ProductSearch handleSubmit={handleSubmit} />
        </Container>
        <Container className="mt-4">
          <ProductTable
            attribute={{
              products: products,
              categories: categories,
            }}
          />
        </Container>
      </div>
    </>
  );
};

export default ManageProduct;
