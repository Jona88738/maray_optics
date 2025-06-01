import { conn } from "../db/connectionMysql.js"

const getVentas = async (req, res) => {
let datos;
    try {
        [datos] = await conn.query(`SELECT pr.*, c.nombre as nombreCategoria FROM producto  pr
            JOIN categoria c ON c.id = pr.categoria
            WHERE pr.estado = 1`);
        //console.log(datos)
        //const [datos] = await conn.query("SELECT ")
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }

    res.json({result: true, data: datos, message: "exito"})
}

export default {
    getVentas
}