import { Router } from "express";
import expediente from "../controlador/controladorExpediente.js";

const routes = Router();

routes.get("/", expediente.getExpedientes);

routes.post("/", expediente.insertExpediente)

routes.delete("/", expediente.deleteExpediente)

routes.put("/", expediente.updateExpediente)

routes.post("/consulta", expediente.consultaExpediente)

routes.get("/listado",expediente.getListadoExpediente)

routes.get("/getconsultaExpediente", expediente.getconsultaExpediente)
export default routes