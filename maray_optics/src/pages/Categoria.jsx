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

    useEffect(() =>{
       // if(!modalOpen){

        
        fetch("/api/categoria",{
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
        .then((res) => res.json() )
        .then((res) =>{
            console.log("Trajo datos");
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
    const btnDelete = (id) =>{
        Swal.fire({title: "Alerta", text: "¿Estas seguro de eliminar esta categoria?", icon: "question",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Si, estoy seguro",
            cancelButtonText: "No, quiero elimnar"
        }).then((res) =>{
            if(res.isConfirmed){

                fetch(`/api/categoria?id=${id}`, {
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
        <button onClick={btnRegresar} className="btnRegresar">Regresar</button>
        <button onClick={btnCategoria} className='btnAgregar'>Nueva categoria</button>
        </section>
        <section className="inputBusqueda">
            <div className="input">
            <label htmlFor="">Buscar Producto</label>
            <input type="text" />
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
                    
                        {datosTabla.map(element => {
                           return (
                           <tr>
                           <td id="id">{element.id}</td>
                           <td id="Nombre">{element.nombre}</td>
                            <td id="RegistrosCategoria"></td>
                            <td id="ExistenciasCategoria"></td>
                            <td >
                            <button onClick={() => btnEditar(element)} className='btnEdit'>Editar</button>
                            <button onClick={() => btnDelete(element.id)} className='btnDelete' >Eliminar</button>
                        </td>
                           </tr>
                           )
                        })}
                        
                        
                        

                    

                </tbody>
            </table>
        </section>
    </section>
{ modalOpen === true  ? <ShowModal open={btnCategoria} form={<FormCreateCategoria ModalOpen={btnCategoria}/>} /> : null} 
{ modalOpenEdit.action === 1  ? <ShowModal open={btnCategoriaModal} form={<FormEditarCategoria ModalOpen={btnCategoriaModal} dato={modalOpenEdit.datos}/>} /> : null}    
    
    </>)
}
export default Categoria;