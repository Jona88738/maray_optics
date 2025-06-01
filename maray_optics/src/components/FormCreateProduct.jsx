import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Form = ({ModalOpen}) => {

    const [datos, setDatos] = useState({codigo: "", nombre: "", costo_compra: "", existencias: "", marca: "", descripcion: "", categoria: "default", precio_venta: ""});
    const [datosCategoria, setDatosCategoria] = useState([]);

    useEffect(() =>{
        fetch("/api/categoria",{
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((res) =>{
            if(res.result){
                console.log("Entro", res)
                setDatosCategoria(res.data)
            }
        })
    },[])

    const btnGuardar = (e) =>{
        e.preventDefault();
        if(!datos.codigo || !datos.nombre || !datos.costo_compra || !datos.existencias  || !datos.descripcion || !datos.precio_venta  || datos.categoria === 'default') return Swal.fire({title:"Alerta", text: "Todo los campos con * son obligatorios", icon: "warning"})
        fetch('/api/producto',{
            method: 'POST',
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
    const guardarDatos = (event) =>{
        console.log(datos);
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
    });
    
    }
    const btnLimpiar = (e) =>{
        e.preventDefault();
        console.log("Se  limpio");
        setDatos({codigo: "", nombre: "", costo_compra: "", existencias: "", marca: "", descripcion: "", categoria: "default", precio_venta: ""})
    }
    return(<>
        
        <main className="scroll">
            <form className="formLogin" >
                <h2>Nuevo Producto</h2>
            <div className="inputLogin">
                <label htmlFor="">* Codigo</label>
                <input type="text"
                name="codigo"
                value={datos.codigo}
                placeholder="Codigo"
                onChange={guardarDatos} 
                />
            </div>
            <div className="inputLogin">
                <label htmlFor="">* Nombre</label>
                <input type="text"
                name="nombre"
                value={datos.nombre}
                placeholder="Nombre"
                onChange={guardarDatos} 
                />
                
            </div>
            <div className="inputLogin">
                <label htmlFor="">* Costo de compra</label>
                <input type="text" 
                name="costo_compra"
                placeholder="ingrese el costo de compra"
                value={datos.costo_compra}
                onChange={guardarDatos} 
                />
            </div>
          
            <div className="inputLogin">
                <label htmlFor="">* Existencias</label>
                <input type="text" 
                name="existencias"
                placeholder="ingrese la cantidad del producto"
                value={datos.existencias}
                onChange={guardarDatos} 
                />
            </div>
            <div className="inputLogin">
                <label htmlFor="">Marca</label>
                <input type="text" 
                name="marca"
                placeholder="ingrese la marca del producto"
                value={datos.marca}
                onChange={guardarDatos} 
                />
            </div>
            <div className="inputLogin">
                <label htmlFor="">* Descripcion</label>
                <input type="text" 
                name="descripcion"
                placeholder="Descripcion"
                value={datos.descripcion}
                onChange={guardarDatos} 
                />
            </div>
            <div className="inputLogin">
                <label htmlFor="">* Categoria</label>
                
                <select name="categoria" id="" value={datos.categoria} onChange={guardarDatos} >
                    <option value="default"> Selecciona una opcion</option>
                    {datosCategoria.map(element => {
                    return <option value={element.id}>{element.nombre}</option>

                    })}
                    
                </select>
            </div>
            <div className="inputLogin">
                <label htmlFor="">* Precio de venta</label>
                <input type="text" 
                name="precio_venta"
                placeholder="ingrese el precio de venta"
                value={datos.precio_venta}
                onChange={guardarDatos} 
                />
            </div>
            <div className="ContainerBtns">
                <button className="btnGuardar" onClick={btnGuardar}>Guardar</button>
                <button className="btnLimpiar" onClick={btnLimpiar}>Limpiar</button>
                
            </div>
            
            </form>
        </main>
        
    </>)
}
export default Form;