import { conn } from "../db/connectionMysql.js"

const tipoVenta = [	'venta', 'Entrada', 'salida', 'devolucion']
const descripcion = [ 'PAGO A VENTA', 'DEVOLUCIÓN DE VENTA', 'ENTRADA - FONDO DE CAJA' ]

const getVentas = async (req, res) => {
let datos;

    try {
        [datos] = await conn.query(`SELECT 
          DATE_FORMAT(v.fecha_inicio, '%d/%m/%Y %H:%i:%s') AS fecha_formateada,
          v.*, e.nombre, e.apellido FROM venta v
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
    const ValuesVenta = [total, dataUsuario.metodo_pago, dataUsuario.status, req.session.idUser];
    const camposventa = ['total','metodo_pago', 'status', 'usuario_id']

    if(dataUsuario.id !== -2){
      ValuesVenta.push(dataUsuario.id)
      camposventa.push('paciente_id')
    }
    if(dataUsuario.tipo !== undefined){
      ValuesVenta.push(dataUsuario.tipo)
      camposventa.push('tipo')
    }
    if(dataUsuario.entradaEfectivo){
      ValuesVenta.push(dataUsuario.entradaEfectivo)
      camposventa.push('efectivoEntrada')
    }
    if(dataUsuario.cambio){
      ValuesVenta.push(dataUsuario.cambio)
      camposventa.push('cambio')
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

    if(dataUsuario.tipo === 1){

      const sentenciaPagosAdeudos = await connection.query(`INSERT INTO pago_realizado
        (cantidad_pago, metodo_pago, venta_id ) VALUES(?, ?, ?)`,[dataUsuario.pago_venta, dataUsuario.metodo_pago, ventaId]); 
    }

    const ids = dato.map(p => p.id).join(','); // "16,18,20"

    const cases = dato.map(p => `WHEN ${p.id} THEN cantidad - ${p.cantidad_compra}`).join('\n');

    const sentenciaProductos = `
      UPDATE producto
      SET cantidad = CASE id
        ${cases}
      END
      WHERE id IN (${ids});
    `;

    // Ejecutar la consulta
    await connection.query(sentenciaProductos);



//     // Arreglo de productos
     const values = dato.map((item) => [
       ventaId,
       item.id,
       item.nombre,
       item.cantidad_compra,
       (item.precio_venta / 100).toFixed(2),
       (item.subtotal / 100).toFixed(2),
       parseInt(item.descuento),
       
     ]);

//     // Un solo insert para todos los productos
    await connection.query(
       `INSERT INTO detalles_venta (venta_id, producto_id, nombre_producto, cantidad, precio_unitario, subtotal, descuento)
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
     

      await connection.query('UPDATE pago_realizado SET cantidad_pago = ? WHERE venta_id = ?',[0, idVenta])

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

const ingresarEfectivo = async (req, res) =>{
try {
        const {descripcion, tipo, monto, }  = req.body;

        const [datos] = await conn.query("INSERT INTO movimiento_efectivo(descripcion, tipo, monto, id_usuario) VALUES(?, ?, ?, ?)",[descripcion, tipo, monto, req.session.idUser])
    } catch (error) {
        console.error("Error: ", error.message);
        return res.json({message: "Hubo un error en el servidor, intente mas tarde"})
    }

    return res.json({result: true, message: "exito"})
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
//         const [datos] = await conn.query(`
//   SELECT JSON_OBJECT(
//     'fecha', DATE_FORMAT(v.fecha_inicio, '%Y-%m-%d %H:%i:%s'),
//     'id_venta', v.id,
//     'tipo', v.tipo,
//     'status', v.status,
//     'nombre', e.nombre,
//     'telefono', e.telefono,
//     'pago_realizados', JSON_ARRAYAGG(
//         JSON_OBJECT(
//           'fecha', DATE_FORMAT(pr.fecha, '%Y-%m-%d %H:%i:%s'),
//           'cantidad_pago', pr.cantidad_pago,
//           'metodo_pago', pr.metodo_pago
//         )
//     ),
//     'articulos', JSON_ARRAYAGG(
//       JSON_OBJECT(
//         'id_producto', p.id,
//         'precio_unitario', dv.precio_unitario,
//         'subtotal', dv.subtotal,
//         'cantidad', dv.cantidad,
//         'codigo', p.codigo,
//         'nombre', p.nombre,
//         'descripcion', p.descripcion
//       )
//     )
//   ) AS resultado
//   FROM venta v
//   INNER JOIN detalles_venta dv ON v.id = dv.venta_id
//   INNER JOIN producto p ON p.id = dv.producto_id
//   LEFT JOIN expediente e ON e.id = v.paciente_id
//   LEFT JOIN pago_realizado pr ON pr.venta_id = v.id
//   WHERE v.id = ?
//   GROUP BY v.id
// `, [id]);

 const [datos] = await conn.query(`
SELECT JSON_OBJECT(
    'fecha', DATE_FORMAT(v.fecha_inicio, '%Y-%m-%d %H:%i:%s'),
    'id_venta', v.id,
    'tipo', v.tipo,
    'status', v.status,
    'nombre', e.nombre,
    'telefono', e.telefono,
    'usuario_nombre', usuario.nombre,
    'pago_realizados', (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'fecha', DATE_FORMAT(pr.fecha, '%Y-%m-%d %H:%i:%s'),
                'cantidad_pago', pr.cantidad_pago,
                'metodo_pago', pr.metodo_pago
            )
        )
        FROM pago_realizado pr
        WHERE pr.venta_id = v.id
    ),
    'articulos', (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'id_producto', p.id,
                'precio_unitario', dv.precio_unitario,
                'subtotal', dv.subtotal,
                'cantidad', dv.cantidad,
                'codigo', p.codigo,
                'nombre', p.nombre,
                'descripcion', p.descripcion,
                'descuento', dv.descuento
            )
        )
        FROM detalles_venta dv
        INNER JOIN producto p ON p.id = dv.producto_id
        
        WHERE dv.venta_id = v.id
    )
) AS resultado
FROM venta v
LEFT JOIN expediente e ON e.id = v.paciente_id
INNER JOIN usuario usuario ON usuario.id = v.usuario_id
WHERE v.id = ?;

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
        [datos] = await conn.query(`SELECT  DATE_FORMAT(fecha, '%Y-%m-%d %H:%i:%s') as fecha,  descripcion, monto, tipo FROM movimiento_efectivo  WHERE id_corte IS NULL`);
       // console.log(datos)
       
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }

    res.json({result: true, data: datos, message: "exito"})

}

const pagoDiferido  = async (req, res) =>{

  try {
        const {pagoDiferido, id_venta}  = req.body;

        const [datosPagosSelect] = await conn.query(`
          SELECT SUM(pr.cantidad_pago) as totalPagos, venta.total FROM venta 
            INNER JOIN pago_realizado pr ON pr.venta_id = venta.id
            where venta.id = ?
          `,[id_venta])
          const restantePago = parseInt(datosPagosSelect[0].totalPagos) + parseInt(pagoDiferido);
          if(restantePago === parseInt(datosPagosSelect[0].total)){
            console.log("Finalizo la venta");
            const [datosVenta] = await conn.query(`UPDATE venta SET status = ? where  id = ?`,[1, id_venta])
          }

        const [datos] = await conn.query("INSERT INTO pago_realizado(cantidad_pago, metodo_pago, venta_id) VALUES(?, ?, ?)",[pagoDiferido, 'Efectivo', id_venta,])
    } catch (error) {
        console.error("Error: ", error.message);
        return res.json({message: "Hubo un error en el servidor, intente mas tarde"})
    }

    return res.json({result: true, message: "exito"})
}


const calculoMovimiento = (tipo, movimientoEfecto) =>{
  const valorDevolver = {valor: 0, count: 0};
    if(tipo === 'Entrada'){
      const valor = movimientoEfecto.reduce((valorAcumulado, valorActual) =>{
        if(valorActual.tipo === 'Entrada')  valorDevolver.count += 1;
        return valorActual.tipo === 'Entrada' ? ( valorAcumulado + parseInt(valorActual.monto)): valorAcumulado
      },0)
      valorDevolver.valor = valor
      return valorDevolver;
    }
    if(tipo === 'venta'){
      const valor = movimientoEfecto.reduce((valorAcumulado, valorActual) =>{
        if(valorActual.tipo === 'venta')  valorDevolver.count += 1;
        return valorActual.tipo === 'venta' ? ( valorAcumulado + parseInt(valorActual.monto)): valorAcumulado
      },0)
      valorDevolver.valor = valor
      return valorDevolver;
    }
    if(tipo === 'DEVOLUCION'){
      const valor = movimientoEfecto.reduce((valorAcumulado, valorActual) =>{
        if(valorActual.tipo === 'DEVOLUCION')  valorDevolver.count += 1;
        return valorActual.tipo === 'DEVOLUCION' ? ( valorAcumulado + parseInt(valorActual.monto)): valorAcumulado
      },0)
      valorDevolver.valor = valor
      return valorDevolver;
    }
    if(tipo === 'Retiro'){
      const valor = movimientoEfecto.reduce((valorAcumulado, valorActual) =>{
         if(valorActual.tipo === 'Retiro')  valorDevolver.count += 1;
        return valorActual.tipo === 'Retiro' ? ( valorAcumulado + parseInt(valorActual.monto)): valorAcumulado
      },0)
      valorDevolver.valor = valor
      return valorDevolver;
    }
  }

const corteCaja = async (req, res) => {

  try {
        const {fondoCaja, movimientoEfectivo, montoFondoCaja}  = req.body;
        const total_entradas = calculoMovimiento('Entrada', movimientoEfectivo)

        const total_venta = calculoMovimiento('venta', movimientoEfectivo);
        
        const total_salidas = calculoMovimiento('Retiro', movimientoEfectivo)
        const total_devoluciones = calculoMovimiento('DEVOLUCION', movimientoEfectivo)

        const [datos] = await conn.query(`INSERT INTO corte_caja
          (total_ventas, total_entradas, total_salidas, total_devoluciones, movimientos_ventas, movimientos_entradas, movimientos_salidas, movimientos_devoluciones, usuario_id)
          VALUES(?, ?, ?, ?, ?, ? , ?, ?, ? )`,[
            total_venta.valor, total_entradas.valor, total_salidas.valor, total_devoluciones.valor,
            total_venta.count,  total_entradas.count, total_salidas.count, total_devoluciones.count, req.session.idUser
           ])
        const corteCajaId =  datos.insertId

        const [datosMovimientoEfectivo] = await conn.query(`UPDATE movimiento_efectivo SET id_corte = ? WHERE id_corte IS NULL`,[corteCajaId])
        
           if(fondoCaja){

           const monto = montoFondoCaja === '' ? 0: parseInt(montoFondoCaja)
            const [datosFondoEntrada] = await conn.query('INSERT movimiento_efectivo(descripcion, tipo, monto, id_usuario) VALUES(?, ?, ?, ?)',[descripcion[2], tipoVenta[1], monto, req.session.idUser])
           }

    } catch (error) {
        console.error("Error: ", error.message);
        return res.json({message: "Hubo un error en el servidor, intente mas tarde"})
    }

    return res.json({result: true, message: "exito"})

}

export default {
    getVentas,
    insertVenta,
    deleteVenta,
    detallesVenta,
    movimientoEfectivo,
    pagoDiferido,
    ingresarEfectivo,
    corteCaja
}