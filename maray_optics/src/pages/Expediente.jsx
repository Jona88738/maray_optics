import Form from "../components/FormCreateExpediente";
import ShowModal from "../components/showModal";
import Swal from 'sweetalert2';

import { useEffect, useState } from "react";
import Consulta from "./Consulta";
import FormEditExpediente from "../components/FormEditExpediente";
import ListadoExpediente from "./ListadoExpedientes";
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
        const VerListadoExpedientes =(id) =>{
            setCambiarPage({action: 2, data: id})
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

                    <button className="btnBaja" onClick={() => VerListadoExpedientes(0)} >
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                   
                    Lista expedientes</button>
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
                                                <button onClick={() => VerListadoExpedientes(element.id)} className='btnBaja' style={{marginLeft: '15px'}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M680-326.67q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-66.66q22.67 0 38-15.34 15.33-15.33 15.33-38 0-22.66-15.33-38Q702.67-500 680-500t-38 15.33q-15.33 15.34-15.33 38 0 22.67 15.33 38 15.33 15.34 38 15.34ZM440-46.67v-116q0-21 10-39.5t28-29.5q29.33-17.66 61.17-30.16 31.83-12.5 65.5-19.84L680-186l75.33-95.67q33.67 7.34 65 19.84 31.34 12.5 60.67 30.16 18 11 28.5 29.5t10.5 39.5v116H440Zm66.33-66.66H652L579.33-206q-19.33 7-37.66 16-18.34 9-35.34 19.33v57.34Zm201.67 0h145.33v-57.34q-16.66-10.66-34.66-19.5-18-8.83-37.34-15.83L708-113.33Zm-56 0Zm56 0ZM186.67-120q-27.5 0-47.09-19.58Q120-159.17 120-186.67v-586.66q0-27.5 19.58-47.09Q159.17-840 186.67-840h586.66q27.5 0 47.09 19.58Q840-800.83 840-773.33V-542q-12.67-20-29-37.33-16.33-17.34-37.67-28v-166H186.67v586.66h188.66q-1 6-1.5 12t-.5 12V-120H186.67ZM280-613.33h320.67q18-10 38.22-15 20.23-5 41.11-5V-680H280v66.67Zm0 166.66h213.33q0-17 3.17-34t9.17-32.66H280v66.66ZM280-280h151.33q15-11.67 31.84-19.67 16.83-8 34.5-15.33v-31.67H280V-280Zm-93.33 93.33v-586.66 165.66-25.66V-186.67Zm493.33-260Z"/></svg>
                                          
                                               </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>No hay resultados</td>
                                </tr>
                            )} 
                    
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
         </> :cambiarPage.action === 1 ? (<Consulta  page={verPage}/>): 
             cambiarPage.action === 2 ? (<ListadoExpediente  page={verPage} id={cambiarPage.data}/>):
            null}
    </>)
}

export default Expediente;