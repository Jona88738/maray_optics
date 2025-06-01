import { use, useEffect, useState } from 'react';
import '../../styles/productos.css';
import Navbar from "../components/navbar";
import ShowModal from '../components/showModal';
import Form from '../components/FormCreateProduct';
import FormEditarProducto from '../components/FormEditarProducto';
import Categoria from './Categoria';
import Swal from 'sweetalert2';

const Productos = () => {

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

     //  Aplicar filtro por nombre
    const datosFiltrados = datos.filter(item =>
        item.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
    );

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
                        placeholder="Escribe el nombre..."
                    />
                </div>
            </section>

        <section className="containerButtons">

            <button className="btnAgregar" onClick={btnAgregar}>Agregar</button>
            <button className="btnBaja">Baja de producto</button>
            <button className="btnVerCategoria" onClick={btnCategoria}>ver categoria</button>

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
                                datosFiltrados.map(element => (
                                    <tr key={element.id}>
                                        
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
        </section>
 </>
        ): <Categoria btnRegresar={btnCategoria} />}
    </main>


    { modalOpen === true  ? <ShowModal open={btnAgregar} form={<Form   ModalOpen={btnAgregar} />} /> : null} 
    { modalOpenEdit.action === 1  ? <ShowModal open={btnCategoriaModal} form={<FormEditarProducto ModalOpen={btnCategoriaModal} dato={modalOpenEdit.datos}/>} /> : null}  
    </>)
}

export default Productos;