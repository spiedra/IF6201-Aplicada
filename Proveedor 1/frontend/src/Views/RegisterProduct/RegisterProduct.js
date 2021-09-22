import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Menu from "../../commons/Menu/Menu";
import { GetCategories, PostRegisterProduct } from "../../services/HachePeAPI";
import ProductForm from "./Components/ProductForm/ProdructForm";
import "./RegisterProduct.css";

const RegisterProduct = () => {
  const [data, setData] = useState([]);

  //Product Values
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productPath, setProductPath] = useState("");
  const [productStock, setProductStock] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    (async () => {
      return GetCategories().then((data) => {
        setData(data[0]);
      });
    })();
  }, []);

  function handleSubmit() {
    const producto = {
      productName
      , productPrice
      , productPath
      , productStock
      , categoryId
    };
    console.log(JSON.stringify(producto));
    PostRegisterProduct(producto).then((data) =>{
      console.log(data);
    });
  }

  function handleChange(name, value) {
    switch (name) {
      case "productName":
        setProductName(value);
        break;
      case "productPrice":
        setProductPrice(value);
        break;
      case "productPath":
        setProductPath(value);
        break;
      case "productStock":
        setProductStock(value);
        break;
      case "categoryId":
        setCategoryId(value);
        break;
      default:
        break;
    }//end switch
  }//handleChange

  return (
    <div className="container_form-category">
      <Menu titleName="HachePe" />
      <Container className="m-0 mt-4 ms-3">
        <h1>Registro producto</h1>
        <hr className="h1" />
      </Container>
      <Container className="product__container--register px-0 mb-5">
        <ProductForm
          attribute={{ data: data }}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Container>
    </div>
  );
};

export default RegisterProduct;
