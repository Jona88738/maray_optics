import { useEffect, useState } from 'react';
import '../../styles/ListadoProductos.css';

const ListadoProducto = ({page}) => {

    const [ventas, setVentas] = useState();

    const btnRegresar = () => {
        page(0)
    }

    useEffect(() =>{
        setVentas(1)
    },[])

    return (<>
        <h2 className='TituloProductos'>Listado de ventas</h2>
        <section className="containerTitulo">

            <button className="btnVentaRegistrarP" onClick={btnRegresar}>Regresar</button>
            <button style={{ right: '100px' }} >Listado de ventas</button>
            <button className="btnVentaBuscarProducto">Caja y movimiento</button>
        </section>
    <main className="containerProducts"> 
        <section className="inputBusqueda">
            <div className="input">
                <label htmlFor="">Buscar Producto</label>
                <input type="text" />
            </div>
           
        </section>
  <section className="containerTabla">
        <section className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                    <th>Fecha</th>
                    <th>Venta</th>
                    <th>Paciente</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>

                    {/* {datos.map((element) =>{
                        return (

                            <tr>
                        <td id="imagen"></td>
                        <td id="codigo">{element.codigo}</td>
                        <td id="nombre">{element.nombre}</td>
                        <td id="categoria">{element.categoria}</td>
                        <td id="existencia">{element.cantidad}</td>
                        <td id="precio">{element.precio_venta}</td>
                        
                        <td id="opciones">
                            <button  className='btnEdit'>Editar</button>
                            <button  className='btnDelete'>Eliminar</button>
                        </td>
                    </tr>
                        )
                    } )} */}
                    

                </tbody>
            </table>
        </section>
        </section>



    </main>
    </>)
}

export default ListadoProducto;