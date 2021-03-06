import { getConnection, sql } from "../database/connection";

export const getProducts = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().execute("PRODUCTO.OBTENER_PRODUCTOS");
  res.status(200).json({
    success: true,
    message: "Successfully added",
    response: result.recordsets,
  });
  pool.close();
};

export const searchProduct = async (req, res) => {
  const { id } = req.params;

  if (id == null || id == "undefined") {
    return res.status(400).json({ success: false, msg: "Bad Request" });
  }

  const pool = await getConnection();
  let results = await pool
    .request()
    .input("param_ID_PRODUCTO", sql.Int, id)
    .execute("PRODUCTO.OBTENER_PRODUCTO_BY_ID");

  if (results.recordsets[0][0].RESPUESTA != 0) {
    res.status(200).json(results.recordsets);
  } else {
    res.status(200).json({
      success: false,
      message: "Product not found",
    });
  }
};

export const insertProduct = async(req, res) => {
    const {
        productName,
        productPrice,
        productPath,
        productStock,
        categoryId
    } = req.body;

    if ((productName == null || productName == "undefined") ||
        (productPrice == null || productPrice == "undefined") ||
        (productPath == null || productPath == "undefined") ||
        (productStock == null || productStock == "undefined") ||
        (categoryId == null || categoryId == "undefined")) {
        return res.status(400).json({ success: false, msg: "Bad Request" });
    }

    const pool = await getConnection();
    let results = await pool
        .request()
        .input("param_NOMBRE", sql.VarChar(68), productName)
        .input("param_PRECIO", sql.Float, productPrice)
        .input("param_RUTA_IMAGEN", sql.VarChar(68), productPath)
        .input("param_STOCK", sql.Int, productStock)
        .input("param_NOMBRE_CATEGORIA", sql.Int, categoryId)
        .execute("PRODUCTO.sp_INSERTAR_PRODUCTO");

    if (results.recordsets[0][0].RESPUESTA == 1) {
        res.status(200).json({
            success: true,
            message: "Successfully added",
            flag: 1
        });
    } else {
        res.status(200).json({
            success: false,
            message: "The category already exists",
            flag : 0
        });
    }

    pool.close();
}

export const updateProduct = async(req, res) => {
    const {
        productId,
        productName,
        productPrice,
        productPath,
        productStock,
        categoryId
    } = req.body;
    console.log(req.body);

    if ((productId == null || productId == "undefined") ||
        (productName == null || productName == "undefined") ||
        (productPrice == null || productPrice == "undefined") ||
        (productPath == null || productPath == "undefined") ||
        (productStock == null || productStock == "undefined") ||
        (categoryId == null || categoryId == "undefined")) {
        return res.status(400).json({ success: false, msg: "Bad Request" });
    }

    const pool = await getConnection();
    let results = await pool
        .request()
        .input("param_ID_PRODUCTO", sql.Int, productId)
        .input("param_NOMBRE", sql.VarChar(68), productName)
        .input("param_PRECIO", sql.Float, productPrice)
        .input("param_RUTA_IMAGEN", sql.VarChar(68), productPath)
        .input("param_STOCK", sql.Int, productStock)
        .input("param_NOMBRE_CATEGORIA", sql.Int, categoryId)
        .execute("PRODUCTO.sp_MODIFICAR_PRODUCTO");

    if (results.recordsets[0][0].RESPONSE == 1) {
        res.status(200).json({
            success: true,
            message: "Successfully updated",
            flag : 1
        });
    } else {
        res.status(200).json({
            success: false,
            message: "Fail to update",
            flag : 0
        });
    }

    pool.close();
}

export const deleteProduct = async(req, res) => {
    const { productId } = req.body;

    if (productId == null || productId == "undefined") {
        return res.status(400).json({ success: false, msg: "Bad Request" });
    }
    const pool = await getConnection();
    const result = await pool.request()
        .input("param_ID_PRODUCTO", sql.Int, productId)
        .execute("PRODUCTO.sp_ELIMINAR_PRODUCTO");

    if (result.recordsets[0][0].RESPONSE == 1) {
        res.status(200).json({
            success: true,
            message: "Successfully deleted",
            flag : 1
        });
    } else {
        res.status(200).json({
            success: false,
            message: "Fail to delete",
            flag : 0
        });
    }


    pool.close();
}

