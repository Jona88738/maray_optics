import { conn } from "../db/connectionMysql.js";

const getCategoria = async (req, res) =>{
    let datos;
    try {
        // [datos] = await conn.query("SELECT * FROM categoria WHERE estado = 1");
         [datos] = await conn.query(`SELECT SUM(p.cantidad) AS cantidadTotal, COUNT(p.categoria) as registroTotal, c.nombre, c.id FROM categoria c 
                                    LEFT JOIN producto p ON p.categoria = c.id  && p.estado != 0
                                    WHERE c.estado = 1
                                    GROUP BY c.nombre, c.id`);
        //console.log(datos)
        //console.log(datos)
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }
    res.json({result: true, data: datos, message: "exito"})
}

const insertCategoria = async (req, res) => {
    let datos;
    try {
        const {nombre} = req.body;

         [datos] = await conn.query("INSERT INTO categoria(nombre) VALUES(?)",[nombre])
         
         if(datos.affectedRows <= 0) return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }

    return res.json({result: true})
}
const updateCategoria = async (req, res) =>{
    try {
        const {nombreCategoria, id} = req.query;
        //console.log(nombreCategoria, " ", id)
        const [result] = await conn.query("UPDATE  categoria set nombre = ? WHERE id = ?",[nombreCategoria, id]);
        //console.log("resultado: ", result.affectedRows);

        return result.affectedRows > 0 ? res.json({result: true, message: "exito"}) :  res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    } catch (error) {
        console.error("Error: ", error.message);
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }

   
}

const deleteCategoria = async (req, res) =>{

    try {
        const {id} = req.query;
        
        const [result] = await conn.query("UPDATE categoria set estado = 0 WHERE id = ?",[id]);

        return result.affectedRows > 0 ? res.json({result: true, message: "exito"}) :  res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    } catch (error) {
        console.error("Error: ", error.message);
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }

   
}

export default{
    getCategoria,
    insertCategoria,
    updateCategoria,
    deleteCategoria

}