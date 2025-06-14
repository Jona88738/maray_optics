import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import ShowModal from "../components/showModal";
import ModalMovimientoEfectivo from '../components/FormMovimientoEfectivo'

const MovimientoEfectivo = ({page}) =>{

    const [movimientoEfecto, setMovimientoEfecto] = useState([]);
    const  [modalOpenAll, setmodalOpenAll] = useState({action: 0, datos:""});
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 3;

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
    },[])

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
        setmodalOpenAll({
            ...modalOpenAll,
            action: 0
        })
    }

  const  realizaCorteCaja = () =>{

      console.log("Se realizo un corte de caja")
  }

  const CorteCaja = () =>{

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
                                    console.log('Fondo:', result.value);
                                    // Aquí puedes usar result.value como necesites
                                    realizaCorteCaja();
                                  }
                                });

                              }else{
                                realizaCorteCaja();
                              }

                            })

                                }


                            } )

  }

  

    return(<>
            <main className="containerProducts">
                <section className="containerTitulo" style={{marginTop:"20px"}}>
                <button className="btnRegresar" onClick={() => page(1)}>Regresar</button>
                

                <button className="btnBaja" onClick={CorteCaja}>Corte de caja</button>
                <button className="btnAgregar" onClick={btnAbrirMoodal}>Movimiento de efectivo</button>
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
                                <td> {element.monto}</td>
                        
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


                </section>
            </main>

            { modalOpenAll.action === 1  ? <ShowModal open={btnCerrarModal} form={<ModalMovimientoEfectivo ModalOpen={btnCerrarModal} dato={modalOpenAll.datos}/>} /> : null} 
    </>)
}

export default MovimientoEfectivo