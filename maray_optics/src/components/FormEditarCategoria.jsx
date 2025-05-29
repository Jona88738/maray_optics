import { useState } from "react";

const FormEditarCategoria = ({ModalOpen, dato})=>{
    const [nombre, setNombre] = useState(dato.nombre);

    const btnGuardar = (event) =>{
            event.preventDefault();
            
            if(!nombre ) return  Swal.fire({title:"Alerta", text:"*El campo nombre es obligatorio", icon: "warning"} )
            if(dato.nombre === nombre ){
                  Swal.fire({title:"Alerta", text:"*No hubo modificacion en la categoria", icon: "success"} )
                return ModalOpen();
            } 
                fetch("http://localhost:3000/categoria",{
                method: "EDIT",
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
    
                    }
                })
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
                
                <button  className="btnGuardar" onClick={btnGuardar}>Guardar</button>
                <button>Cancelar</button>
            </form>
    </>)
}

export default FormEditarCategoria;