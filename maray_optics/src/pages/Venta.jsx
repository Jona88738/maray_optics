import Navbar from "../components/navbar"
import '../../styles/venta.css'
const venta = () =>{
    
    return(<>
    <Navbar />
        
        <section className="containerTitulo">
                <h2 className="tituloVenta">Venta</h2>
                <button className="btnVentaRegistrarP">Registrar Paciente</button>
                <button className="btnVentaBuscarProducto">Buscar Producto</button>
            </section>
        <main className="containerProducts"> 
            
        <section className="inputBusqueda">
            <div className="input">
            <label htmlFor="">Buscar Producto</label>
            <input type="text" />
            </div>

        </section>

        <section className="containerTabla">
            <h2>Productos</h2>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Descripcion</th>
                        <th>Cantidad</th>
                        <th>Existencia</th>
                        <th>Precio</th>
                        <th>Descuento</th>
                        <th>SubTotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>123 </td>
                        <td>123 </td>
                        <td>123 </td>
                        <td>123 </td>
                        <td>123 </td>
                        <td>123 </td>
                        <td>123 </td>
                        
                    </tr>
                </tbody>
            </table>

            <section className="containerTotal">

                <label htmlFor="">Total</label>
                <input type="text"  disabled />
                 
            </section>
            <button className="btnAgregar">Generar venta</button>

        
        </section>
        
        
            
        </main>
    </>)
}
export default venta