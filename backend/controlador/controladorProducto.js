import { conn } from "../db/connectionMysql.js";

const getProducts =  async (req, res) => {
    let datos;
    try {
        [datos] = await conn.query('SELECT * FROM producto');

        //const [datos] = await conn.query("SELECT ")
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }

    res.json({result: true, data: datos, message: "exito"})
}

const insertProducto = async (req, res) => {
    const campos = ['codigo', 'nombre', 'costo_compra', 'precio_venta', 'cantidad', 'categoria', 'descripcion'];
    const valores = [req.body.codigo, req.body.nombre, req.body.costo_compra, req.body.precio_venta, req.body.existencias, req.body.categoria, req.body.descripcion]
    
    if(req.body.marca){
        valores.push(req.body.marca);
        campos.push('marca');
    }

    const values = campos.map(() => '?').join(', ')

    const sql = `INSERT INTO producto(${campos.join(', ')}) VALUES(${values}) `
    
    try {
        //const {codigo, nombre, costo_compra, existencia, marca, descripcion, categoria, precio_venta} = req.body;

        const [datos] = await conn.query(sql, valores);

         
    } catch (error) {
         console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }
    res.json({result: true, message: "exito"})
}

const deleteProducts = (req, res) => {

    res.json({ mensaje: "Productos obtenidos" })
}

export default {
    getProducts,
    insertProducto,
    deleteProducts,
}