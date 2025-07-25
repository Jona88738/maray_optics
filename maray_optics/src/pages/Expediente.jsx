import Navbar from "../components/navbar";
import Form from "../components/FormCreateExpediente";
import ShowModal from "../components/showModal";
import Swal from 'sweetalert2';

import { useEffect, useState } from "react";
import Consulta from "./Consulta";
import FormEditExpediente from "../components/FormEditExpediente";
const Expediente = () => {

    const [paginaActual, setPaginaActual] = useState(1);
    const [actualizarDatos, setActualizarDatos] = useState(false);
    const elementosPorPagina = 10;
    const [cambiarPage, setCambiarPage] = useState({action: 0, data: {}});

    //  Nuevo estado para la búsqueda
    const [filtroNombre, setFiltroNombre] = useState('');
    const [expedientes, setExpedientes]   = useState([]);
    
     const  [modalOpenAll, setmodalOpenAll] = useState({action: 0, datos:""});
    useEffect(() =>{
        fetch("/api/expedientes", {
            
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((res) =>{
                
                if(res.result){
                    setExpedientes(res.data);
                    console.log("Entro")
                }else{

                }
            })
    },[actualizarDatos])

    //  Aplicar filtro por nombre
    const datosFiltrados = expedientes.filter(item =>
        item.nombre_completo.toLowerCase().includes(filtroNombre.toLowerCase()) 
    );

     const totalPaginas = Math.ceil(expedientes.length / elementosPorPagina);
    
    const datosPaginados = datosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
);

    const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
        setPaginaActual(nuevaPagina);
    }
};


    const registrarExpediente = () =>{

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
        setActualizarDatos(!actualizarDatos);
    }

    const verPage = (opcion, datos) =>{
    console.log( typeof opcion, "Mi opcion")
    setCambiarPage({action: opcion,data: datos})
  }

      const btnDelete = (id) => {
            Swal.fire({title: "Alerta", text: "¿Estas seguro de eliminar este expediente?", icon: "question",
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: "Si, estoy seguro",
                        cancelButtonText: "No, quiero elimnar"
                    }).then((res) =>{
                        if(res.isConfirmed){
                            fetch(`/api/expedientes?id=${id}`, {
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

         const btnEditar = (data) => {
        //console.log("mi id: ",id)
        setmodalOpenAll({action: 2, datos:data});
    }

    return(<>
        {/* <Navbar/> */}
        {cambiarPage.action === 0 ? <> 
        {/* <h1  style={{textAlign: 'center', marginBottom: '15px'}}  >Expedientes </h1> */}
         <section className="containerTitulo">
                
                <button className="btnAgregar " onClick={registrarExpediente} >
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                   
                    Nuevo expediente</button>
                
                <button className="btnBaja" onClick={() => verPage(1)} >
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                   
                    Nueva consulta</button>
            </section>
         <main className="containerProducts">
            
            <section className="inputBusqueda">
                <h2 style={{fontWeight:'800'}}>Expedientes</h2>
                        <hr />
                <div className="input">
                    <label htmlFor="">Buscar Expediente</label>
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
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Telefono</th>
                    <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                
                 {expedientes.length > 0 ? (
                                datosPaginados.map((element, index) => (
                                    <tr key={element.id}>
                                        {/* <td>{(paginaActual - 1) * elementosPorPagina + index + 1}</td> */}
                                        
                                        <td id="codigo">{element.id}</td>
                                        <td id="nombre">{element.nombre_completo}</td>
                                        <td id="categoria">{element.edad}</td>
                                        <td id="categoria">{element.telefono}</td>
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
        { modalOpenAll.action === 1  ? <ShowModal open={btnCerrarModal} form={<Form ModalOpen={btnCerrarModal} dato={"a"}/>} /> 
        : modalOpenAll.action === 2  ? <ShowModal open={btnCerrarModal} form={<FormEditExpediente ModalOpen={btnCerrarModal} dato={modalOpenAll.datos}/>} /> 
        : null} 
         </main>
         </> :cambiarPage.action === 1 ? (<Consulta  page={verPage}/>): null}
    </>)
}

export default Expediente;