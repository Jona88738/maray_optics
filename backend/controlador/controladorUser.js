import { json } from "express";
import {conn} from "../db/connectionMysql.js"
import { encryptPass,verificationPass } from "../utilis/fileHelperUser.js";

const login = async (req, res) =>{
    try {
        const {usuario, password} = req.query;

        const [datos] = await conn.query("SELECT * FROM usuario WHERE usuario = ? ", [usuario]);
        //console.log(datos)
        if(datos.length <= 0) return res.json({result: false, message: "Verifica los datos"})

      const contra = await verificationPass(password, datos[0].password);
      if (contra === false) return res.status(404).json({ result: false, message: "usuario encontrado" });
        
      
    
        req.session.idUser = datos[0].id;
        req.session.nombre = datos[0].nombre;
        req.session.id_rol = datos[0].id_rol;
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
        [datos] = await conn.query(`SELECT usuario.*, DATE_FORMAT(usuario.registro, '%d/%m/%Y') AS fecha_formateada, CONCAT(usuario.nombre,' ', usuario.apellidos) AS nombreC, roles.nombre as rol_nombre FROM usuario
            INNER JOIN roles ON roles.id = id_rol
          where estado = 1`); //Agregar  columnas
       
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }

    res.json({result: true, data: datos, message: "exito"})
   
}

const sesion = (req,res) =>{

  const MySesion = req.session.idUser;
  console.log("Esta es la session",MySesion,": id_rol",req.session.id_rol );

  if(MySesion === undefined){
  return  res.json({"Valor":false})
  }

 return  res.json({"Valor":true, 'usuario': req.session.id_rol})
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
const insertUser = async (req, res) =>{
  const {usuario, nombre, apellido, contraseña, correo, telefono, curp, titulo_profesional, nivel} = req.body;
  const password  = await encryptPass(contraseña);
  const valores = [usuario, nombre, apellido, password, correo, telefono, parseInt(nivel)];
  const campos = ['usuario', 'nombre', 'apellidos', 'password', 'correo', 'telefono', 'id_rol'];

  if(curp){
    valores.push(curp);
    campos.push('curp')
  }
  if(titulo_profesional){
    valores.push(titulo_profesional);
    campos.push('titulo_profesional');
  }
  
  const values = campos.map(() => '?').join(', ');
  
  const sentenciasql = `INSERT INTO usuario(${campos.join(', ')}) VALUES(${values})`;
  try {

    const [result] = await conn.query(sentenciasql, valores);

    
  } catch (error) {
    console.error("Error: ", error.message)
    return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
  }
  return res.json({result: true, message: "exito"})
}

const deleteUser = async (req, res) =>{

  const {id} = req.query;

   try {
        
        console.log("mi id: ",id);
        const [datos] = await conn.query('UPDATE usuario set estado = 0 WHERE id = ?',[id])
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }
    res.json({ result: true,  mensaje: "Productos eliminado" })

  //return res.json({})
}

const updateUsuario = async (req, res) => {

    try {
        const { id, usuario, nombre, apellidos, correo, telefono, curp, titulo_profesional } = req.body;
        const campos = ['usuario', 'nombre', 'apellidos', 'correo', 'telefono' ];
        const valores = [usuario, nombre, apellidos, correo, telefono];
        if(curp !== null){

          if(curp === ''){
            campos.push('curp');
            valores.push(null);
          }
          if(curp){
            campos.push('curp');
            valores. push(curp);
          }
        }

        if(titulo_profesional !== null){

          if(titulo_profesional === ''){
            campos.push('titulo_profesional');
            valores.push(null);
          }
          if(titulo_profesional){
            campos.push('titulo_profesional');
            valores.push(titulo_profesional);
          }
        }
       
  const setClause = campos.map(campo => `${campo} = ?`).join(', ');

  // Agregar ID al final para la cláusula WHERE
  valores.push(id);

  const sentencia = `UPDATE usuario SET ${setClause} WHERE id = ?`;
  const [datos] = await conn.query(sentencia, valores);

    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }
    res.json({ result: true,  mensaje: "Productos eliminado" })
    
}

export default {
    login,
    getUsers,
    sesion,
    Logout,
    insertUser,
    deleteUser,
    updateUsuario
}
