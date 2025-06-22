import { json } from "express";
import {conn} from "../db/connectionMysql.js"


const login = async (req, res) =>{
    try {
        const {usuario, password} = req.query;

        const [datos] = await conn.query("SELECT * FROM usuario WHERE usuario = ? && password = ?", [usuario, password]);
        console.log(datos)
        if(datos.length <= 0) return res.json({result: false, message: "Verifica los datos"})
        req.session.idUser = datos[0].id;
        req.session.nombre = datos[0].nombre;
        // req.session.usuario = {
        //     idUser: datos[0].id,
        //     nombre: datos[0].nombre,
        // };
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

const sesion = (req,res) =>{

  const MySesion = req.session.idUser;
  console.log("Esta es la session",MySesion);

  if(MySesion === undefined){
  return  res.json({"Valor":false})
  }

 return  res.json({"Valor":true})
}

const Logout = (req,res) => {
     // Destruye la sesión
   req.session.destroy((err) => {
    if (err) {
      return res.send('Error al cerrar sesión');
    }
    //res.redirect('/login');
  //  console.log("salio "+ req.session.idUser)
    res.status(200).json({

      "message":true
    })
  });
}
const insertUser = (req, res) =>{
  const {usuario, nombre, apellido, contraseña, correo, telefono, curp, titulo_profesional} = req.body;

  const valores = [usuario, nombre, apellido, contraseña, correo, telefono];
  const campos = ['usuario', 'nombre', 'apellidos', 'password', 'correo', 'telefono'];

  if(curp){
    valores.push(curp);
    campos.push('curpo')
  }
  if(titulo_profesional){
    valores.push(titulo_profesional);
    campos.push('titulo_profesional');
  }
  const sentenciasql = "INSERT INTO "
  try {
    
  } catch (error) {
    console.error("Error: ", error.message)
    return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
  }
  return req.json({})
}

export default {
    login,
    getUsers,
    sesion,
    Logout,
    insertUser
}
