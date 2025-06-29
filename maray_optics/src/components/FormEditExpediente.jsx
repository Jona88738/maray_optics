import { useState } from "react";
import Swal from "sweetalert2";
const FormEditExpediente = ({ModalOpen, dato}) =>{

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

 const btnGuardar = (e) =>{
    console.log("Datos: ", datos, "dato:",dato )
                e.preventDefault();
                if(!datos.nombre || !datos.apellido || !datos.fecha_formateada  || !datos.edad || !datos.telefono || !datos.correo) return Swal.fire({title:"Alerta", text: "Todo los campos con * son obligatorios", icon: "warning"})
                if( datos.nombre === dato.nombre && datos.apellido === dato.apellido && datos.fecha_formateada === dato.fecha_formateada && datos.edad === dato.edad && datos.telefono === dato.telefono &&
                    datos.correo === dato.correo 
                ) {
                     Swal.fire({title:"Aviso", text: "Ningun dato  fue modificado", icon: "success"})
                     return ModalOpen()
                }
                
                fetch('/api/expedientes',{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(datos)
            
                })
                .then((res) => res.json())
                .then((res) =>{
                    if(res.result){
                        Swal.fire({title:"Se ingreso con exito", text: "Categoria agregada", icon:"success"})
                        ModalOpen();
                        //console.log("Producto registrado");
                    }else{
                        console.log("algo fallo", res.result)
                    }
                })
                console.log("Se guardo");
            }


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
                <button  onClick={btnGuardar}  className="btnGuardar">Guardar</button>
            </form>
        </main>
    </>)
}

export default FormEditExpediente;