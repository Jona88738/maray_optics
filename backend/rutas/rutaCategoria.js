import { Router } from "express";
import categoria from "../controlador/controladorCategoria.js";

const routes = Router();

routes.get("/",categoria.getCategoria);

routes.post("/", categoria.insertCategoria);


export default routes;