import Navbar from "../components/navbar";
import '../../styles/venta.css';
import AutocompleteInput from "../components/AutoComplete";
import ShowModal from "../components/showModal";
import Form from "../components/FormCreateExpediente";
import { useState } from "react";
import CatalogoProducto from "../components/CatalogoProductos";
import ListadoProducto from "./ListadoVentas.jsx";
import React, { useRef } from "react";
import OpcionesVenta from "../components/OpcionesVenta.jsx";
import SelectorUsuarios from '../components/SelectorUsuarios.jsx';

import { useReactToPrint } from 'react-to-print';
import Ticket from "../components/ImprimirTicket.jsx"; // Asegúrate de que la ruta coincida
import Swal from "sweetalert2";
//
// console.log('Ticket:', Ticket);

const Venta = () =>{
 const [cambiarPage, setCambiarPage] = useState({action: 0});
 const [modalOpen, setModalOpen] = useState(false);
 const [datosTabla, setdatosTabla] = useState([])
 const  [modalOpenAll, setmodalOpenAll] = useState({action: 0, datos:""});

 const manejarSeleccion = (usuario) => {
    console.log('Usuario seleccionado:', usuario);
  };

const contentRef = useRef(null);
// size: 50mm 150mm;
  const handlePrint =  useReactToPrint({
    contentRef,
    pageStyle: `
    @page {
      size: 80mm auto;
      margin: 0;
    }

    body {
      -webkit-print-color-adjust: exact;
      font-family: monospace;
    }
  `,
  });

  const btnGenerarVenta = () =>{

    if(datosTabla.length === 0)  return Swal.fire({title:"Alerta!", text: "Primeros tienes que agregar articulos a la venta", icon: "warning"})
    setmodalOpenAll({
            ...modalOpenAll,
            action: 2,
            
        })
    // console.log("re")
    // handlePrint()
    // console.log("Ya imprimio")
  }

  const verPage = (opcion) =>{
    console.log( typeof opcion, "Mi opcion")
    setCambiarPage({action: opcion})
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
            
        })

        console.log("Nuevos datos: ", nuevosDatos)
         setdatosTabla(nuevosDatos)
        console.log("datosTable: ",datosTabla)
        
    }
    
    return(<>
    <Navbar />
    {cambiarPage.action === 0 ? <> 
        <h2 className="tituloVenta">Venta</h2>
        <section className="containerTitulo">
                
                <button className="btnVentaRegistrarP" onClick={btnRegistrarPaciente}>Registrar Paciente</button>
                <button style={{ right: '100px'}} onClick={() => verPage(1)}>Listado de ventas</button>
                <button className="btnVentaBuscarProducto" onClick={btnBuscarProducto}>Buscar Producto</button>
            </section>
        <main className="containerProducts"> 
            
        <section className="inputBusqueda">
            <form >
                <h2>Nueva Venta</h2>
                <hr />
                <SelectorUsuarios onSelect={manejarSeleccion} />
                <select name="" id="">
                    <option value="default">Venta al publico</option>
                    
                </select>
            </form>
            {/* <div className="input">
            <label htmlFor="">Buscar Producto</label>
            <input type="text" />
            </div> */}

        </section>

        <section className="containerTabla">
            <h2>Productos</h2>

            <div className="input inputVenta">
               
                <AutocompleteInput tabla={agregarDatosTabla}/>
            </div>
            <div className="table-responsive">
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
            </div>
            <section className="containerTotal">

                <label htmlFor="">Total</label>
                {/* Usa useMemo() */}
                <input type="text" value={ (totall / 100).toFixed(2)  
                }  disabled />
                 
            </section>
            <button className="btnAgregar" onClick={btnGenerarVenta}>Generar venta</button>
                {/* <div > */}
    
      <Ticket ref={contentRef} sale={datosTabla} obtenerTotal={totall} />

        
        </section>
                
         { modalOpen === true  ? <ShowModal open={btnRegistrarPaciente} form={<Form   ModalOpen={btnRegistrarPaciente} />} /> : null} 
         { modalOpenAll.action === 1  ? <ShowModal open={btnCerrarBuscarProducto} form={<CatalogoProducto ModalOpen={btnCerrarBuscarProducto} dato={modalOpenAll.datos}/>} /> : null} 
         { modalOpenAll.action === 2  ? <ShowModal open={btnCerrarBuscarProducto} form={<OpcionesVenta ModalOpen={btnCerrarBuscarProducto} dato={datosTabla}/>} /> : null} 
        </main>
        </>: cambiarPage.action === 1 ? (<ListadoProducto  page={verPage} /> ): "asdf"}
    </>)
}
export default Venta;