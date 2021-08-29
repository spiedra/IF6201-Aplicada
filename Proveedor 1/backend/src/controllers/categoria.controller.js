import { getConnection, sql } from "../database/connection";

export const getCategories = async(req, res) => {
    const pool = await getConnection();
    const result = await pool.request().execute("PRODUCTO.OBTENER_CATEGORIAS");
    res.json(result);
    pool.close();
};

export const insertCategory = async(req, res) => {
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
        });
    } else {
        res.status(200).json({
            success: false,
            message: "The category already exists",
        });
    }
    pool.close();
};


export const updateCategory = async(req, res) => {
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
        });
    } else {
        res.status(200).json({
            success: false,
            message: "Fail to update",
        });
    }
    pool.close();
};