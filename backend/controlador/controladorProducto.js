import { conn } from "../db/connectionMysql.js";

const getProducts =  async (req, res) => {
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

const updateProduct = async (req, res) => {
     const campos = ['codigo', 'nombre', 'costo_compra', 'precio_venta', 'cantidad', 'categoria', 'descripcion'];
    const valores = [req.body.codigo, req.body.nombre, req.body.costo_compra, req.body.precio_venta, req.body.cantidad, req.body.categoria, req.body.descripcion]   
        console.log(req.body.marca )

       if (req.body.marca !== '' ) {
        campos.push('marca');
        valores.push(req.body.marca);
        }else if(req.body.marca === ''){
           campos.push('marca');
        valores.push(null); 
        }

    // Asegúrate de que venga el ID del producto
    const id = req.body.id;
    //console.log("Este es mi id: ", id);
    if (!id) {
        return res.status(400).json({ result: false, message: 'Falta el ID del producto para actualizar.' });
    }

    // Agregamos el ID al final para el WHERE
    valores.push(id);

    const setClause = campos.map(campo => `${campo} = ?`).join(', ');
    const sql = `UPDATE producto SET ${setClause} WHERE id = ?`;

    try {
        const [result] = await conn.query(sql, valores);

        if (result.affectedRows === 0) {
            return res.json({ result: false, message: 'No se encontró el producto a actualizar.' });
        }

        res.json({ result: true, message: 'Producto actualizado con éxito' });
    } catch (error) {
        console.error('Error al actualizar producto:', error.message);
        res.status(500).json({ result: false, message: 'Error en el servidor al actualizar el producto.' });
    }

}

const deleteProducts = async (req, res) => {

    try {
        const { id } = req.query;
        console.log("mi id: ",id);
        const [datos] = await conn.query('UPDATE producto set estado = 0, cantidad = 0 WHERE id = ?',[id])
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }
    res.json({ result: true,  mensaje: "Productos eliminado" })
}

export default {
    getProducts,
    insertProducto,
    updateProduct,
    deleteProducts,
}