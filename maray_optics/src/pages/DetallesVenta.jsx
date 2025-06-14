import { useEffect, useState, useRef} from 'react';
import '../../styles/detallesVenta.css';
import Ticket from "../components/ImprimirTicket.jsx"; 
import { useReactToPrint } from 'react-to-print';
import PagoDiferido from '../components/FormPagoDiferido.jsx';
import ShowModal from '../components/showModal.jsx';
import Swal from 'sweetalert2';


const verificarEstatus = (estatus) =>{
    if(estatus === 1) return 'Pagado';
    if(estatus === 2) return 'Adeudo';
    if(estatus === 3) return 'Cancelado';
}

const verificarTipo = (estatus) =>{
    if(estatus === 0) return 'Venta Liquidada';
    if(estatus === 1) return 'En pagos';
    
    // return 'Adeudo';
}
const acumuladoPagoDiferido = (dato) =>{
    let total =  dato.reduce((acc, actual) =>{
        return acc + actual.cantidad_pago;
    },0)
    return total;
}




const DetallesVenta = ({page, informacion}) => {
    
    // const {dataUsuario, dato } = informacion; 


    // console.log("llego de venta: ",informacion);
    // console.log("llego de venta: ",dato);

    const btnAbrirModal = () =>{
        setmodalOpenAll({
            ...modalOpenAll,
            action: 1
        })
    }
    const btnCerrarModal = () =>{
        setmodalOpenAll({
            ...modalOpenAll,
            action: 0
        })
    }

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

    const  [modalOpenAll, setmodalOpenAll] = useState({action: 0, datos:""});
    const [dato, setDatosVenta] = useState({ articulos:[], pago_realizados: []});
    useEffect(() =>{
        console.log("id",informacion)
        fetch(`/api/ventas/detallesVenta?id=${informacion}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((res) =>{
                console.log(res.data)
                setDatosVenta(res.data)
            })
    },[])
    
     const calcularTotal = () =>{
        let total =  dato.articulos.reduce((acc, actual) =>{
        return acc + actual.subtotal;
    },0)
    return total;
    }

    const generarTicket = () =>{
        handlePrint()
        console.log("Ya imprimio")
    }

    const cancelarVenta = () => {
        const paramsCancel ={motivo: "", regreArticulos: false, devoluEfectivo: "", idVenta: dato.id_venta, listaArticulos: dato.articulos, total: calcularTotal()};
         Swal.fire({title: "Alerta", text: "¿Estas seguro de cancelar esta venta?", icon: "question",
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: "Si, estoy seguro",
                            cancelButtonText: "No, quiero elimnar"
                        }).then((res) =>{

                            if(res.isConfirmed){

                                Swal.fire({
                                    title: 'Ingresa el motivo de la cancelacion',
                                    input: 'text',
                                    inputPlaceholder: 'Ej: Por garantia',
                                    // showCancelButton: true,
                                    confirmButtonText: 'Aceptar',
                                    // cancelButtonText: 'Cancelar',
                                    // inputValidator: (value) => {
                                    //     if (!value) {
                                    //     return '¡Debes escribir algo!';
                                    //     }
                                    // }
                                    }).then((result) => {
                                    // if (result.isConfirmed) {
                                        console.log('Cliente:', result.value);
                                        paramsCancel.motivo = result.value;
                                        // Puedes hacer lo que necesites con el valor ingresado



                                        Swal.fire({title: "Alerta", text: "¿Deseas regresar los articulos al inventario?", icon: "question",
                                            showConfirmButton: true,
                                            showCancelButton: true,
                                            confirmButtonText: "Si",
                                            cancelButtonText: "No"
                                        }).then((res) =>{
                                            // if(res.isConfirmed){
                                            paramsCancel.regreArticulos = res.isConfirmed;

                                                 Swal.fire({title: "Alerta", text: `¿Realizar devolucion en efectivo  de ${calcularTotal()}?`, icon: "question",
                                                    showConfirmButton: true,
                                                    showCancelButton: true,
                                                    confirmButtonText: "Si, realizar",
                                                    cancelButtonText: "No, solo cancelar"
                                                }).then((res) =>{
                                                    paramsCancel.devoluEfectivo = res.isConfirmed;
                                                    console.log(paramsCancel)
                                                  
                                                      fetch(`/api/ventas`, {
                                                            method: 'DELETE',
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            },
                                                            credentials: 'include',
                                                            body: JSON.stringify( paramsCancel)
                                                        })
                                                        .then((res) => res.json())
                                                        .then((res) => {
                                                            if(res.result){
                                                                Swal.fire({title: "Exito", text: "Se cancelao  correctamente", icon: "success"})
                                                                setActualizarDatos(!actualizarDatos)
                                                            }
                                
                                                        })


                                                })

                                            // }else{

                                            // }
                                        })



                                    // }
                                    });

                                

                              
                                
                            }else{
                                
                            }
                
                        }) 

    }
    
    return(<>
       
        <main className="containerProducts"> 
            <div className="containerTitulo">
                <button onClick={() => page(1) } className="btnRegresar">Regresar</button>
            <button className="btnRegresar" onClick={cancelarVenta} >Cancelar Venta</button>
            </div>
            
           

            <section className="containerTabla">
                 <h2>Detalles Venta</h2>
                 <hr />
                 <form  className='formDatosVenta'>
                    <div className="input">
                        <label htmlFor="">Atendido por</label>
                        <input type="text" value={'ND'} disabled/>
                    </div>
                    <section className="datosVenta">
                        <div>
                        <label htmlFor="">Fecha de venta</label>
                        <input type="text" value={dato.fecha ?? 2} disabled/>
                        </div>

                        <div>
                            <label htmlFor="">Nombre de paciente</label>
                            <input type="text" value={dato.nombre ?? 'Venta Publica'} disabled/>
                        </div>

                        <div>
                            <label htmlFor="">Telefono</label>
                            <input type="text" value={dato.telefono !== undefined ? dato.telefono: "ND" } disabled/>
                        </div>

                        <div>
                            <label htmlFor="">Tipo</label>
                            <input type="text" value={verificarTipo(dato.tipo)} disabled/>
                        </div>

                        <div>
                            <label htmlFor="">Estatus</label>
                            <input type="text" value={verificarEstatus(dato.status)} disabled/>
                        </div>

                       
                    </section>
                    <div className='inputDomici'>
                            <label htmlFor="">Domicilio del paciente</label>
                            <input type="text" value={'ND'} disabled/>
                    </div>
                 </form>
            <hr />

            <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Descripcion</th>
                        <th>Cantidad</th>
                        
                        <th>Precio</th>
                        <th>Descuento</th>
                        <th>SubTotal</th>
                    </tr>
                </thead>
                <tbody>    
                        {dato.articulos.map((element)=>{
                            return(

                    <tr key={element.id}>
                                <td>{element.codigo}</td>
                                <td>{element.descripcion} </td>
                                <td> {element.cantidad} </td>
                                
                                <td>{ element.precio_unitario} </td>
                                <td> {} </td>
                                <td> { element.subtotal }</td>
                        
                    </tr>
                            )
                        })}
                            
                        
                </tbody>
            </table>
            </div>

            <section className="containerTotal">

                <label htmlFor="">Total</label>
                {/* Usa useMemo() */}
                <input type="text" value={calcularTotal() } disabled />
                 
            </section>

            <hr />
            {dato.status !== 1 ? (
            <>
            <section>
                <h3>Pagos realizados</h3>

                <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Cantidad</th>
                        
                        <th>Metodo de pago</th>
                        <th>Transaccion</th>
                        <th>opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {dato.pago_realizados.map((element, index) =>{
                        return(

                            <tr>
                                <td>{index+1}</td>
                                <td>{element.fecha} </td>
                                <td>{element.cantidad_pago} </td>
                                
                                <td>{element.metodo_pago} </td>
                                <td> ND </td>
                                <td></td>
                        
                             </tr>
                        )
                    })}
                            
                        
                </tbody>
            </table>
            </div>

            </section>
            
            <article className='containerpagoInfo'>
                <div className='inputDomici'>
                    <label htmlFor="">Acumulado</label>
                    <input type="text" value={acumuladoPagoDiferido(dato.pago_realizados)} disabled/>
                </div>

                <div className='inputDomici'>
                    <label htmlFor="">Cantidad restante</label>
                    <input type="text"  value={calcularTotal()  - acumuladoPagoDiferido(dato.pago_realizados) } disabled/>
                    
                </div>
                <button className='btnAgregar' onClick={btnAbrirModal}>Realiza Pago</button>
            </article>
            
                <hr />
            </> 
            ):""}
                <section  className='containerBtnReciTicket'>
                    <button className='btnBaja' >Recibo</button>
                    <button className='btnBaja' onClick={generarTicket}>Ticket</button>
                </section>
            </section>
        <div style={{display: "none"}}>
        <Ticket ref={contentRef} sale={dato} obtenerTotal={calcularTotal} />
        </div> 
            
 { modalOpenAll.action === 1  ? <ShowModal open={btnCerrarModal} form={<PagoDiferido closeModal={btnCerrarModal}   ModalOpen={btnCerrarModal} />} /> : null} 
        </main>
    </>)
}
export default  DetallesVenta;