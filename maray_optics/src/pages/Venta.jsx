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
 const [descuento, setDescuento] =useState(0);
 const [filtro, setFiltro] = useState('');
 const [valor, setValor] = useState('');
 const limpiarFiltro  = (filtro) =>{
    filtro('');
 }

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
const inputRef = useRef();

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
    const valor = inputRef.current.value.trim();
    if(!valor) return Swal.fire({title:"Alerta!", text: "Se te olvido agregar un usuario a la venta.", icon: "warning"})
    if(informacionVenta.id === 0) return Swal.fire({title:"Alerta!", text: "Debes seleccionar ya sea venta  publica o algun usuario ya registrado", icon: "warning"})
    if(datosTabla.length === 0)  return Swal.fire({title:"Alerta!", text: "Primeros tienes que agregar articulos a la venta", icon: "warning"})
    setFiltro('')
    setValor('')
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
        
        const articuloRepetido = datosTabla.find((element) => element.id === data.id );
        if(articuloRepetido !== undefined) return  Swal.fire({title: "Alerta!", text: "Este articulo ya fue ingresado, si quieres agregar mas, aumenta la cantidad en dicho campo", icon: 'warning'})
        data.descuento = 0;
        setdatosTabla([
            ...datosTabla,
            data,
        ])
        console.log("Datos importante: ", data)
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

    const btnCerrarModalCompleteVenta = () =>{
        setFiltro('')
        setValor('')
        setdatosTabla([])
        setInformacionVenta({select:0, id:0, nombre:''})
        setmodalOpenAll({
            ...modalOpenAll,
            action: 0
        })
        inputRef.current.value = "";
    }

    
    const handleChangeCantidad = (element,event) =>{
        console.log(element,event.target.value)
        element.descuento = 0;
        
        const nuevosDatos = datosTabla.map((elemento) =>{
            const result = elemento.nombre === element.nombre ? true: false;
            if(result && element.cantidad_compra < parseInt(event.target.value)){
                elemento.subtotal = elemento.cantidad_compra * elemento.precio_venta;
                elemento.subtotal +=  element.precio_venta;
                element.cantidad_compra += 1;
                
            }else if(result){
                elemento.subtotal = elemento.cantidad_compra * elemento.precio_venta;
                elemento.subtotal -= element.precio_venta;
                element.cantidad_compra -= 1;
            }

            return elemento;
            
        })

        console.log("Nuevos datos: ", nuevosDatos)
         setdatosTabla(nuevosDatos)
        console.log("datosTable: ",datosTabla)
        
    }

    function redondeoSiSupera80(valor) {
  const entero = Math.floor(valor);
        const decimal = valor - entero;

        if (decimal >= 0.50) {
            return Math.ceil(valor);
        } else {
            return Math.floor(valor);
        }
        }


    const handleChangeDescuento = (element,event) =>{
        const {value} = event.target;

        // const descuento = (value / 100) * (totall / 100).toFixed(2) 
        // element.subtotal = element.subtotal - descuento;

        const nuevosDatos = datosTabla.map((elemento) =>{
            const result = elemento.nombre === element.nombre ? true: false;
            console.log(descuento, value)
            if(result && elemento.descuento < parseInt(event.target.value)){

                // totall y precio_venta deben estar en centavos, por ejemplo: 5400 = $54.00
                elemento.descuento =value;
console.log("Mi totall", (totall / 100).toFixed(2));
                console.log( value, "Mi value final")
// Calcular el descuento en centavos redondeando hacia abajo
const descuentoPorcentaje = Math.floor(( value*  (element.precio_venta * element.cantidad_compra)) / 100);

console.log(totall, "Mi value");
console.log(descuentoPorcentaje , "Mi descuento1");

// Restar el descuento también en centavos

elemento.subtotal = Math.floor((( element.precio_venta * element.cantidad_compra)  - descuentoPorcentaje) / 100);

elemento.subtotal = elemento.subtotal * 100;
//console.log((elemento.subtotal / 100).toFixed(2), "Este es mi elemento Subtotal");
 console.log(Math.floor((element.precio_venta - descuentoPorcentaje) / 100), "Este es mi elemento Subtotal");
                // console.log("Mi totall", (totall / 100).toFixed(2))
                //  const descuentoPorcentaje = ((value / 100) * totall )
                //  console.log(totall , "Mi value")
                //  console.log((descuentoPorcentaje / 100).toFixed(2), "Mi descuento")
                //   elemento.subtotal = Math.floor(element.precio_venta  - descuentoPorcentaje );
                // console.log( (elemento.subtotal / 100).toFixed(2), "Este es mi elemento Subtotal")
                //  console.log(  (elemento.subtotal ))
                 
            }else if(result){
                console.log("Entro")
                elemento.descuento =value;
                //Calcular el descuento en centavos redondeando hacia abajo
               // const descuentoPorcentaje = Math.floor(( 30* 400 ) / 100);
                 const descuentoPorcentaje = Math.floor((value * element.precio_venta) / 100);

                console.log(totall, "Mi value");
                console.log((descuentoPorcentaje / 100).toFixed(2), "Mi descuento");

                // Restar el descuento también en centavos
                elemento.subtotal = Math.floor(( (element.precio_venta * element.cantidad_compra)   - descuentoPorcentaje) / 100);
                elemento.subtotal = elemento.subtotal * 100;
                //elemento.subtotal = element.precio_venta - descuentoPorcentaje;

                console.log(Math.floor((elemento.subtotal / 100)), "Este es mi elemento Subtotal");

                //  const descuentoPorcentaje = ((value / 100) * (totall / 100).toFixed(2) )
                //  console.log( descuentoPorcentaje , "Mi descuento")
                //  elemento.subtotal = Math.round( (( element.precio_venta / 100).toFixed(2) + descuentoPorcentaje ) * 100);
                 
                //  const descuentoPorcentaje = (value / 100) * (totall / 100).toFixed(2) 
                //  elemento.subtotal = (element.subtotal / 100).toFixed(2) + descuentoPorcentaje;
            }
                return elemento;
        })
        // setDescuento(value)
        setdatosTabla(nuevosDatos)
    }

    const eliminarArticulo = (id) =>{
        const nuevoArreglo = datosTabla.filter((element) => element.id !== id);
        setdatosTabla(nuevoArreglo);
    }
    
    return(<>
    <Navbar />
    {cambiarPage.action === 0 ? <> 
        <h2 className="tituloVenta">Venta</h2>
        <section className="containerTitulo">
                                    {/* btnVentaRegistrarP */}
                <button className="btnAgregar" style={{fontSize: '13px'}} onClick={btnRegistrarPaciente}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    Registrar Paciente</button>

                <button className="btnBaja" onClick={() => verPage(1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M320-280q17 0 28.5-11.5T360-320q0-17-11.5-28.5T320-360q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160q17 0 28.5-11.5T360-640q0-17-11.5-28.5T320-680q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm120 320h240v-80H440v80Zm0-160h240v-80H440v80Zm0-160h240v-80H440v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
                    Listado de ventas</button>
                                    {/* btnVentaBuscarProducto */}
                <button className="btnEdit" onClick={btnBuscarProducto}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                    Buscar Producto</button>
            </section>
        <main className="containerProducts"> 
            
        <section className="inputBusqueda">
            <form >
                <h2>Nueva Venta</h2>
                <hr />
                <label htmlFor="" style={{marginBottom: '15px'}}>*Elegir cliente o venta al público</label>
                
                <SelectorUsuarios ref={inputRef} onSelect={manejarSeleccion} filtro={filtro} setFiltro={setFiltro}/>
                <hr />
                {informacionVenta.select === 0 ? "":(<>
                    <div className="input">
                        <label htmlFor="">Nombre de usuario</label>
                        <input type="text" value={informacionVenta.nombre} disabled />
                    </div>
                </>)}
            </form>
            

        </section>

        <section className="containerTabla">
            <h2>Productos</h2>

            <div className="input inputVenta">
               
                <AutocompleteInput tabla={agregarDatosTabla} valor={valor} setValor={setValor}/>
            </div>
            <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th></th>
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
                                <td><button onClick={() => eliminarArticulo(element.id)} className='btnDelete'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                                
                                    </button></td>
                                <td>{element.nombre} </td>
                                <td>{element.descripcion} </td>
                                <td> <input type="number" placeholder="Cantidad" min={1} value={element.cantidad_compra}  onChange={(event) =>handleChangeCantidad(element,event)}/> </td>
                                <td>{element.cantidad}</td>
                                <td>{ (element.precio_venta / 100).toFixed(2)} </td>
                                <td> <input type="number" placeholder="Descuento" min={0} value={element.descuento}  onChange={(event) => handleChangeDescuento(element, event)
                                } 
                                 onKeyDown={(e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
      }
    }}/> </td>
                                <td>{(element.subtotal / 100).toFixed(2) } </td>
                        
                    </tr>
                        )
                    })}
                    
                </tbody>
            </table>
            </div>
            <section className="containerTotal">

                <label htmlFor="" style={{display: 'flex', alignItems: 'center', fontSize:'15px', fontSize: '25px'}}>Total</label>
                {/* Usa useMemo() */}
                <input type="text" style={{padding: '7px'}} value={ (totall / 100).toFixed(2)  
                }  disabled />
                 
            </section>
            <button className="btnAgregar" onClick={btnGenerarVenta}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M280-640q-33 0-56.5-23.5T200-720v-80q0-33 23.5-56.5T280-880h400q33 0 56.5 23.5T760-800v80q0 33-23.5 56.5T680-640H280Zm0-80h400v-80H280v80ZM160-80q-33 0-56.5-23.5T80-160v-40h800v40q0 33-23.5 56.5T800-80H160ZM80-240l139-313q10-22 30-34.5t43-12.5h376q23 0 43 12.5t30 34.5l139 313H80Zm260-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Z"/></svg>
                Generar venta</button>
                {/* <div > */}
    
      {/* <Ticket ref={contentRef} sale={datosTabla} obtenerTotal={totall} /> */}

        
        </section>
                
         { modalOpen === true  ? <ShowModal open={btnRegistrarPaciente} form={<Form   ModalOpen={btnRegistrarPaciente} />} /> : null} 
         { modalOpenAll.action === 1  ? <ShowModal open={btnCerrarBuscarProducto} form={<CatalogoProducto ModalOpen={btnCerrarBuscarProducto} dato={modalOpenAll.datos}/>} /> : null} 
         { modalOpenAll.action === 2  ? <ShowModal open={btnCerrarModalCompleteVenta} form={<OpcionesVenta ModalOpen={btnCerrarModalCompleteVenta} dato={datosTabla} dataUsuario={informacionVenta} page={verPage} />} /> : null} 
        </main>
        </>: cambiarPage.action === 1 ? (<ListadoProducto  page={verPage} /> )
        : cambiarPage.action === 2 ? <DetallesVenta page={verPage} informacion={cambiarPage.data} />
        : cambiarPage.action === 3 ? <MovimientoEfectivo page={verPage}/>: null }
    </>)
}
export default Venta;