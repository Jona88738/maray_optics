import { Router } from "express";
import productos from  '../controlador/controladorProducto.js'

const routes = Router();

routes.get("/",productos.getProducts);



export default routes;