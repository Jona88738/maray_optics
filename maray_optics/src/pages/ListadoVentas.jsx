import { useEffect, useState } from 'react';
import '../../styles/ListadoProductos.css';

const ListadoProducto = ({page}) => {

    const [ventas, setVentas] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 8;

    //  Nuevo estado para la búsqueda
    const [filtroNombre, setFiltroNombre] = useState('');

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

    //  //  Aplicar filtro por nombre
    // const datosFiltrados = ventas.filter(item =>
    //     item.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
    //     ||
    // item.id.toString().includes(filtroNombre)
    // );
    const datosFiltrados = ventas.filter(item => {
    const nombreCompleto = `${item.nombre} ${item.apellido}`.toLowerCase();
    return (
        nombreCompleto.includes(filtroNombre.toLowerCase()) ||
        item.id.toString().includes(filtroNombre)
    );
});


    const totalPaginas = Math.ceil(ventas.length / elementosPorPagina);
    
    const datosPaginados = datosFiltrados.slice(
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
            <button className="btnRegresar" onClick={btnRegresar}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                Regresar</button>
            {/* <button style={{ right: '100px' }} >Listado de ventas</button> */}
                                {/* btnVentaBuscarProducto */}
            <button className="btnAgregar" onClick={() => page(3)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M280-640q-33 0-56.5-23.5T200-720v-80q0-33 23.5-56.5T280-880h400q33 0 56.5 23.5T760-800v80q0 33-23.5 56.5T680-640H280Zm0-80h400v-80H280v80ZM160-80q-33 0-56.5-23.5T80-160v-40h800v40q0 33-23.5 56.5T800-80H160ZM80-240l139-313q10-22 30-34.5t43-12.5h376q23 0 43 12.5t30 34.5l139 313H80Zm260-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Z"/></svg>
               
                Caja y movimiento</button>
        </section>
    <main className="containerProducts"> 
        {/* <section className="inputBusqueda">
            <div className="input">
                <label htmlFor="">Buscar venta</label>
                <input type="text" />
            </div>
           
        </section> */}

        <section className="inputBusqueda">
                <div className="input">
                    <label htmlFor="">Buscar Venta</label>
                    <input
                        type="text"
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}
                        placeholder="Escribe el nombre del paciente o id de venta .."
                    />
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
                        {/* <td>{(paginaActual - 1) * elementosPorPagina + index + 1}</td> */}
                        <td id="Fecha">{element.fecha_formateada}</td>
                        <td id="Venta">{element.id}</td>
                        <td id="Paciente">{element.paciente_id === null ? "Venta al publico": element.nombre + ' ' +element.apellido}</td>
                        <td id="Total">{Number(element.total).toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}</td>
                        <td id="Status">{setStatus(element.status)}</td>
                        
                        <td id="opciones">
                            <button  className='btnEdit' onClick={() => page(2,element.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M320-280q17 0 28.5-11.5T360-320q0-17-11.5-28.5T320-360q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160q17 0 28.5-11.5T360-640q0-17-11.5-28.5T320-680q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm120 320h240v-80H440v80Zm0-160h240v-80H440v80Zm0-160h240v-80H440v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
                    
                                
                                </button>
                            
                        </td>
                    </tr>
                        )
                    } )}
                    

                </tbody>
            </table>
        </section>
        <hr />

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