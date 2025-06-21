import { use, useEffect, useState } from 'react';
import '../../styles/productos.css';
import Navbar from "../components/navbar";
import ShowModal from '../components/showModal';
import Form from '../components/FormCreateProduct';
import FormEditarProducto from '../components/FormEditarProducto';
import Categoria from './Categoria';
import Swal from 'sweetalert2';

const Productos = () => {

    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 8;

    const [modalOpen, setModalOpen] = useState(false);
    const [categoriaOpen, setCategoriaOpen]  = useState(false);
    const [actualizarDatos, setActualizarDatos] = useState(false);

    const  [modalOpenEdit, setmodalOpenEdit] = useState({action: 0, datos:""});
    const [datos, setDatos] = useState([]);

    //  Nuevo estado para la búsqueda
    const [filtroNombre, setFiltroNombre] = useState('');

    useEffect(() => {
       // if(!modalOpen){
        fetch("/api/producto",{
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
        .then((res) => res.json())
        .then((res) =>{
            console.log(res.data)
            setDatos(res.data)
        })
   // }
    },[actualizarDatos])

    //  Aplicar filtro por nombre
    const datosFiltrados = datos.filter(item =>
        item.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) ||
        item.codigo.toLowerCase().includes(filtroNombre.toLowerCase())
    );

     const totalPaginas = Math.ceil(datos.length / elementosPorPagina);
    
    const datosPaginados = datosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
);

    const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
        setPaginaActual(nuevaPagina);
    }
};

    const btnAgregar = () =>{
        setModalOpen(!modalOpen)
        setActualizarDatos(!actualizarDatos);
    } 
    const btnCategoriaModal = () =>{
        //setModalOpen(!modalOpen);
        setmodalOpenEdit({action: 0, datos:""});
        setActualizarDatos(!actualizarDatos);
    }
    const btnEditar = (data) => {
        //console.log("mi id: ",id)
        setmodalOpenEdit({action: 1, datos:data});
    }
    const btnDelete = (id) => {
        Swal.fire({title: "Alerta", text: "¿Estas seguro de eliminar esta categoria?", icon: "question",
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
    const btnCategoria = () =>{
        setCategoriaOpen(!categoriaOpen);
    }

     

    return(<>
    <Navbar />
<h1  style={{textAlign: 'center', marginBottom: '15px'}} >Productos</h1>
    <main className="containerProducts">
       
        {categoriaOpen === false ? ( <>
       
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
                        placeholder="Buscar por nombre o código del producto"
                    />
                </div>
            </section>

        <section className="containerButtons">

            <button className="btnAgregar" onClick={btnAgregar}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    
                Agregar</button>
            <button className="btnBaja">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M200-440v-80h560v80H200Z"/></svg>
                Baja de producto</button>
            <button className="btnVerCategoria" onClick={btnCategoria}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"/></svg>
                ver categoria</button>

        </section>
         <section className="containerTabla">
        <section className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                    {/* <th>Imagen</th> */}
                    <th>Codigo</th>
                    <th>Nombre</th>
                    <th>Categoria</th>
                    <th>Existencia</th>
                    <th>Precio</th>
                    <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                
                {datosFiltrados.length > 0 ? (
                                datosPaginados.map((element, index) => (
                                    <tr key={element.id}>
                                        {/* <td>{(paginaActual - 1) * elementosPorPagina + index + 1}</td> */}
                                        <td id="codigo">{element.codigo}</td>
                                        <td id="nombre">{element.nombre}</td>
                                        <td id="categoria">{element.nombreCategoria}</td>
                                        <td id="existencia">{element.cantidad}</td>
                                        <td id="precio">{element.precio_venta}</td>
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
 </>
        ): <Categoria btnRegresar={btnCategoria} />}
    </main>


    { modalOpen === true  ? <ShowModal open={btnAgregar} form={<Form   ModalOpen={btnAgregar} />} /> : null} 
    { modalOpenEdit.action === 1  ? <ShowModal open={btnCategoriaModal} form={<FormEditarProducto ModalOpen={btnCategoriaModal} dato={modalOpenEdit.datos}/>} /> : null}  
    </>)
}

export default Productos;