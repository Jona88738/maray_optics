import { Router } from "express";
import controladorVenta from "../controlador/controladorVenta.js";

const routes = Router();

routes.get("/",controladorVenta.getVentas);

routes.post("/",controladorVenta.insertVenta);

export default routes;