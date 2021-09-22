import React, { useState } from "react";
import { Image, Table, Button } from "react-bootstrap";

// Images
import iconDelete from "../../../../assets/images/delete_white_36dp.svg";
import iconEdit from "../../../../assets/images/edit_white_36dp.svg";
import ProductModal from "../ProductModal/ProductModal";

const ProductTable = ({ attribute, handleChange, handleUpdate , handleDelete }) => {
  const [currentProductId, setProductId] = useState();
  const [currentProductName, setProductName] = useState();
  const [currentProductPrice, setProductPrice] = useState()
  const [currentProductStock, setProductStock] = useState();
  const [currentProductCategory, setProductCategory] = useState();
  const [productIdCategory, setProductIdCategory] = useState();
  const [currentProductImg, setProductImg] = useState();
  const [show, setShow] = useState(false);

  // Handlers
  const handleClose = () => setShow(false);

  /*const handleSubmit = (category) => {
    // if (category) {
    //   UpdateCategory(category).then((data) => {
    //     setShow(false);
    //     window.location.reload(false);
    //   });
    // }
  };*/

  const handleShow = (product) => {
    setProductId(product.productId);
    setProductName(product.productName);
    setProductPrice(product.productPrice);
    setProductStock(product.productStock);
    setProductCategory(product.productCategory);
    setProductIdCategory(product.productIdCategory)
    setProductImg(product.productImg);

    handleChange("productId", product.productId);
    handleChange("productName", product.productName);
    handleChange("productPrice", product.productPrice);
    handleChange("productPath", product.productImg);
    handleChange("productStock", product.productStock);
    handleChange("categoryId", product.productIdCategory);

    setShow(true);
  };


  return (
    <>
      <Table striped bordered hover responsive="md">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Categoria</th>
            <th>Imagen</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {attribute.products.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.ID_PRODUCTO}</td>
                <td>{item.NOMBRE}</td>
                <td>{item.PRECIO}</td>
                <td>{item.STOCK}</td>
                <td>{item.NOMBRE_CATEGORIA}</td>
                {console.log(item.RUTA_IMAGEN)}
                <td className="d-flex justify-content-center">
                  <img
                    src={
                      require("../../../../assets/images/" + "guzzi.png")//Cambiar al implementar la subida de imagen
                        .default
                    }
                    className="image__product"
                    alt="Imagen no encontrada"
                  />
                </td>
                <td>
                  <Button
                    id={index}
                    className="btn-danger mx-1 mb-1"
                    onClick={() => handleDelete(item.ID_PRODUCTO)}
                  >
                    <Image src={iconDelete} alt="Icono de eliminar" />
                  </Button>
                  <Button
                    className="btn-primary mx-1 mb-1"
                    onClick={() =>
                      handleShow({
                        productId: item.ID_PRODUCTO,
                        productName: item.NOMBRE,
                        productPrice: item.PRECIO,
                        productStock: item.STOCK,
                        productCategory: item.NOMBRE_CATEGORIA,
                        productIdCategory: item.ID_CATEGORIA,
                        productImg: item.RUTA_IMAGEN,
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
      <ProductModal
        handleClose={handleClose}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        attribute={{
          show: show,
          categories: attribute.categories,          
          currentProductId: currentProductId,
          currentProductName: currentProductName,
          currentProductPrice: currentProductPrice,
          currentProductStock: currentProductStock,
          currentProductCategory: currentProductCategory,
          currentProductIdCategory: productIdCategory,
          currentProductImg: currentProductImg,
        }}
      />
    </>
  );
};

export default ProductTable;
