import { useState } from "react";
import Swal from "sweetalert2";

const FormCreateUser = ({ModalOpen, dato}) => {

    const [datos, setDatos] = useState({usuario: '', nombre: '', apellido: '', contraseña: '', correo: '',  telefono: '', curp: '', titulo_profesional: ''})

    const onChangeDatos = (e) => {
        const {name, value} = e.target;

        setDatos({
            ...datos,
            [name]: value
        })

    }

    const guardarDatos = (e) => {
        e.preventDefault();
        const exiteUsuario = dato.some(p => p.usuario === datos.usuario);
        if(exiteUsuario) return  Swal.fire({title: "Alerta", text: "Error, ese usuario ya existe, intenta con otro", icon: "warning"})
        console.log("Existe usuario: ", exiteUsuario)
        console.log(datos)

        fetch("/api/usuario", {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(datos)
        })
            .then(res => res.json())
            .then((res) =>{
                if(res.result){
                    Swal.fire({title:"Se registro con exito", text: "Usuario registrado", icon:"success"})
                    ModalOpen()
                }
            })
    }
    return(<>
    <main className="scroll">
        <form className="formLogin">
            <h2>Registro de Usuarios</h2>
                <div className="input">
                    <label htmlFor="">*Usuario</label>
                    <input type="text" placeholder="Ingresa un usuario con el cual vas a ingresar a tu cuenta."
                    name="usuario"
                     value={datos.usuario} 
                     onChange={onChangeDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">*nombre</label>
                    <input type="text" placeholder="Ingresa el nombre"
                    name="nombre"
                     value={datos.nombre} 
                     onChange={onChangeDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">*Apellidos</label>
                    <input type="text" placeholder="Ingresa el apellido"
                    name="apellido"
                     value={datos.apellido} 
                     onChange={onChangeDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">*Contraseña</label>
                    <input type="password" placeholder="Ingresa la contraseña"
                    name="contraseña"
                     value={datos.contraseña} 
                     onChange={onChangeDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">*Correo</label>
                    <input type="text" placeholder="Ingresa el correo"
                    name="correo"
                     value={datos.correo} 
                     onChange={onChangeDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">*Telefono</label>
                    <input type="text" placeholder="Ingresa tu telefono"
                    name="telefono"
                     value={datos.telefono} 
                     onChange={onChangeDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">Curp</label>
                    <input type="text" placeholder="Ingresa tu curp"
                    name="curp"
                     value={datos.curp} 
                     onChange={onChangeDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">Titulo profesional</label>
                    <input type="text" placeholder="Ingresa tu curp"
                    name="titulo_profesional"
                     value={datos.titulo_profesional} 
                     onChange={onChangeDatos}
                    />
                </div>

                <button className="btnGuardar" onClick={guardarDatos}>Guardar</button>
        </form>
    </main>
           
    </>)
}

export default FormCreateUser;