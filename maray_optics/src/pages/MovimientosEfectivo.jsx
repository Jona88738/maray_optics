import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import ShowModal from "../components/showModal";
import ModalMovimientoEfectivo from '../components/FormMovimientoEfectivo'
import '../../styles/MovimientosEfectivos.css'

const MovimientoEfectivo = ({page}) =>{

    const [movimientoEfecto, setMovimientoEfecto] = useState([]);
    const [actualizar, setActualizar]  = useState(false);
    const  [modalOpenAll, setmodalOpenAll] = useState({action: 0, datos:""});
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 8;

    useEffect(() =>{

        fetch("/api/ventas/movimientoEfectivo", {
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((res) =>{
                console.log(res.data)
                setMovimientoEfecto(res.data)
            })
    },[actualizar])

    const totalPaginas = Math.ceil(movimientoEfecto.length / elementosPorPagina);
    
    const datosPaginados = movimientoEfecto.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
);

    const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
        setPaginaActual(nuevaPagina);
    }
};

const btnAbrirMoodal = () =>{
        setmodalOpenAll({
            ...modalOpenAll,
            action: 1
        })
    }

const btnCerrarModal = () =>{
      setActualizar(!actualizar);

        setmodalOpenAll({
            ...modalOpenAll,
            action: 0
        })
    }

  const  realizaCorteCaja = (datoEnviar) =>{

    fetch("/api/ventas/corteCaja", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(datoEnviar)
    })
      .then(res => res.json())
      .then((res) =>{
        if(res.result){
          setActualizar(!actualizar);
          Swal.fire({title:"Se realizo el corte con exito!!", text: "Corte realizado", icon:"success"});
          
          
        }
      })
      console.log("Se realizo un corte de caja")
  }

  const CorteCaja = () =>{

    const datoEnviar = { fondoCaja: false, movimientoEfectivo: movimientoEfecto}
    Swal.fire({title: "Alerta", text: "¿Desea realizar el corte de caja?", icon: "question",
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonText: "Si, estoy seguro",
                                cancelButtonText: "No, quiero"
                            }).then((res) =>{
                                if(res.isConfirmed){

                                  Swal.fire({title: "Alerta", text: "¿Desea incluir un fondo de caja para el proximo corte de caja?", icon: "question",
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonText: "Si, estoy seguro",
                                cancelButtonText: "No, quiero"
                            }).then((res) => {

                              if(res.isConfirmed){

                                Swal.fire({
                                  title: 'Fondo de caja',
                                  input: 'number',
                                  inputPlaceholder: 'Escribe aquí...',
                                  showCancelButton: true,
                                  confirmButtonText: 'Aceptar',
                                  cancelButtonText: 'Cancelar'
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    datoEnviar.fondoCaja = true;
                                    datoEnviar.montoFondoCaja = result.value;
                                    console.log('Fondo:', result.value);
                                    // Aquí puedes usar result.value como necesites
                                    realizaCorteCaja(datoEnviar);
                                  }
                                });

                              }else{
                                realizaCorteCaja(datoEnviar);
                              }

                            })

                                }


                            } )

  }

  const calculoMovimiento = (tipo) =>{
    if(tipo === 'Entrada'){
      const valor = movimientoEfecto.reduce((valorAcumulado, valorActual) =>{
        
        return valorActual.tipo === 'Entrada' ? ( valorAcumulado + parseInt(valorActual.monto)): valorAcumulado
      },0)
      return valor;
    }
    if(tipo === 'venta'){
      const valor = movimientoEfecto.reduce((valorAcumulado, valorActual) =>{
        
        return valorActual.tipo === 'venta' ? ( valorAcumulado + parseInt(valorActual.monto)): valorAcumulado
      },0)
      return valor;
    }
    if(tipo === 'DEVOLUCION'){
      const valor = movimientoEfecto.reduce((valorAcumulado, valorActual) =>{
        
        return valorActual.tipo === 'DEVOLUCION' ? ( valorAcumulado + parseInt(valorActual.monto)): valorAcumulado
      },0)
      return valor;
    }
    if(tipo === 'Retiro'){
      const valor = movimientoEfecto.reduce((valorAcumulado, valorActual) =>{
        
        return valorActual.tipo === 'Retiro' ? ( valorAcumulado + parseInt(valorActual.monto)): valorAcumulado
      },0)
      return valor;
    }
  }

    return(<>
            <main className="containerProducts">
                <section className="containerTitulo" style={{marginTop:"20px"}}>
                <button className="btnRegresar" onClick={() => page(1)}>
                   <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
               
                  Regresar</button>
                

                <button className="btnBaja" onClick={CorteCaja}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M280-640q-33 0-56.5-23.5T200-720v-80q0-33 23.5-56.5T280-880h400q33 0 56.5 23.5T760-800v80q0 33-23.5 56.5T680-640H280Zm0-80h400v-80H280v80ZM160-80q-33 0-56.5-23.5T80-160v-40h800v40q0 33-23.5 56.5T800-80H160ZM80-240l139-313q10-22 30-34.5t43-12.5h376q23 0 43 12.5t30 34.5l139 313H80Zm260-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Z"/></svg>
                
                  Corte de caja</button>
                <button className="btnAgregar" onClick={btnAbrirMoodal}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"/></svg>
                  
                  Movimiento de efectivo</button>
                </section>
                <section className="containerTabla">
                    <h2>Movimientos Efectivos</h2>

                    <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Descripcion</th>
                        
                        <th>Cantidad</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {datosPaginados.map((element,index) =>{

                        return(
                    <tr  key={index}>
                                <td>{(paginaActual - 1) * elementosPorPagina + index + 1}</td>
                                {/* <td>{index}</td> */}
                                <td>{element.fecha} </td>
                                
                                <td> {element.descripcion}</td>
                                <td style={element.tipo  === 'Entrada' || element.tipo  === 'venta' ?  ({color:'green'}): ({color: 'red'})}> {element.tipo === 'Entrada' || element.tipo  === 'venta'  ? ('$'+element.monto): ('-$'+element.monto)}</td>
                        
                    </tr>
                        )
                    })}
                            
                        
                </tbody>
            </table>
            </div>

            {/* <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", gap: "10px" }}>
                <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>Anterior</button>
                <span>Página {paginaActual} de {totalPaginas}</span>
                <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>Siguiente</button>
            </div> */}

            <nav aria-label="Page navigation">
  <ul className="pagination justify-content-center mt-3">
    <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
      <button className="page-link" onClick={() => cambiarPagina(paginaActual - 1)}>
        Anterior
      </button>
    </li>

    {Array.from({ length: totalPaginas }, (_, i) => (
      <li key={i} className={`page-item ${paginaActual === i + 1 ? 'active' : ''}`}>
        <button className="page-link" onClick={() => cambiarPagina(i + 1)}>
          {i + 1}
        </button>
      </li>
    ))}

    <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
      <button className="page-link" onClick={() => cambiarPagina(paginaActual + 1)}>
        Siguiente
      </button>
    </li>
  </ul>
</nav>

<hr />
<section className="informacionMovimientosEfectivos">
  <article>
    <h5>${calculoMovimiento('venta')}</h5>
    <span>Ventas</span>
  </article>

  <article>
    <h5>${calculoMovimiento('Entrada')} </h5>
    <span>Entradas</span>
  </article>

  <article>
    <h5>${calculoMovimiento('DEVOLUCION')} </h5>
    <span>Devoluciones</span>
  </article>

  <article>
    <h5>${calculoMovimiento('Retiro')} </h5>
    <span>Retiros</span>
  </article>
  

</section>
                </section>
            </main>

            { modalOpenAll.action === 1  ? <ShowModal open={btnCerrarModal} form={<ModalMovimientoEfectivo ModalOpen={btnCerrarModal} dato={modalOpenAll.datos}/>} /> : null} 
    </>)
}

export default MovimientoEfectivo