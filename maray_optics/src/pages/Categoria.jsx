import { useEffect, useState } from 'react';
import '../../styles/categoria.css';
import ShowModal from '../components/showModal';
import FormCreateCategoria from '../components/FormCreateCategoria';
import Swal from 'sweetalert2';
import FormEditarCategoria from '../components/FormEditarCategoria';

const Categoria = ({btnRegresar}) =>{

    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 8;

    const [modalOpen, setModalOpen] = useState(false);
    const [datosTabla, setDatosTable] = useState([]);
    const [actualizarDatos, setActualizarDatos] = useState(false);

    const  [modalOpenEdit, setmodalOpenEdit] = useState({action: 0, datos:""});


    //  Nuevo estado para la búsqueda
    const [filtroNombre, setFiltroNombre] = useState('');

    useEffect(() =>{
        fetch("/api/categoria",{
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
        .then((res) => res.json() )
        .then((res) =>{
            console.log("Trajo datos ", res.data);
            setDatosTable(res.data)
        })
    //}
    },[actualizarDatos])

    //  Aplicar filtro por nombre
    const datosFiltrados = datosTabla.filter(item =>
        item.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
    );

    const totalPaginas = Math.ceil(datosTabla.length / elementosPorPagina);
    
    const datosPaginados = datosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
);

    const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
        setPaginaActual(nuevaPagina);
    }
};

    const btnCategoria = () =>{
        setModalOpen(!modalOpen);
        setActualizarDatos(!actualizarDatos);
    }
     const btnCategoriaModal = () =>{
        //setModalOpen(!modalOpen);
        setmodalOpenEdit({action: 0, datos:""});
        setActualizarDatos(!actualizarDatos);
    }
    const btnDelete = (element) =>{

        console.log(element)
        if(element.cantidadTotal !== null && element.registroTotal > 0)  return Swal.fire({title:"Error", text: "Deben estar vacios los campos", icon:"error"})
        Swal.fire({title: "Alerta", text: "¿Estas seguro de eliminar esta categoria?", icon: "question",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Si, estoy seguro",
            cancelButtonText: "No, quiero elimnar"
        }).then((res) =>{
            if(res.isConfirmed){

                fetch(`/api/categoria?id=${element.id}`, {
                                            method: 'DELETE',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            credentials: 'include'
                                        })
                                        .then((res) => res.json())
                                        .then((res) => {
                                            if(res.result){
                                                setActualizarDatos(!actualizarDatos)
                                                Swal.fire({title: "Exito", text: "Se elimino  correctamente", icon: "success"})
                                                
                                            }else{
                                                Swal.fire({title:"Error", text: res.message, icon:"error"})
                                                setActualizarDatos(!actualizarDatos)
                                            }
                
                                        })
               // Swal.fire({title: "Exito", text: "Se elimino  correctamente", icon: "success"})
            }else{
                
            }

        })
        

    }
    const btnEditar = (data) => {
        setmodalOpenEdit({action: 1, datos:data});
    }

     


    return(<>
        <section className='containerbtnCategoria'>
        <button onClick={() => btnRegresar(0)} className="btnRegresar">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                
            Regresar</button>
        <button onClick={btnCategoria} className='btnAgregar'>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    
            Nueva categoria</button>
        </section>

        {/* <section className="inputBusqueda">
            <div className="input">
            <label htmlFor="">Buscar Producto</label>
            <input type="text" />
            </div>
        </section> */}

        {/*  Input de búsqueda */}
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
            <h2 style={{textAlign:'center'}}>Categoria</h2>
        <section className="table-responsive">
            <table  className="table table-bordered table-hover">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Registros en la categoria</th>
                    <th>Existencias en la categoria</th>
                    <th>Opciones</th>
                    
                    </tr>
                </thead>
                <tbody>

                     {datosFiltrados.length > 0 ? (
                                datosPaginados.map((element, index) => (
                                    <tr key={element.id}>
                                        {/* <td>{(paginaActual - 1) * elementosPorPagina + index + 1}</td> */}
                                        <td id="id">{element.id}</td>
                                        <td id="Nombre">{element.nombre}</td>
                                        <td id="RegistrosCategoria">{element.registroTotal}</td>
                                        <td id="ExistenciasCategoria">{element.cantidadTotal === null ? 0 : element.cantidadTotal}</td>
                                        <td>
                                            <button onClick={() => btnEditar(element)} className='btnEdit'>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>
                                                
                                                </button>
                                            <button onClick={() => btnDelete(element)} className='btnDelete'>
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
                    
                        {/* {datosTabla.map(element => {
                           return (
                           <tr>
                           <td id="id">{element.id}</td>
                           <td id="Nombre">{element.nombre}</td>
                            <td id="RegistrosCategoria">{element.registroTotal}</td>
                            <td id="ExistenciasCategoria">{element.cantidadTotal === null ? 0: element.cantidadTotal}</td>
                            <td >
                            <button onClick={() => btnEditar(element)} className='btnEdit'>Editar</button>
                            <button onClick={() => btnDelete(element)} className='btnDelete' >Eliminar</button>
                        </td>
                           </tr>
                           )
                        })} */}
                        
                        
                        

                    

                </tbody>
            </table>

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
    </section>
{ modalOpen === true  ? <ShowModal open={btnCategoria} form={<FormCreateCategoria ModalOpen={btnCategoria}/>} /> : null} 
{ modalOpenEdit.action === 1  ? <ShowModal open={btnCategoriaModal} form={<FormEditarCategoria ModalOpen={btnCategoriaModal} dato={modalOpenEdit.datos}/>} /> : null}    
    
    </>)
}
export default Categoria;