import { conn } from "../db/connectionMysql.js"

const getExpedientes = async (req, res) =>{

     let datos;
    try {
        [datos] = await conn.query(`SELECT id,nombre, CONCAT(nombre,' ',apellido) AS nombre_completo, telefono, edad, apellido,DATE_FORMAT(fecha_nacimiento, '%d/%m/%Y') AS fecha_formateada, telefono, correo from expediente where estado = 1`);
        //console.log(datos)
        //const [datos] = await conn.query("SELECT ")
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }

    res.json({result: true, data: datos, message: "exito"})
    
}
const getListadoExpediente = async (req, res) => {

    
     let datos;
    try {
        const {id} = req.query;
        if(id === '0' ){
            [datos] = await conn.query(`SELECT consulta.id, CONCAT(expediente.nombre,' ', expediente.apellido) AS expedienteNombre, CONCAT(usuario.nombre,' ',usuario.apellidos) as nombre, DATE_FORMAT(consulta.fecha_consulta, '%d/%m/%Y') AS fecha_consulta FROM consulta 
            LEFT JOIN expediente ON expediente.id = consulta.paciente_id
            INNER JOIN usuario ON usuario.id = consulta.consulto
            ORDER BY consulta.fecha_consulta DESC;
           `);
        }else{

        
        [datos] = await conn.query(`SELECT CONCAT(usuario.nombre,' ',usuario.apellidos) as nombre, DATE_FORMAT(consulta.fecha_consulta, '%d/%m/%Y') AS fecha_consulta FROM consulta 
            INNER JOIN usuario ON usuario.id = consulta.consulto
            WHERE consulta.paciente_id = ?
            ORDER BY consulta.fecha_consulta DESC`,[id]);
        }
            //console.log(datos)
        //const [datos] = await conn.query("SELECT ")
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }

    res.json({result: true, data: datos, message: "exito"})
}

const getconsultaExpediente = async (req, res) => {

     let datos;
     let datosNotas;
     let detallesOjos;
    try {
        const {id} = req.query;
            [datos] = await conn.query(`SELECT detalles_oculares.* FROM consulta 
            INNER JOIN detalles_oculares ON detalles_oculares.consulta_id = consulta.id
            WHERE consulta.id = 7;

           `);
           [datosNotas] = await conn.query(`SELECT  consulta.notas_paciente, consulta.notas_medico, CONCAT(expediente.nombre,' ', expediente.apellido) AS  paciente FROM consulta 
            INNER JOIN expediente ON expediente.id = consulta.paciente_id
            WHERE consulta.id = 7

           `);
        detallesOjos = {
            right: { sphere: datos[0].esfera, cylinder: datos[0].cilindro, axis: datos[0].eje, addition: 32, dip: datos[0].dip , lco: datos[0].lc, kto: datos[0].kt, height: datos[0].alturo, avsco: datos[0].av_sc, avcco: datos[0].av_acc, prism: datos[0].prisma }, 
            left: { sphere: datos[1].esfera, cylinder: datos[1].cilindro, axis: datos[1].eje, addition: 32, dip: datos[1].dip , lco: datos[1].lc, kto: datos[1].kt, height: datos[1].alturo, avsco: datos[1].av_sc, avcco: datos[1].av_acc, prism: datos[1].prisma }
        }
            //console.log(datos)
        //const [datos] = await conn.query("SELECT ")
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }

    res.json({result: true, dataOjos: detallesOjos, dataNotas:datosNotas, message: "exito"})
    
}
const insertExpediente = async (req, res) => {

    try {
        const {nombre, apellido, fechaNacimiento, edad, telefono, correo }  = req.body;
    console.log(fechaNacimiento, "FEcha")
        const [datos] = await conn.query("INSERT INTO expediente(nombre, apellido, fecha_nacimiento, edad, telefono, correo) VALUES(?, ?, ?, ?, ?, ?)",[nombre, apellido, fechaNacimiento, edad, telefono, correo])
    } catch (error) {
        console.error("Error: ", error.message);
        return res.json({message: "Hubo un error en el servidor, intente mas tarde"})
    }

    return res.json({result: true, message: "exito"})
}

const formatDate = (fecha) => {
    const [dia, mes, año] = fecha.split('/');
    return `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
};

const updateExpediente = async (req, res) => {

    try {
        const { id, nombre, apellido, fecha_formateada, edad, telefono, correo } = req.body;

        // Convertir la fecha al formato correcto
        const fecha_mysql = formatDate(fecha_formateada);

        //console.log("mi id: ",id);
        const [datos] = await conn.query(`UPDATE expediente set
            nombre = ?, apellido = ?, fecha_nacimiento = ?, edad = ?, telefono = ?, correo = ?  
            WHERE id = ?`,[nombre, apellido, fecha_mysql, edad, telefono, correo, id ])
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }
    res.json({ result: true,  mensaje: "Productos eliminado" })
    
}
const deleteExpediente = async (req, res) => {

    try {
        const { id } = req.query;
        console.log("mi id: ",id);
        const [datos] = await conn.query('UPDATE expediente set estado = 0 WHERE id = ?',[id])
    } catch (error) {
        console.error("Error: ", error.message)
        return res.json({result: false, message: "hay un problema con el servidor, intente mas tarde"})
    }
    res.json({ result: true,  mensaje: "Productos eliminado" })
}

const consultaExpediente = async(req, res) =>{

      const connection = await conn.getConnection();
   try {
     await connection.beginTransaction();
        const idUser = req.session.idUser;
        const {patientNameOrCode, isAnonymousPatient, consultationDate, eyeExamData, patientNotes, internalDoctorNotes, informacionVenta }  = req.body;
        const campos = ['notas_paciente', 'notas_medico'];
        const values = [ patientNotes, internalDoctorNotes];
        if(informacionVenta.id != -2){
            campos.push('paciente_id');
            values.push(informacionVenta.id)
        }
        campos.push('consulto');
        values.push(idUser);
        const placeHolders = values.map(() => '?').join(', ')

        const consulta = `INSERT INTO consulta(${campos.join(', ')}) VALUES(${placeHolders})`
        console.log(patientNameOrCode, isAnonymousPatient, consultationDate, eyeExamData, patientNotes, internalDoctorNotes,informacionVenta )
        
      
        const [datos] = await connection.query(consulta, values)
        const consulta_id = datos.insertId;
        const {right, left} = eyeExamData;
const arrayValues = [
  [
    consulta_id,
    'derecho',
    right.sphere,
    right.cylinder,
    right.axis,
    right.dip,
    right.lco,
    right.kto,
    right.height,
    right.avsco,
    right.avcco,
    right.prism
  ],
  [
    consulta_id,
    'izquierdo',
    left.sphere,
    left.cylinder,
    left.axis,
    left.dip,
    left.lco,
    left.kto,
    left.height,
    left.avsco,
    left.avcco,
    left.prism
  ]
];
        //const rightConsulta = 

    const [consultaDetalles] = await connection.query(`INSERT INTO detalles_oculares(consulta_id,
        ojo, esfera, cilindro, eje, dip, lc, kt, altura, av_sc, av_acc, prisma ) VALUES ?`, [arrayValues])

    await connection.commit();

     
   } catch (error) {
     await connection.rollback();
     console.error('Error en transacción:', error);
     res.status(500).json({ success: false, error: 'Error al registrar la venta.' });
   } finally {
     connection.release();
   }


    return res.json({result: true, message: "exito"})

}
export default {
    getExpedientes,
    getListadoExpediente,
    getconsultaExpediente,
    insertExpediente,
    updateExpediente,
    deleteExpediente,
    consultaExpediente
}