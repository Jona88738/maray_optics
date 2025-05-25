import { conn } from "../db/connectionMysql.js";

const getCategoria = async (req, res) =>{
    let datos;
    try {
        [datos] = await conn.query("SELECT * FROM categoria");

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


        
    } catch (error) {
        console.error("Error: ", error.message);
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }

    return res.json({result: true, message: "exito"})
}

const deleteCategoria = async (req, res) =>{

    try {
        const {idCategoria} = req.query;

        const [datos] = conn.query("UPDATE categoria set ")
        
    } catch (error) {
        console.error("Error: ", error.message);
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }

    return res.json({result: true, message: "exito"})
}

export default{
    getCategoria,
    insertCategoria,
    updateCategoria,
    deleteCategoria

}