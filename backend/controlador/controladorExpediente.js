import { conn } from "../db/connectionMysql.js"

const getExpedientes = async (req, res) =>{

     let datos;
    try {
        [datos] = await conn.query(`SELECT id, nombre, edad, apellido,DATE_FORMAT(fecha_nacimiento, '%d/%m/%Y') AS fecha_formateada, telefono, correo from expediente where estado = 1`);
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

const formatDate = (fecha) => {
    const [dia, mes, año] = fecha.split('/');
    return `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
};

const updateExpediente = async (req, res) => {

    try {
        const { id, nombre, apellido, fecha_formateada, edad, telefono, correo } = req.body;

        // Convertir la fecha al formato correcto
        const fecha_mysql = formatDate(fecha_formateada);

        //console.log("mi id: ",id);
        const [datos] = await conn.query(`UPDATE expediente set
            nombre = ?, apellido = ?, fecha_nacimiento = ?, edad = ?, telefono = ?, correo = ?  
            WHERE id = ?`,[nombre, apellido, fecha_mysql, edad, telefono, correo, id ])
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }
    res.json({ result: true,  mensaje: "Productos eliminado" })
    
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
    updateExpediente,
    deleteExpediente
}