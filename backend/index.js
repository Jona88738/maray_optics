import express from "express";
import morgan  from 'morgan'
import cors from 'cors';
import { createRequire } from 'module';
import session from 'express-session';
import rutasUsuario from "./rutas/rutasUsuario.js";
import rutasProducto from './rutas/rutasProducto.js';
import categoria from "./rutas/rutaCategoria.js";
import expedientes from "./rutas/rutaExpedientes.js";

import { PORT, HOST_BD, PORT_BD, USER_BD, PASSWORD_BD, DATABASE } from './config.js'

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',  // Origen permitido
    credentials: true
}))
// app.use(cors({
//     origin: 'http://localhost:5173',  // Origen permitido
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Métodos permitidos
//     //allowedHeaders: ['Content-Type', 'Authorization'],  // Cabeceras permitidas
//    // credentials: true,  // Permitir credenciales como cookies
// }));

app.use(morgan("dev"));
const require = createRequire(import.meta.url);
const MySQLStore = require('express-mysql-session')(session);


const options = {
    host: HOST_BD,
    port: PORT_BD,
    user: USER_BD,
    password: PASSWORD_BD,
    database: DATABASE
};

const sessionStore = new MySQLStore(options);

app.use(session({
    key: "cookie_user",
    secret: "idiomaticXDJN",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    //cookie: { secure: false } 
    cookie: {
        secure: false, 
        // httpOnly: true, 
        // sameSite: 'Strict' 
    }
}));

app.use(morgan("dev"));
app.use(express.json());

app.use("/usuario", rutasUsuario);
app.use('/producto',rutasProducto);
app.use("/categoria", categoria);
app.use("/expedientes",expedientes)

app.use((req,res) =>{
    res.status(404).json({
        message:"Recursos no encontrado"
    })
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
