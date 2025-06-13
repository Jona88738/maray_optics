import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

const usuarios = () => {

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
            .the((res) => {
                setUsuarios(res.data);
            })

    },[])

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
                                usuarios.map(element => (
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

         </main>
        </>
    )
}

export default usuarios;