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
import DetallesVenta from "./DetallesVenta.jsx";
import MovimientoEfectivo from "./MovimientosEfectivo.jsx";
//
// console.log('Ticket:', Ticket);

const Venta = () =>{
 const [cambiarPage, setCambiarPage] = useState({action: 0, data: {}});
 const [modalOpen, setModalOpen] = useState(false);
 const [datosTabla, setdatosTabla] = useState([])
 const  [modalOpenAll, setmodalOpenAll] = useState({action: 0, datos:""});
 const [informacionVenta, setInformacionVenta ] = useState({select:0, id:0, nombre:''})

 const manejarSeleccion = (usuario) => {
    console.log('Usuario seleccionado:', usuario);
    if(usuario.id ===  0){
        console.log("Venta al publico")
        setInformacionVenta({
            select: 0,
             id:-2, nombre:"Venta al publico"
        })
    }else if(usuario.id !== 0){
        setInformacionVenta({
            select: 1,
             id:usuario.id, nombre:usuario.nombre
        })
    }
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
    if(informacionVenta.id === 0) return Swal.fire({title:"Alerta!", text: "Debes seleccionar ya sea venta  publica o algun usuario ya registrado", icon: "warning"})
    if(datosTabla.length === 0)  return Swal.fire({title:"Alerta!", text: "Primeros tienes que agregar articulos a la venta", icon: "warning"})
    setmodalOpenAll({
            ...modalOpenAll,
            action: 2,
            
        })
        console.log("Se realizo la venta" )
    // console.log("re")
    // handlePrint()
    // console.log("Ya imprimio")
  }

  const verPage = (opcion, datos) =>{
    console.log( typeof opcion, "Mi opcion")
    setCambiarPage({action: opcion,data: datos})
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
                <hr />
                {informacionVenta.select === 0 ? "":(<>
                    <label htmlFor="">Nombre</label>
                    <input type="text" value={informacionVenta.nombre} disabled />
                </>)}
            </form>
            

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
         { modalOpenAll.action === 2  ? <ShowModal open={btnCerrarBuscarProducto} form={<OpcionesVenta ModalOpen={btnCerrarBuscarProducto} dato={datosTabla} dataUsuario={informacionVenta} page={verPage}/>} /> : null} 
        </main>
        </>: cambiarPage.action === 1 ? (<ListadoProducto  page={verPage} /> )
        : cambiarPage.action === 2 ? <DetallesVenta page={verPage} informacion={cambiarPage.data} />
        : cambiarPage.action === 3 ? <MovimientoEfectivo page={verPage}/>: null }
    </>)
}
export default Venta;