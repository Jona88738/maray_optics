import { conn } from "../db/connectionMysql.js"

const tipoVenta = [	'venta', 'entrada', 'salida', 'devolucion']
const descripcion = [ 'PAGO A VENTA', 'DEVOLUCIÓN DE VENTA', 'ENTRADA - FONDO DE CAJA' ]

const getVentas = async (req, res) => {
let datos;

    try {
        [datos] = await conn.query(`SELECT v.*, e.nombre FROM venta v
            LEFT JOIN expediente e ON e.id  = v.paciente_id`);
       // console.log(datos)
       
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
    // if(dataUsuario.pago_venta !== undefined){
    //   ValuesVenta.push(dataUsuario.pago_venta)
    //   camposventa.push('pago_venta')
    // }

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

    if(dataUsuario.tipo === 2){

      const sentenciaPagosAdeudos = await connection.query(`INSERT INTO pago_realizado
        (cantidad_pago, metodo_pago, venta_id ) VALUES(?, ?, ?)`,[dataUsuario.pago_venta, dataUsuario.metodo_pago, ventaId]); 
    }




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
     
     let montoEfectivo = dataUsuario.tipo === 2 ? dataUsuario.pago_venta: total;
     const movimientoEfectivo = connection.query(`INSERT INTO movimiento_efectivo
      (descripcion, tipo,  monto, id_venta)
      VALUES(?, ?, ?, ? )`,[descripcion[0], tipoVenta[0], montoEfectivo, ventaId])

     await connection.commit();
     const hoy = new Date().toISOString().split('T')[0];
    console.log(ventaId);
     res.status(200).json({ success: true, idVenta: ventaId, totalVenta: total, fecha: hoy });
   } catch (error) {
     await connection.rollback();
     console.error('Error en transacción:', error);
     res.status(500).json({ success: false, error: 'Error al registrar la venta.' });
   } finally {
     connection.release();
   }

   
        
}

const deleteVenta = async (req, res) =>{
  const { motivo, regreArticulos, devoluEfectivo, idVenta, listaArticulos, total } = req.body;
  console.log("id_user: ",req.session.idUser )
  const campos = ["venta_id", "usuario_id"];
  const valores = [idVenta,  req.session.idUser];

  const connection = await conn.getConnection();    
    try {
      await connection.beginTransaction();

      if(motivo){
        campos.push("motivo");
        valores.push(motivo)
      }
      if(devoluEfectivo){
        campos.push("monto");
        valores.push(total);
      }
      const sqlCancelarVenta = `INSERT INTO devoluciones(${campos.join(', ')}) VALUES(${valores.map((element) => '?').join(', ')}) `;

       const [insertCancelarVenta] = await connection.query(sqlCancelarVenta,valores);

       const idDevolucion = insertCancelarVenta.insertId;

       const [sqlVentaCancelar] = await connection.query(`UPDATE venta SET status = ? WHERE id = ?`, [3, idVenta]);


      if(regreArticulos){
        
         const ids = listaArticulos.map(item => item.id_producto).join(',');

            const cantidadCase = listaArticulos
          .map(item => `WHEN ${item.id_producto} THEN cantidad + ${item.cantidad}`)
          .join(' ');

        const sql = `
          UPDATE producto
          SET cantidad = CASE id
            ${cantidadCase}
          END
          WHERE id IN (${ids});
        `;

        await connection.query(sql);

      }
      if(devoluEfectivo){

        const sqldevoEfectivo =  `INSERT INTO movimiento_efectivo
        (descripcion, tipo, monto, id_usuario, id_venta, id_devolucion)
        VALUES(?, ?, ? ,?, ?, ?)`;

        const [insertCancelarVenta] = await connection.query(sqldevoEfectivo,
          ['DEVOLUCIÓN DE VENTA', 'DEVOLUCION', total, req.session.idUser, idVenta ,idDevolucion,  ]);
      }
     

      

      await connection.commit();

     } catch (error) {
     await connection.rollback();
     console.error('Error en transacción:', error);
     res.status(500).json({ success: false, error: 'Error al registrar la venta.' });
   } finally {
     connection.release();
   }
    res.json({result: true, message: "exito"})

  //res.json({})
}


const detallesVenta = async (req, res) =>{

   try {
        const { id } = req.query;
        console.log("mi id: ",id);
        // const [datos] = await conn.query(`SELECT 
        //   v.fecha_inicio as fecha, v.tipo, v.status,
        //   e.nombre, e.telefono,

        //   dv.precio_unitario, dv.subtotal, dv.cantidad, 
        //   p.codigo, p.descripcion

          
        //   FROM venta v
        //   INNER JOIN detalles_venta dv ON  v.id = dv.venta_id
        //   INNER JOIN  producto p ON p.id = dv.producto_id
        //   LEFT JOIN expediente e ON e.id  = v.paciente_id 
          
        //   WHERE v.id = ?`
          
        //   ,[id])
        const [datos] = await conn.query(`
  SELECT JSON_OBJECT(
    'fecha', DATE_FORMAT(v.fecha_inicio, '%Y-%m-%d %H:%i:%s'),
    'id_venta', v.id,
    'tipo', v.tipo,
    'status', v.status,
    'nombre', e.nombre,
    'telefono', e.telefono,
    'pago_realizados', JSON_ARRAYAGG(
        JSON_OBJECT(
          'fecha', DATE_FORMAT(v.fecha_inicio, '%Y-%m-%d %H:%i:%s'),
          'cantidad_pago', pr.cantidad_pago,
          'metodo_pago', pr.metodo_pago
        )
    ),
    'articulos', JSON_ARRAYAGG(
      JSON_OBJECT(
        'id_producto', p.id,
        'precio_unitario', dv.precio_unitario,
        'subtotal', dv.subtotal,
        'cantidad', dv.cantidad,
        'codigo', p.codigo,
        'nombre', p.nombre,
        'descripcion', p.descripcion
      )
    )
  ) AS resultado
  FROM venta v
  INNER JOIN detalles_venta dv ON v.id = dv.venta_id
  INNER JOIN producto p ON p.id = dv.producto_id
  LEFT JOIN expediente e ON e.id = v.paciente_id
  LEFT JOIN pago_realizado pr ON pr.venta_id = v.id
  WHERE v.id = ?
  GROUP BY v.id
`, [id]);
          console.log(datos[0].resultado, "datosVentaDetalles");
          res.json({ result: true,  data: datos[0].resultado})
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }
    

  console.log("DetallesVenta")
  // res.json({})
}

const movimientoEfectivo = async (req,res)  =>{

  let datos;
    try {
        [datos] = await conn.query(`SELECT  DATE_FORMAT(fecha, '%Y-%m-%d %H:%i:%s') as fecha,  descripcion, monto FROM movimiento_efectivo`);
       // console.log(datos)
       
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }

    res.json({result: true, data: datos, message: "exito"})

}

export default {
    getVentas,
    insertVenta,
    deleteVenta,
    detallesVenta,
    movimientoEfectivo
}