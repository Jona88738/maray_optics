import { conn } from "../db/connectionMysql.js";

const getProducts =  async (req, res) => {
    let datos;
    try {
        [datos] = await conn.query(`SELECT pr.*, c.nombre as nombreCategoria FROM producto  pr
            JOIN categoria c ON c.id = pr.categoria
            WHERE pr.estado = 1`);
        // datos.descuento = 0
        // console.log(datos)
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
    if(req.body.sat_producto){
        valores.push(req.body.sat_producto)
        campos.push('sat_producto')
    }
    if(req.body.sat_unidad){
        valores.push(req.body.sat_unidad);
        campos.push('sat_unidad');
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

const bajaProducto = async (req, res) => {
    const {idProducto, cantidad, anotacion} = req.body;

    try {

        const [datos] = await conn.query("INSERT INTO baja_producto(cantidad, anotaciones, producto_id, usuario_id) values(?, ?, ?, ?)", [cantidad, anotacion, idProducto,  req.session.idUser]);
    
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }


    res.json({ result: true,  mensaje: "Productos agregado" })
}

const getBajaProducto = async (req, res) => {

    let datos;
    try {
        [datos] = await conn.query(`SELECT baja_producto.cantidad, baja_producto.anotaciones, DATE_FORMAT(baja_producto.fecha_baja, '%d/%m/%Y %H:%i:%s') AS fecha_formateada, usuario.nombre as nombreUser, producto.nombre FROM baja_producto
            INNER JOIN usuario ON usuario.id = baja_producto.usuario_id
            INNER JOIN producto ON producto.id = baja_producto.producto_id`);
        
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }

    res.json({result: true, data: datos, message: "exito"})
} 

export default {
    getProducts,
    insertProducto,
    updateProduct,
    deleteProducts,
    bajaProducto,
    getBajaProducto
}