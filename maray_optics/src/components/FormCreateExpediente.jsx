import { useState } from "react";
import Swal from "sweetalert2";

const FormCreateExpediente = ({ModalOpen}) => {

    const [datos, setDatos] = useState({nombre: "", apellido: "", edad: "", telefono: "", correo: "", fechaNacimiento: "" })
    
    const guardarDatos = (event) => {
      setDatos({
        ...datos,
         [event.target.name]: event.target.value,
      })  
      console.log(datos)
    }

    const btnGuardar = (e) => {
        e.preventDefault();
        if(!datos.nombre || !datos.apellido || !datos.edad || !datos.telefono || !datos.correo || !datos.fechaNacimiento) Swal.fire({title: "Alerta", text: "Todos los campos con * son obligatorios", icon: "warning"})
        
        fetch("http://localhost:3000/expedientes",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
             credentials: 'include',
             body: JSON.stringify(datos)
        })
        .then((res) => res.json())
        .then((res) =>{
            if(res.result){
                Swal.fire({title:"Se ingreso con exito", text: "Expediente agregado", icon:"success"})
                 ModalOpen();
            }
        })
        
        console.log(datos);
    }

    return (
        <>
        <main className="scroll">
            
            <form className="formLogin">
                <h2>Registro de pacientes</h2>
                <div className="input">
                    <label htmlFor="">*nombre</label>
                    <input type="text" placeholder="Ingresa el nombre"
                    name="nombre"
                    value={datos.nombre} 
                    onChange={guardarDatos}/>
                </div>
                <div className="input">
                    <label htmlFor="">*Apellido</label>
                    <input type="text" placeholder="Ingresa el apellido"
                    name="apellido"
                    value={datos.apellido}
                    onChange={guardarDatos} />
                </div>
                <div className="input">
                    <label htmlFor="">*Fecha de nacimiento</label>
                    <input type="date"
                    name="fechaNacimiento"
                    value={datos.fechaNacimiento}
                    onChange={guardarDatos} />
                </div>
                <div className="input">
                    <label htmlFor="">*Edad</label>
                    <input type="text" placeholder="Ingresa la edad"
                    name="edad"
                    value={datos.edad}
                    onChange={guardarDatos}/>
                </div>
                <div className="input">
                    <label htmlFor="">*telefono</label>
                    <input type="text" placeholder="Ingresa el telefono"
                    name="telefono"
                    value={datos.telefono}
                    onChange={guardarDatos}/>
                </div>
                <div className="input">
                    <label htmlFor="">*correo</label>
                    <input type="text" placeholder="Ingresa el correo"
                    name="correo"
                    value={datos.correo}
                    onChange={guardarDatos}/>
                </div>
                <button onClick={btnGuardar}  className="btnGuardar">Guardar</button>
            </form>
        </main>
        </>
    )
}

export default FormCreateExpediente;