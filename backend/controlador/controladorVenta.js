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

const insertVenta = async (req, res) =>{
         const { dato, dataUsuario } = req.body;
    console.log("datos: ",dato, " DataUsuario: ", dataUsuario)

    let total =  dato.reduce((acc, actual) =>{
        return acc + actual.subtotal;
    },0)
    console.log("Este es el total: ",total)
    total = (total / 100).toFixed(2)
  const connection = await conn.getConnection();
   try {
     await connection.beginTransaction();
    const ValuesVenta = [total, dataUsuario.metodo_pago, dataUsuario.status];
    const camposventa = ['total','metodo_pago', 'status']

    if(dataUsuario.id !== -2){
      ValuesVenta.push(dataUsuario.id)
      camposventa.push('paciente_id')
    }
    if(dataUsuario.tipo !== undefined){
      ValuesVenta.push(dataUsuario.tipo)
      camposventa.push('tipo')
    }
    if(dataUsuario.pago_venta !== undefined){
      ValuesVenta.push(dataUsuario.pago_venta)
      camposventa.push('pago_venta')
    }

     const valuesVentasql = camposventa.map(() => '?').join(', ')

     const sql = `INSERT INTO venta(${camposventa.join(', ')}) VALUES(${valuesVentasql}) `

    console.log(camposventa)
    console.log(ValuesVenta)
    //  Inserta la venta general
    const [result] = await connection.query(sql, ValuesVenta)
    //  const [result] = await connection.query(
    //    'INSERT INTO venta (paciente_id, total, metodo_pago, status) VALUES (?, ?, ?, ?)',
    //    [dataUsuario.id, total, dataUsuario.metodo_pago, dataUsuario.status ]
    //  );

     const ventaId = result.insertId;

//     // Arreglo de productos
     const values = dato.map((item) => [
       ventaId,
       item.id,
       item.nombre,
       item.cantidad_compra,
       (item.precio_venta / 100).toFixed(2),
       (item.subtotal / 100).toFixed(2)
       
     ]);

//     // Un solo insert para todos los productos
    await connection.query(
       `INSERT INTO detalles_venta (venta_id, producto_id, nombre_producto, cantidad, precio_unitario, subtotal)
        VALUES ?`,
       [values]
     );

     await connection.commit();
    
   } catch (error) {
     await connection.rollback();
     console.error('Error en transacción:', error);
     res.status(500).json({ success: false, error: 'Error al registrar la venta.' });
   } finally {
     connection.release();
   }

    res.status(200).json({ success: true });
        
}

const detallesVenta = async (req, res) =>{

   try {
        const { id } = req.query;
        console.log("mi id: ",id);
        const [datos] = await conn.query(`SELECT v.fecha_inicio, e.nombre, e.telefono FROM venta v
          LEFT JOIN expediente e ON e.id  = v.paciente_id 
          WHERE v.id = ?`
          
          ,[id])
          console.log(datos);
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }
    res.json({ result: true,  mensaje: "Productos eliminado" })

  console.log("DetallesVenta")
  // res.json({})
}

export default {
    getVentas,
    insertVenta,
    detallesVenta
}