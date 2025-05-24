import { useState } from "react";

const Form = () => {

    const [datos, setDatos] = useState({codigo: ''});

    const btnGuardar = (e) =>{
        e.preventDefault();
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
                placeholder="Nombre"
                onChange={guardarDatos} 
                />
                
            </div>
            <div className="inputLogin">
                <label htmlFor="">* Costo de compra</label>
                <input type="text" 
                name="costo_compra"
                placeholder="ingrese el costo de compra"
                onChange={guardarDatos} 
                />
            </div>
            {/* <div className="inputLogin">
                <label htmlFor="">* Codigo</label>
                <input type="text" 
                name="codigo"
                placeholder="Codigo"
                onChange={guardarDatos} 
                />
            </div> */}
            <div className="inputLogin">
                <label htmlFor="">* Existencias</label>
                <input type="text" 
                name="existencia"
                placeholder="ingrese la cantidad del producto"
                onChange={guardarDatos} 
                />
            </div>
            <div className="inputLogin">
                <label htmlFor="">* Marca</label>
                <input type="text" 
                name="Marca"
                placeholder="ingrese la marca del producto"
                onChange={guardarDatos} 
                />
            </div>
            <div className="inputLogin">
                <label htmlFor="">* Descripcion</label>
                <input type="text" 
                name="descripcion"
                placeholder="Descripcion"
                onChange={guardarDatos} 
                />
            </div>
            <div className="inputLogin">
                <label htmlFor="">* Categoria</label>
                <input type="text" />
            </div>
            <div className="inputLogin">
                <label htmlFor="">* Precio de venta</label>
                <input type="text" 
                name="precio_venta"
                placeholder="ingrese el precio de venta"
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