import Navbar from "../components/navbar";
import Form from "../components/FormCreateExpediente";
import ShowModal from "../components/showModal";

import { useEffect, useState } from "react";
const Expediente = () => {

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
                }else{

                }
            })
    },[])

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
    }

    return(<>
        <Navbar/>
        <h1  style={{textAlign: 'center', marginBottom: '15px'}}  >Expedientes </h1>
         <section className="containerTitulo">
                
                <button className="btnVentaRegistrarP" onClick={registrarExpediente} >Nuevo expediente</button>
                
                <button className="btnVentaBuscarProducto" >Nueva consulta</button>
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
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                
                 {expedientes.length > 0 ? (
                                expedientes.map(element => (
                                    <tr key={element.id}>
                                        
                                        <td id="codigo">{element.id}</td>
                                        <td id="nombre">{element.nombre}</td>
                                        <td id="categoria">{element.edad}</td>
                                        
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
        { modalOpenAll.action === 1  ? <ShowModal open={btnCerrarModal} form={<Form ModalOpen={btnCerrarModal} dato={"a"}/>} /> : null} 
         </main>
    </>)
}

export default Expediente;