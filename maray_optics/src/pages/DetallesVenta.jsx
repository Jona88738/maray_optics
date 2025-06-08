 import { useEffect } from 'react';
import '../../styles/detallesVenta.css';

const DetallesVenta = ({page, informacion}) => {
    
    useEffect(() =>{
        fetch(`/api/ventas/detallesVenta?id=${informacion.data}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((res) =>{

            })
    },[])
    
    return(<>
       
        <main className="containerProducts"> 
            <div className="containerTitulo">
                <button onClick={() => page(1) } className="btnRegresar">Regresar</button>
            <button className="btnRegresar" >Cancelar Venta</button>
            </div>
            
           

            <section className="containerTabla">
                 <h2>Detalles Venta</h2>
                 <hr />
                 <form  className='formDatosVenta'>
                    <div className="input">
                        <label htmlFor="">Atendido por {informacion.data}</label>
                        <input type="text" />
                    </div>
                    <section className="datosVenta">
                        <div>
                        <label htmlFor="">Fecha de venta</label>
                        <input type="text" />
                        </div>

                        <div>
                            <label htmlFor="">Nombre de paciente</label>
                            <input type="text" />
                        </div>

                        <div>
                            <label htmlFor="">Telefono</label>
                            <input type="text" />
                        </div>

                        <div>
                            <label htmlFor="">Tipo</label>
                            <input type="text" />
                        </div>

                        <div>
                            <label htmlFor="">Estatus</label>
                            <input type="text" />
                        </div>

                       
                    </section>
                    <div className='inputDomici'>
                            <label htmlFor="">Domicilio del paciente</label>
                            <input type="text" />
                    </div>
                 </form>
            <hr />

            <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Descripcion</th>
                        <th>Cantidad</th>
                        
                        <th>Precio</th>
                        <th>Descuento</th>
                        <th>SubTotal</th>
                    </tr>
                </thead>
                <tbody>    
                            <tr>
                                <td></td>
                                <td> </td>
                                <td> <input type="number" placeholder="Cantidad" min={1} /> </td>
                                
                                <td> </td>
                                <td> <input type="number" placeholder="Descuento" min={0} value={0} /> </td>
                                <td></td>
                        
                    </tr>
                        
                </tbody>
            </table>
            </div>

            <section className="containerTotal">

                <label htmlFor="">Total</label>
                {/* Usa useMemo() */}
                <input type="text" value="322" disabled />
                 
            </section>

            <hr />
            <section>
                <h3>Pagos realizados</h3>

                <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Cantidad</th>
                        
                        <th>Metodo de pago</th>
                        <th>Transaccion</th>
                        <th>opciones</th>
                    </tr>
                </thead>
                <tbody>
                            <tr>
                                <td></td>
                                <td> </td>
                                <td> <input type="number" placeholder="Cantidad" min={1} /> </td>
                                
                                <td> </td>
                                <td> <input type="number" placeholder="Descuento" min={0} value={0} /> </td>
                                <td></td>
                        
                    </tr>
                        
                </tbody>
            </table>
            </div>

            </section>
            
            <article className='containerpagoInfo'>
                <div className='inputDomici'>
                    <label htmlFor="">Acumulado</label>
                    <input type="text" />
                </div>

                <div className='inputDomici'>
                    <label htmlFor="">Cantidad restante</label>
                    <input type="text" />
                    
                </div>
                <button>Realiza Pago</button>
            </article>
                <hr />

                <section  className='containerBtnReciTicket'>
                    <button className='btnAgregar'>Recibo</button>
                    <button className='btnAgregar'>Ticket</button>
                </section>
            </section>

            
            

        </main>
    </>)
}
export default  DetallesVenta;