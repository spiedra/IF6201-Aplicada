import express, { json } from "express";
import morgan from "morgan"; // Funciona para testear de mejor manera las peticiones HTTP
import cors from "cors";
import productsRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/categoria.routes";
import loginRoutes from "./routes/login.routes";
import { urlencoded } from "body-parser";

const app = express();

// MIDDLEWARES
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
require("dotenv").config(); // Permite el uso del archivo .env

// LOCAL MIDDLEWARES
app.use(productsRoutes);
app.use(categoryRoutes);
app.use(loginRoutes);

// ROUTES
app.get("/api/test", (req, res) => {
  res.json({
    message: "Funciona el API",
  });
});

//  PORT
const port = process.env.PORT;

// LISTEN.PORT
app.listen(port, () => {
  console.log(`Aplicacion de SqlServer corriendo en el puerto  ${port}`);
});
