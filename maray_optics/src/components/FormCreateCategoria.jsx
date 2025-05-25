import { useState } from "react";
import Swal from "sweetalert2";

const FormCreateCategoria = ({ModalOpen}) =>{
    const [nombre, setNombre] = useState("");
    const btnGuardar = (event) =>{
        event.preventDefault();
        if(!nombre) return  Swal.fire({title:"Alerta", text:"*El campo nombre es obligatorio", icon: "warning"} )
        fetch("http://localhost:3000/categoria",{
            method: "POST",
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
    <main>
        
        <form className="containerCategoria" >
            <h2>Nueva Categoria</h2>
            <div className="input">
                <label htmlFor="">*Nombre</label>
                <input type="text" 
                
                onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <button className="btnGuardar" onClick={btnGuardar} >Guardar</button>
        </form>
        

    </main>
        
    </>)
}

export default FormCreateCategoria;