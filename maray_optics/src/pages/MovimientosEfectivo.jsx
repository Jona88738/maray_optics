import { useEffect, useState } from "react"

const MovimientoEfectivo = ({page}) =>{

    const [movimientoEfecto, setMovimientoEfecto] = useState([]);
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



    return(<>
            <main className="containerProducts">
                <section className="containerTitulo" style={{marginTop:"20px"}}>
                <button className="btnRegresar" onClick={() => page(1)}>Regresar</button>
                

                <button className="btnBaja">Corte de caja</button>
                <button className="btnAgregar">Movimiento de efectivo</button>
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
    </>)
}

export default MovimientoEfectivo