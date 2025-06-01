import { useState } from "react";
import Swal from "sweetalert2";
const FormEditarCategoria = ({ModalOpen, dato})=>{
    const [nombre, setNombre] = useState(dato.nombre);

    const btnGuardar = (event) =>{
            event.preventDefault();
            
            if(!nombre ) return  Swal.fire({title:"Alerta", text:"*El campo nombre es obligatorio", icon: "warning"} )
            if(dato.nombre === nombre ){
                  Swal.fire({title:"Alerta", text:"*No hubo modificacion en la categoria", icon: "success"} )
                return ModalOpen();
            } 
                fetch(`/api/categoria?nombreCategoria=${nombre}&&id=${dato.id}`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    nombre:nombre
                }),
                Credential: "include",
            })
                .then((res) => res.json())
                .then((res) => {
                    if(res.result){
                        Swal.fire({title:"Se ingreso con exito", text: "Categoria agregada", icon:"success"})
                        ModalOpen();
                    }else{
                         Swal.fire({title:"Error", text: res.message, icon:"error"})
                         ModalOpen();
                    }
                })
        }
    const btnCancelar = (event) =>{
        event.preventDefault();
        ModalOpen();
    }

    return(<>
            <form className="containerCategoria">
                <h2>Nueva Categoria</h2>
                <div className="input">
                    <label htmlFor="">*Nombre</label>
                    <input type="text" 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    />
            </div>
                <div className="ContainerBtns">
                <button  className="btnGuardar" onClick={btnGuardar}>Guardar</button>
                <button  className="btnCancelar"onClick={btnCancelar} >Cancelar</button>
                </div>
            </form>
    </>)
}

export default FormEditarCategoria;