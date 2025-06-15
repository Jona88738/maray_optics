import { Router } from "express";
import controladorVenta from "../controlador/controladorVenta.js";

const routes = Router();

routes.get("/",controladorVenta.getVentas);

routes.post("/",controladorVenta.insertVenta);

routes.delete("/", controladorVenta.deleteVenta);

routes.get("/detallesVenta", controladorVenta.detallesVenta);

routes.get("/movimientoEfectivo",controladorVenta.movimientoEfectivo)

routes.post('/pagoDiferido', controladorVenta.pagoDiferido);

export default routes;