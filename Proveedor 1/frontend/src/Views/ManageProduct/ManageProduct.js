import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Menu from "../../commons/Menu/Menu";
import {
  GetCategories,
  GetProducts,
  DeleteProduct,
  UpdateProduct,
} from "../../services/HachePeAPI";
import ProductSearch from "./Components/ProductSearch/ProductSearch";
import ProductTable from "./Components/ProductTable/ProductTable";
import "./ManageProduct.css";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  //Product Values
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productPath, setProductPath] = useState("");
  const [productStock, setProductStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productCategory, setProductCategory] = useState("");

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

  function handleChange(name, value) {
    switch (name) {
      case "productId":
        setProductId(value);
        break;
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
      case "productCategory":
        setProductCategory(value);
        break;
      default:
        break;
    } //end switch
  }

  const handleSubmit = () => {};

  function handleDelete(id) {
    DeleteProduct(id).then((data) => {
      console.log("Estado de eliminado: " + data);
      if (data === 1) {
        window.location.reload(false);
      }
    });
  }

  function handleUpdate() {
    const producto = {
      productId,
      productName,
      productPrice,
      productPath,
      productStock,
      categoryId,
    };
    UpdateProduct(producto).then((data) => {
      console.log(data);
      if (data === 1) {
        window.location.reload(false);
      }
    });
  }

  return (
    <>
      <div>
        <Menu titleName="HachePe" />
        <Container className="m-0 mt-4 ms-3">
          <h1>Gesti??n productos</h1>
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
              productId: productId,
              productName: productName,
              productPrice: productPrice,
              productPath: productPath,
              productStock: productStock,
              categoryId: categoryId,
              productCategory: productCategory
            }}
            handleChange={handleChange}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        </Container>
      </div>
    </>
  );
};

export default ManageProduct;
