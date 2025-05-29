import { Router } from "express";
import productos from  '../controlador/controladorProducto.js'

const routes = Router();

routes.get("/",productos.getProducts);

routes.post("/", productos.insertProducto)

routes.delete("/", productos.deleteProducts);


export default routes;