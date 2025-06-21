import { conn } from "../db/connectionMysql.js"

const getExpedientes = async (req, res) =>{

     let datos;
    try {
        [datos] = await conn.query(`SELECT id, nombre, edad, apellido from expediente where estado = 1`);
        //console.log(datos)
        //const [datos] = await conn.query("SELECT ")
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }

    res.json({result: true, data: datos, message: "exito"})
    
}

const insertExpediente = async (req, res) => {

    try {
        const {nombre, apellido, fechaNacimiento, edad, telefono, correo }  = req.body;

        const [datos] = await conn.query("INSERT INTO expediente(nombre, apellido, fecha_nacimiento, edad, telefono, correo) VALUES(?, ?, ?, ?, ?, ?)",[nombre, apellido, fechaNacimiento, edad, telefono, correo])
    } catch (error) {
        console.error("Error: ", error.message);
        return res.json({message: "Hubo un error en el servidor, intente mas tarde"})
    }

    return res.json({result: true, message: "exito"})
}

const deleteExpediente = async (req, res) => {

    try {
        const { id } = req.query;
        console.log("mi id: ",id);
        const [datos] = await conn.query('UPDATE expediente set estado = 0 WHERE id = ?',[id])
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }
    res.json({ result: true,  mensaje: "Productos eliminado" })
}

export default {
    getExpedientes,
    insertExpediente,
    deleteExpediente
}