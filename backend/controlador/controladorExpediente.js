import { conn } from "../db/connectionMysql.js"

const getExpedientes = (req, res) =>{

    return res.json({})
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

export default {
    getExpedientes,
    insertExpediente
}