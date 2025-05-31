import Navbar from "../components/navbar";
import '../../styles/venta.css';
import AutocompleteInput from "../components/AutoComplete";
import ShowModal from "../components/showModal";
import Form from "../components/FormCreateExpediente";
import { useState } from "react";
import CatalogoProducto from "../components/CatalogoProductos";

const venta = () =>{

     const [modalOpen, setModalOpen] = useState(false);
     const [datosTabla, setdatosTabla] = useState([])
    const [total, setTotal]  = useState();

     const  [modalOpenAll, setmodalOpenAll] = useState({action: 0, datos:""});

     function decimalToCentavos(valor) {
        return Math.round(valor * 100); // redondea a centavos
    }

    const totall =datosTabla.reduce((acc, valorActual) =>{return acc += valorActual.subtotal; },0);

     const agregarDatosTabla = (data) =>{
        setdatosTabla([
            ...datosTabla,
            data,
        ])
        console.log("Datos: ",datosTabla, data)
     }

    const btnRegistrarPaciente = () =>{
        setModalOpen(!modalOpen)

    }

    const btnBuscarProducto = () =>{
        setmodalOpenAll({
            ...modalOpenAll,
            action: 1
        })
    }
    const btnCerrarBuscarProducto = () =>{
        setmodalOpenAll({
            ...modalOpenAll,
            action: 0
        })
    }

    const btnGenerarVenta = () => {
        console.log("Se genero la venta: ", datosTabla)
    }
    const handleChangeCantidad = (element,event) =>{
        console.log(element,event.target.value)
        
        const nuevosDatos = datosTabla.map((elemento) =>{
            const result = elemento.nombre === element.nombre ? true: false;
            if(result && element.cantidad_compra < parseInt(event.target.value)){
                elemento.subtotal +=  element.precio_venta;
                element.cantidad_compra += 1;
                
            }else if(result){
                elemento.subtotal -= element.precio_venta;
                element.cantidad_compra -= 1;
            }

            return elemento;
            console.log("resultado de busqued", result);
        })

        console.log("Nuevos datos: ", nuevosDatos)
         setdatosTabla(nuevosDatos)
        console.log("datosTable: ",datosTabla)
        
    }
    
    return(<>
    <Navbar />
        
        <section className="containerTitulo">
                <h2 className="tituloVenta">Venta</h2>
                <button className="btnVentaRegistrarP" onClick={btnRegistrarPaciente}>Registrar Paciente</button>
                <button className="btnVentaBuscarProducto" onClick={btnBuscarProducto}>Buscar Producto</button>
            </section>
        <main className="containerProducts"> 
            
        <section className="inputBusqueda">
            <div className="input">
            <label htmlFor="">Buscar Producto</label>
            <input type="text" />
            </div>

        </section>

        <section className="containerTabla">
            <h2>Productos</h2>

            <div className="input">
               
                <AutocompleteInput tabla={agregarDatosTabla}/>
            </div>

            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Descripcion</th>
                        <th>Cantidad</th>
                        <th>Existencia</th>
                        <th>Precio</th>
                        <th>Descuento</th>
                        <th>SubTotal</th>
                    </tr>
                </thead>
                <tbody>
                    {console.log("datosTable: ",datosTabla)}
                    {
                    
                    datosTabla.map((element) =>{

                        return (
                            <tr>
                                <td>{element.nombre} </td>
                                <td>{element.descripcion} </td>
                                <td> <input type="number" placeholder="Cantidad" min={1} value={element.cantidad_compra}  onChange={(event) =>handleChangeCantidad(element,event)}/> </td>
                                <td>{element.cantidad}</td>
                                <td>{ (element.precio_venta / 100).toFixed(2)} </td>
                                <td> <input type="number" placeholder="Descuento" min={0} value={0} /> </td>
                                <td>{(element.subtotal / 100).toFixed(2) } </td>
                        
                    </tr>
                        )
                    })}
                    
                </tbody>
            </table>

            <section className="containerTotal">

                <label htmlFor="">Total</label>
                {/* Usa useMemo() */}
                <input type="text" value={ (totall / 100).toFixed(2)  
                }  disabled />
                 
            </section>
            <button className="btnAgregar" onClick={btnGenerarVenta}>Generar venta</button>

        
        </section>
        
         { modalOpen === true  ? <ShowModal open={btnRegistrarPaciente} form={<Form   ModalOpen={btnRegistrarPaciente} />} /> : null} 
         { modalOpenAll.action === 1  ? <ShowModal open={btnCerrarBuscarProducto} form={<CatalogoProducto ModalOpen={btnCerrarBuscarProducto} dato={modalOpenAll.datos}/>} /> : null} 
        </main>
    </>)
}
export default venta