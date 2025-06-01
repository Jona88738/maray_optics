import { useEffect, useState } from 'react';
import '../../styles/categoria.css';
import ShowModal from '../components/showModal';
import FormCreateCategoria from '../components/FormCreateCategoria';
import Swal from 'sweetalert2';
import FormEditarCategoria from '../components/FormEditarCategoria';

const Categoria = ({btnRegresar}) =>{

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

     //  Aplicar filtro por nombre
    const datosFiltrados = datosTabla.filter(item =>
        item.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
    );


    return(<>
        <section className='containerbtnCategoria'>
        <button onClick={btnRegresar} className="btnRegresar">Regresar</button>
        <button onClick={btnCategoria} className='btnAgregar'>Nueva categoria</button>
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

        <h2 style={{textAlign:'center'}}>Categoria</h2>
        <section className="containerTabla">
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
                                datosFiltrados.map(element => (
                                    <tr key={element.id}>
                                        <td id="id">{element.id}</td>
                                        <td id="Nombre">{element.nombre}</td>
                                        <td id="RegistrosCategoria">{element.registroTotal}</td>
                                        <td id="ExistenciasCategoria">{element.cantidadTotal === null ? 0 : element.cantidadTotal}</td>
                                        <td>
                                            <button onClick={() => btnEditar(element)} className='btnEdit'>Editar</button>
                                            <button onClick={() => btnDelete(element)} className='btnDelete'>Eliminar</button>
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
        </section>
    </section>
{ modalOpen === true  ? <ShowModal open={btnCategoria} form={<FormCreateCategoria ModalOpen={btnCategoria}/>} /> : null} 
{ modalOpenEdit.action === 1  ? <ShowModal open={btnCategoriaModal} form={<FormEditarCategoria ModalOpen={btnCategoriaModal} dato={modalOpenEdit.datos}/>} /> : null}    
    
    </>)
}
export default Categoria;