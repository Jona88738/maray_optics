import { use, useState } from 'react';
import '../../styles/productos.css';
import Navbar from "../components/navbar";
import ShowModal from '../components/showModal';
import Form from '../components/FormCreateProduct';
import Categoria from './Categoria';
import Swal from 'sweetalert2';

const Productos = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [categoriaOpen, setCategoriaOpen]  = useState(false);
    const [actualizarDatos, setActualizarDatos] = useState(false);

    const btnAgregar = () =>{
        
        setModalOpen(!modalOpen);
    }   
    const btnEditar = () => {

    }
    const btnDelete = () => {
        Swal.fire({title: "Alerta", text: "¿Estas seguro de eliminar esta categoria?", icon: "question",
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Si, estoy seguro",
                    cancelButtonText: "No, quiero elimnar"
                }).then((res) =>{
                    if(res.isConfirmed){
                        Swal.fire({title: "Exito", text: "Se elimino  correctamente", icon: "success"})
                    }else{
                        
                    }
        
                })

    }
    const btnCategoria = () =>{
        setCategoriaOpen(!categoriaOpen);
    }

    return(<>
    <Navbar />
<h1  style={{textAlign: 'center', marginBottom: '15px'}} >Products</h1>
    <main className="containerProducts">
       
        {categoriaOpen === false ? ( <>
       
        <section className="inputBusqueda">
            <div className="input">
            <label htmlFor="">Buscar Producto</label>
            <input type="text" />
            </div>
        </section>

        <section className="containerButtons">

            <button className="btnAgregar" onClick={btnAgregar}>Agregar</button>
            <button className="btnBaja">Baja de producto</button>
            <button className="btnVerCategoria" onClick={btnCategoria}>ver categoria</button>

        </section>
        <section>
            <table className="tabla">
                <thead>
                    <tr>
                    <th>Imagen</th>
                    <th>Codigo</th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Categoria</th>
                    <th>Existencia</th>
                    <th>Precio</th>
                    <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td id="imagen"></td>
                        <td id="codigo"></td>
                        <td id="nombre"></td>
                        <td id="tipo"></td>
                        <td id="categoria"></td>
                        <td id="existencia"></td>
                        <td id="precio"></td>
                        
                        <td id="opciones">
                            <button onClick={btnEditar}>Editar</button>
                            <button onClick={btnDelete}>Eliminar</button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </section>
 </>
        ): <Categoria btnRegresar={btnCategoria} />}
    </main>


    { modalOpen === true  ? <ShowModal open={btnAgregar} form={<Form />} /> : null} 
    </>)
}

export default Productos;