import { Router } from "express";
import user from '../controlador/controladorUser.js'
const routes = Router();

routes.get("/login",user.login);


export default routes;