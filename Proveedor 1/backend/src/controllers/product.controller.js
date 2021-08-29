import { getConnection } from "../database/connection";

export const getProducts = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().execute("PRODUCTO.OBTENER_CATEGORIAS");
  console.log(result);
  res.json("Jjaa");
};

export const insertProduct = (req, res) => {
  res.json("Insert product")
}