import Navbar from "../components/navbar";
import '../../styles/venta.css';
import AutocompleteInput from "../components/AutoComplete";
import ShowModal from "../components/showModal";
import Form from "../components/FormCreateExpediente";
import { useState } from "react";

const venta = () =>{

     const [modalOpen, setModalOpen] = useState(false);
     const [datosTabla, setdatosTabla] = useState([])

     const agregarDatosTabla = (data) =>{
        setdatosTabla([
            ...datosTabla,
            data
             
        ])
        console.log("Datos: ",datosTabla, data)
     }

    const btnRegistrarPaciente = () =>{
        setModalOpen(!modalOpen)

    }

    const btnGenerarVenta = () => {

    }
    
    return(<>
    <Navbar />
        
        <section className="containerTitulo">
                <h2 className="tituloVenta">Venta</h2>
                <button className="btnVentaRegistrarP" onClick={btnRegistrarPaciente}>Registrar Paciente</button>
                <button className="btnVentaBuscarProducto">Buscar Producto</button>
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
                    {datosTabla.map((element) =>{
                        return (
                            <tr>
                                <td>{element.nombre} </td>
                                <td>123 </td>
                                <td>123 </td>
                                <td>123 </td>
                                <td>123 </td>
                                <td>123 </td>
                                <td>123 </td>
                        
                    </tr>
                        )
                    })}
                    
                </tbody>
            </table>

            <section className="containerTotal">

                <label htmlFor="">Total</label>
                <input type="text"  disabled />
                 
            </section>
            <button className="btnAgregar" onClick={btnGenerarVenta}>Generar venta</button>

        
        </section>
        
         { modalOpen === true  ? <ShowModal open={btnRegistrarPaciente} form={<Form   ModalOpen={btnRegistrarPaciente} />} /> : null} 
            
        </main>
    </>)
}
export default venta