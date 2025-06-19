import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import ShowModal from "../components/showModal";
const  [modalOpenAll, setmodalOpenAll] = useState({action: 0, datos:""});
const usuarios = () => {

    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 3;
    const  [modalOpenAll, setmodalOpenAll] = useState({action: 0, datos:""});
     

     //  Nuevo estado para la búsqueda
    const [filtroNombre, setFiltroNombre] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    useEffect(()=> {

        fetch("/api/usuario/getusers", {
            headers:{

            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((res) => {
                setUsuarios(res.data);
            })

    },[])

    const totalPaginas = Math.ceil(usuarios.length / elementosPorPagina);
    
    const datosPaginados = usuarios.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
);

    const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
        setPaginaActual(nuevaPagina);
    }
};

    const btnDelete = (id) => {
                Swal.fire({title: "Alerta", text: "¿Estas seguro de eliminar este expediente?", icon: "question",
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: "Si, estoy seguro",
                            cancelButtonText: "No, quiero elimnar"
                        }).then((res) =>{
                            if(res.isConfirmed){
                                fetch(`/api/producto?id=${id}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    credentials: 'include'
                                })
                                .then((res) => res.json())
                                .then((res) => {
                                    if(res.result){
                                        Swal.fire({title: "Exito", text: "Se elimino  correctamente", icon: "success"})
                                        setActualizarDatos(!actualizarDatos)
                                    }
        
                                })
                                
                            }else{
                                
                            }
                
                        })
        
            }

              const btnCerrarModal = () =>{
        setActualizarDatos(!actualizarDatos);
        setmodalOpenAll({
            ...modalOpenAll,
            action: 0
        })
    }



    return(
        <>
        <Navbar/>
            <h2 style={{textAlign: 'center', marginBottom: '15px'}}>Usuarios</h2>
            <section className="containerTitulo">
                
               
                <button className="btnVentaBuscarProducto" >Nuevo Usuario</button>
            </section>
            
            <main className="containerProducts">

            <section className="inputBusqueda">
                <div className="input">
                    <label htmlFor="">Buscar categoría</label>
                    <input
                        type="text"
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}
                        placeholder="Escribe el nombre..."
                    />
                </div>
            </section>


             <section className="containerTabla">
        <section className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                    {/* <th>Imagen</th> */}
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Nivel</th>
                    <th>Registro</th>
                    <th>opciones</th>
                    </tr>
                </thead>
                <tbody>
                
                 {usuarios.length > 0 ? (
                                datosPaginados.map((element,index) => (
                                    <tr key={element.id}>

                                        <td>{(paginaActual - 1) * elementosPorPagina + index + 1}</td>
                                        
                                        <td id="codigo">{element.codigo}</td>
                                        <td id="nombre">{element.nombre}</td>
                                        <td id="categoria">{element.nombreCategoria}</td>
                                        <td id="existencia">{element.cantidad}</td>
                                        <td id="precio">{element.precio_venta}</td>
                                        <td>
                                            <button onClick={() => btnEditar(element)}  className='btnEdit'>Editar</button>
                                            <button onClick={() => btnDelete(element.id)} className='btnDelete'>Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>No hay resultados</td>
                                </tr>
                            )} 
                    {/* {datos.map((element) =>{
                        return (

                            <tr>
                         <td id="imagen"></td> 
                        <td id="codigo">{element.codigo}</td>
                        <td id="nombre">{element.nombre}</td>
                        <td id="categoria">{element.nombreCategoria}</td>
                        <td id="existencia">{element.cantidad}</td>
                        <td id="precio">{element.precio_venta}</td>
                        
                        <td id="opciones">
                            <button onClick={() => btnEditar(element)}  className='btnEdit'>Editar</button>
                            <button onClick={() => btnDelete(element.id)} className='btnDelete'>Eliminar</button>
                        </td>
                    </tr>
                        )
                    } )}  */}
                    

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

        { modalOpenAll.action === 1  ? <ShowModal open={btnCerrarModal} form={<Form ModalOpen={btnCerrarModal} dato={"a"}/>} /> 
        : null} 

         </main>
        </>
    )
}

export default usuarios;