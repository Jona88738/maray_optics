import { conn } from "../db/connectionMysql.js"

const getVentas = async (req, res) => {
let datos;
    try {
        [datos] = await conn.query(`SELECT v.*, e.nombre FROM venta v
            LEFT JOIN expediente e ON e.id  = v.paciente_id`);
        console.log(datos)
       
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }

    res.json({result: true, data: datos, message: "exito"})
}

const insertVenta = (req, res) =>{
        const [dato] = req.body;
        // const {dato} = req.body;
        console.log(dato)

        res.json({})
}

export default {
    getVentas,
    insertVenta
}