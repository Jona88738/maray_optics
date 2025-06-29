import { useState } from "react";
import Swal from "sweetalert2";
const FormEditarUser = ({ModalOpen, dato})=> {

    const [datos, setDatos] = useState(dato);
    console.log(datos)
    const onChangeDatos = (e) => {
        const {name, value} = e.target;

        setDatos({
            ...datos,
            [name]: value
        })

    }
    const btnGuardar = (e) =>{
        console.log("Mis dato: ", datos)
                e.preventDefault();
                if(!datos.usuario || !datos.nombre || !datos.apellidos || !datos.correo  || !datos.telefono ) return Swal.fire({title:"Alerta", text: "Todo los campos con * son obligatorios", icon: "warning"})
                if(datos.usuario === dato.usuario && datos.nombre === dato.nombre && datos.apellidos === dato.apellidos && datos.correo === dato.correo && datos.telefono === dato.telefono && datos.curp === dato.curp &&
                    datos.titulo_profesional === dato.titulo_profesional 
                ) {
                     Swal.fire({title:"Aviso", text: "Ningun dato  fue modificado", icon: "success"})
                     return ModalOpen()
                }
                
                fetch('/api/usuario',{
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
                        Swal.fire({title:"Se modifico con exito con exito", text: "Categoria agregada", icon:"success"})
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
                    name="apellidos"
                     value={datos.apellidos} 
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

                <button className="btnGuardar" onClick={btnGuardar}>Guardar</button>
        </form>
    </main>
    </>)
}
export default FormEditarUser