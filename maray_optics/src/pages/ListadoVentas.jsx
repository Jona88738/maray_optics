import { useEffect, useState } from 'react';
import '../../styles/ListadoProductos.css';

const ListadoProducto = ({page}) => {

    const [ventas, setVentas] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 3;

    const btnRegresar = () => {
        page(0)
    }
    const setStatus = (status) =>{
        if(status === 1){
            return 'Pagado';
        }else if(status === 2){
            return 'Adeudo';
        }else if(status === 3){
            return 'Cancelado';
        }
    }

    useEffect(() =>{
        fetch("/api/ventas",{
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
        .then((res) => res.json() )
        .then((res) =>{
            console.log("Trajo datos ", res.data);
            setVentas(res.data)
        })
    },[])

    const totalPaginas = Math.ceil(ventas.length / elementosPorPagina);
    
    const datosPaginados = ventas.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
);

    const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
        setPaginaActual(nuevaPagina);
    }
};

    return (<>
        <h2 className='TituloProductos'>Listado de ventas</h2>
        <section className="containerTitulo">
                                {/* btnVentaRegistrarP */}
            <button className="btnRegresar" onClick={btnRegresar}>Regresar</button>
            {/* <button style={{ right: '100px' }} >Listado de ventas</button> */}
                                {/* btnVentaBuscarProducto */}
            <button className="btnAgregar" onClick={() => page(3)}>Caja y movimiento</button>
        </section>
    <main className="containerProducts"> 
        <section className="inputBusqueda">
            <div className="input">
                <label htmlFor="">Buscar Producto</label>
                <input type="text" />
            </div>
           
        </section>
  <section className="containerTabla">
        <section className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                    <th>Fecha</th>
                    <th>Venta</th>
                    <th>Paciente</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>

                    {datosPaginados.map((element,index) =>{
                        return (

                            <tr  key={index}>
                        <td>{(paginaActual - 1) * elementosPorPagina + index + 1}</td>
                        <td id="Fecha">{element.fecha_inicio}</td>
                        <td id="Venta">{element.id}</td>
                        <td id="Paciente">{element.paciente_id === null ? "Venta al publico": element.nombre}</td>
                        <td id="Total">{element.total}</td>
                        <td id="Status">{setStatus(element.status)}</td>
                        
                        <td id="opciones">
                            <button  className='btnEdit' onClick={() => page(2,element.id)}>info</button>
                            
                        </td>
                    </tr>
                        )
                    } )}
                    

                </tbody>
            </table>
        </section>


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

export default ListadoProducto;