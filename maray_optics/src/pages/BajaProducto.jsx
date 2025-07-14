import '../../styles/BajaProducto.css';
import AutocompleteInput from "../components/AutoComplete";
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";

const BajaProducto = ({btnRegresar}) =>{

    const [datos, setDatos] = useState({idProducto: 0, cantidad: "",stock_actual: 0,  anotacion: ""})

    const [productos, setProductos] =useState([]);

    const [valor, setValor] = useState('');
    const [productoCantidad, setProductoCantidad] = useState(0);
    const [actualizarDatos, setActualizarDatos] = useState(false);

    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 8;
    //  Nuevo estado para la búsqueda
    const [filtroNombre, setFiltroNombre] = useState('');

    useEffect(() =>{
        fetch('/api/producto/bajaProducto', {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
            .then(res => res.json())
            .then((res) => {
                if(res.result){
                    console.log(res.data)
                    setProductos(res.data)
                }else{
                    console.log("Error")
                }
            })

    },[actualizarDatos])


//  Aplicar filtro por nombre
    const datosFiltrados = productos.filter(item =>
        item.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) 
    );

     const totalPaginas = Math.ceil(datos.length / elementosPorPagina);
    
    const datosPaginados = datosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
);

    const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
        setPaginaActual(nuevaPagina);
    }
};




    const GuardarDatos = (e) =>{
        e.preventDefault();
        console.log("Mis datos: ", datos )
        if(!datos.anotacion || !datos.cantidad || datos.idProducto === 0 )  return Swal.fire({title:"Error", text: "Todos los campos con * son obligatorios", icon:"error"})
        fetch("/api/producto/bajaProducto", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(datos)
        })
            .then(res => res.json())
            .then((res) => {
                if(res.result){
                    Swal.fire({title: "Exito", text: "Se dio de baja correctamente el producto", icon: "success"})
                    setActualizarDatos(!actualizarDatos)
                    setDatos({idProducto: 0, cantidad: "",stock_actual: 0,  anotacion: ""})
                    setValor('');
                }else{
                    console.log("Error");
                }
            })
    }

    const onChangeDatos = (e) =>{
        const {name, value } = e.target;
        setDatos({
            ...datos,
            [name]: value
        })
        console.log(value)
    }
    const inputCodigo = (producto) =>{
        console.log(producto.id)
        setDatos({
            ...datos, 
            ['idProducto']: producto.id,
            ['stock_actual']: producto.cantidad,
        })
        
        
    }

    const btnLimpiar = (e) =>{
        e.preventDefault();
        console.log("Se  limpio");
        setDatos({idProducto: 0, cantidad: "",stock_actual: 0,  anotacion: ""})
        setValor('');
    }

    return(<>
        {/* <Navbar /> */}
        <h2></h2>
        
            <div className="containerTitulo">
                <button onClick={() => btnRegresar(0) } className="btnRegresar">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                
                    Regresar</button>
            </div>
            <section className="inputBusqueda">

                <h2>Baja Producto</h2>
                <hr />
                <form className="formBajaProducto">
                    
                    <div className="input">
                        
                        <label htmlFor="">*Codigo del producto</label>
                        <AutocompleteInput tabla={inputCodigo} valor={valor}  setValor={setValor}/>
                    </div>
                    <div className="input">
                        <label htmlFor="">*Cantidad</label>
                        <input type="number" name='cantidad' min={1} value={datos.cantidad} onChange={onChangeDatos} />
                    </div>
                    <div className="input" >
                        <label htmlFor="">Stock Actual</label>
                        <input type="number" disabled name='stock_actual' value={datos.stock_actual} onChange={onChangeDatos}/>
                    </div>
                    <div className="input" style={{width: '100%'}}>
                        <label htmlFor="">Anotaciones</label>
                        <textarea name='anotacion' value={datos.anotacion} onChange={onChangeDatos}/>
                    </div>
                    <div className="ContainerBtns" style={{width: '100%'}}>
                        <button className="btnLimpiar" onClick={btnLimpiar}>Limpiar</button>
                        <button className="btnGuardar" onClick={GuardarDatos} >Dar de baja</button>
                        
                        
                    </div>
                </form>

               
            </section>

        <section className="containerTabla">
        {/* <section className="inputBusqueda"> */}
                <div className="input" style={{marginBottom: '25px'}}>
                    <label htmlFor="">Buscar producto</label>
                    <input
                        type="text"
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}
                        placeholder="Buscar por nombre o código del producto"
                    />
                  
                </div>
                
            {/* </section> */}
            <section className="table-responsive">
                <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                    {/* <th>Imagen</th> */}
                    <th>Fecha de baja</th>
                    <th>Codigo del producto</th>
                    <th>Cantidad</th>
                    <th>Anotaciones</th>
                    <th>usuario</th>
                   
                    </tr>
                </thead>
                <tbody>

                    
               
                {datosFiltrados.length > 0 ? (
                                datosPaginados.map((element, index) => (
                                    <tr key={element.id}>
                                        {/* <td>{(paginaActual - 1) * elementosPorPagina + index + 1}</td> */}
                                        <td id="fecha_baja">{element.fecha_formateada}</td>
                                        <td id="nombre">{element.nombre}</td>
                                        <td id="cantidad">{element.cantidad}</td>
                                        <td id="anotaciones">{element.anotaciones}</td>
                                        <td id="precio">{element.nombreUser}</td>
                                        
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>No hay resultados</td>
                                </tr>
                            )}
                    

                </tbody>
            </table>
            </section>
        </section>
         
    </>)
}

export default BajaProducto;