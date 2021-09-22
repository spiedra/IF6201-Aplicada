import { getConnection, sql } from "../database/connection";

export const getCategories = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().execute("PRODUCTO.OBTENER_CATEGORIAS");
  res.status(200).json({
    success: true,
    message: "Successfully added",
    response: result.recordsets,
  });
  pool.close();
};

export const insertCategory = async (req, res) => {
  const { categoryName } = req.body;

  if (categoryName == null || categoryName == "undefined") {
    return res.status(400).json({ success: false, msg: "Bad Request" });
  }

  const pool = await getConnection();
  let results = await pool
    .request()
    .input("param_NOMBRE_CATEGORIA", sql.VarChar(24), categoryName)
    .execute("PRODUCTO.sp_INSERTAR_CATEGORIA");

  if (results.recordsets[0][0].RESPUESTA == 1) {
    res.status(200).json({
      success: true,
      message: "Successfully added",
      flag: 1,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "The category already exists",
      flag: 0,
    });
  }
  pool.close();
};

export const deleteCategory = async (req, res) => {
  const { categoryId } = req.body;

  if (categoryId == null || categoryId == "undefined") {
    return res.status(400).json({ success: false, msg: "Bad Request" });
  }

  const pool = await getConnection();
  let results = await pool
    .request()
    .input("param_ID_CATEGORIA", sql.Int, categoryId)
    .execute("PRODUCTO.sp_ELIMINAR_CATEGORIA");
    console.log(JSON.stringify(results.recordsets));
  if (results.recordsets[0][0].RESPONSE == 1) {
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
      flag: 1
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Fail to delete",
      flag: 0
    });
  }
  pool.close();
};

export const updateCategory = async (req, res) => {
  console.log(req.body);
  const { categoryId, categoryName } = req.body;

  console.log(categoryId + " and " + categoryName);

  if ((categoryId == null || categoryId == "undefined") ||
    (categoryName == null || categoryName == "undefined")) {
    return res.status(400).json({ success: false, msg: "Bad Request" });
  }
  const pool = await getConnection();

  let results = await pool
    .request()
    .input("ID_CATEGORIA", sql.Int, categoryId)
    .input("param_NOMBRE_CATEGORIA", sql.VarChar(24), categoryName)
    .execute("PRODUCTO.sp_MODIFICAR_CATEGORIA");
  if (results.recordsets[0][0].RESPONSE == 1) {
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      flag: 1
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Fail to update",
      flag: 0
    });
  }
  pool.close();
};