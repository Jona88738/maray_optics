import { Router } from "express";
import controladorVenta from "../controlador/controladorVenta.js";

const routes = Router();

routes.get("/",controladorVenta.getVentas);

routes.post("/",controladorVenta.insertVenta);

routes.delete("/", controladorVenta.deleteVenta);

routes.get("/detallesVenta", controladorVenta.detallesVenta);

routes.get("/movimientoEfectivo",controladorVenta.movimientoEfectivo)

routes.post("/movimientoEfectivo", controladorVenta.ingresarEfectivo)

routes.post('/pagoDiferido', controladorVenta.pagoDiferido);

routes.post('/corteCaja', controladorVenta.corteCaja);

routes.get("/getResumenVentasHoy", controladorVenta.getResumenVentasHoy);

routes.get("/getResumenVentasweekly", controladorVenta.getResumenVentasSemana);

routes.get("/getResumenVentamonthly", controladorVenta.getResumenVentasSemana);

export default routes;