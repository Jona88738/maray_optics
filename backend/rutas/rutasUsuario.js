import { Router } from "express";
import user from '../controlador/controladorUser.js'
const routes = Router();

routes.get("/login",user.login);

routes.get("/getusers", user.getUsers);

routes.get("/sesion",user.sesion)

routes.get("/logout",user.Logout)

routes.post("/", user.insertUser);

export default routes;