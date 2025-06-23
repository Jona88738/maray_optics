import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import ShowModal from "../components/showModal";
import FormCreateUser from '../components/FormCreateUser'
import FormEditarUser from "../components/FormEditUser";

const usuarios = () => {

    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 8;
    const  [modalOpenAll, setmodalOpenAll] = useState({action: 0, datos:""});
    const [actualizarDatos, setActualizarDatos] = useState(false);
     

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
                console.log(res.data)
                setUsuarios(res.data);
            })

    },[actualizarDatos])

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

 const btnEditar = (data) => {
        //console.log("mi id: ",id)
        setmodalOpenAll({action: 2, datos:data});
    }

    const btnDelete = (id) => {
                Swal.fire({title: "Alerta", text: "¿Estas seguro de eliminar este expediente?", icon: "question",
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: "Si, estoy seguro",
                            cancelButtonText: "No, quiero elimnar"
                        }).then((res) =>{
                            if(res.isConfirmed){
                                fetch(`/api/usuario?id=${id}`, {
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
                setActualizarDatos(!actualizarDatos)
        setmodalOpenAll({
            ...modalOpenAll,
            action: 0
        })
    }

    const registrarUsuario = () =>{

        setmodalOpenAll({
            ...modalOpenAll,
            action: 1
        })
    }

    return(
        <>
        <Navbar/>
            <h2 style={{textAlign: 'center', marginBottom: '15px'}}>Usuarios</h2>
            <section className="containerTitulo">
                
               
                <button className="btnAgregar"  onClick={registrarUsuario}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                 
                    Nuevo Usuario</button>
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
                    <th>Usuario</th>
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

                                        {/* <td>{(paginaActual - 1) * elementosPorPagina + index + 1}</td> */}
                                        
                                        {/* <td id="codigo">{element.codigo}</td> */}
                                        <td id="nombre">{element.usuario}</td>
                                        <td id="nombre">{element.nombre}</td>
                                        <td id="categoria">{element.correo}</td>
                                        <td id="existencia">{element.cantidad}</td>
                                        <td id="precio">{element.fecha_formateada}</td>
                                        <td>
                                            <button onClick={() => btnEditar(element)}  className='btnEdit'>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>
                                                
                                                </button>
                                            <button onClick={() => btnDelete(element.id)} className='btnDelete'>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                                
                                                </button>
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

        { modalOpenAll.action === 1  ? <ShowModal open={btnCerrarModal} form={<FormCreateUser ModalOpen={btnCerrarModal} dato={usuarios}/>} /> 
        : modalOpenAll.action === 2  ? <ShowModal open={btnCerrarModal} form={<FormEditarUser ModalOpen={btnCerrarModal} dato={modalOpenAll.datos}/>} />
        : null} 

         </main>
        </>
    )
}

export default usuarios;