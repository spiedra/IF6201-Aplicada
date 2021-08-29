import { getConnection, sql } from "../database/connection";

export const validateLogin = async (req, res) => {
  const { userName, password } = req.body;

  if (
    userName == null ||
    userName == "undefined" ||
    password == null ||
    password == "undefined"
  ) {
    return res.status(400).json({ success: false, msg: "Bad Request" });
  }

  const pool = await getConnection();
  let results = await pool
    .request()
    .input("param_NOMBRE_USUARIO", sql.VarChar(48), userName)
    .input("param_CONTRASENA", sql.VarChar(48), password)
    .execute("ADMIN.sp_VALIDAR_ADMINISTRADOR");

  if (results.recordsets[0][0].RESPUESTA == 1) {
    res.status(200).json({
      success: true,
      message: "Admin allowed",
      flag: 1,
    });
  } else if (results.recordsets[0][0].RESPUESTA == 0) {
    res.status(200).json({
      success: false,
      message: "User not found",
      flag: 0,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Incorrect password",
      flag: -1,
    });
  }
};