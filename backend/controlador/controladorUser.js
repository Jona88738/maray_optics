import { json } from "express";
import {conn} from "../db/connectionMysql.js"


const login = async (req, res) =>{
    try {
        const {usuario, password} = req.query;

        const [datos] = await conn.query("SELECT * FROM usuario WHERE usuario = ? && password = ?", [usuario, password]);
        if(datos.length <= 0) return res.json({result: false, message: "Verifica los datos"})
        req.session.usuario = {
            id: 5,
            nombre: datos[0].nombre,
        };
    } catch (error) {
        console.error("Error: ", error.message);
        return res.json({message: "Hubo un error en el servidor, intente mas tarde"})
    }
    res.json({result: true, message: "usuario encontrado"})

}

const getUsers = async (req, res) =>{
      let datos;
    try {
        [datos] = await conn.query(`SELECT * FROM usuario`); //Agregar  columnas
        // datos.descuento = 0
        // console.log(datos)
        //console.log(datos)
        //const [datos] = await conn.query("SELECT ")
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }

    res.json({result: true, data: datos, message: "exito"})
   
}


export default {
    login,
    getUsers
}
