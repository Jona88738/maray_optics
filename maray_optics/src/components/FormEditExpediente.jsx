import { useState } from "react";

const FormEditExpediente = ({dato}) =>{

     const [datos, setDatos] = useState(dato);
    console.log(datos)
        const onChangeDatos = (e) => {
            const {name, value} = e.target;
    
            setDatos({
                ...datos,
                [name]: value
            })
    
        }

        const formatearFechaParaInput = (fechaStr) => {
  if (!fechaStr) return '';
  const [dia, mes, anio] = fechaStr.split('/');
  return `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
};

    return(<>

     <main className="scroll">
            
            <form className="formLogin">
                <h2>Registro de pacientes</h2>
                <div className="input">
                    <label htmlFor="">*nombre</label>
                    <input type="text" placeholder="Ingresa el nombre"
                    name="nombre"
                    value={datos.nombre} 
                    onChange={onChangeDatos}/>
                </div>
                <div className="input">
                    <label htmlFor="">*Apellido</label>
                    <input type="text" placeholder="Ingresa el apellido"
                    name="apellido"
                    value={datos.apellido}
                    onChange={onChangeDatos} />
                </div>
                <div className="input">
                    <label htmlFor="">*Fecha de nacimiento</label>
                    <input type="date"
                    name="fechaNacimiento"
                    value={formatearFechaParaInput(datos.fecha_formateada)}
                    onChange={onChangeDatos} />
                </div>
                <div className="input">
                    <label htmlFor="">*Edad</label>
                    <input type="text" placeholder="Ingresa la edad"
                    name="edad"
                    value={datos.edad}
                    onChange={onChangeDatos}/>
                </div>
                <div className="input">
                    <label htmlFor="">*telefono</label>
                    <input type="text" placeholder="Ingresa el telefono"
                    name="telefono"
                    value={datos.telefono}
                    onChange={onChangeDatos}/>
                </div>
                <div className="input">
                    <label htmlFor="">*correo</label>
                    <input type="text" placeholder="Ingresa el correo"
                    name="correo"
                    value={datos.correo}
                    onChange={onChangeDatos}/>
                </div>
                <button   className="btnGuardar">Guardar</button>
            </form>
        </main>
    </>)
}

export default FormEditExpediente;