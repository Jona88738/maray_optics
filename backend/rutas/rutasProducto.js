import { Router } from "express";
import productos from  '../controlador/controladorProducto.js'

const routes = Router();

routes.get("/",productos.getProducts);

routes.post("/", productos.insertProducto);

routes.put("/", productos.updateProduct);

routes.delete("/", productos.deleteProducts);

routes.post("/bajaProducto", productos.bajaProducto)

routes.get("/bajaProducto", productos.getBajaProducto)

export default routes;