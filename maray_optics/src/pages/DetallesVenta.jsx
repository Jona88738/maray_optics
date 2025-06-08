 import { useEffect } from 'react';
import '../../styles/detallesVenta.css';
import { data } from 'react-router-dom';

const verificarEstatus = (estatus) =>{
    if(estatus === 1) return 'Pagado';
    if(estatus === 2) return 'Adeudo';
    if(estatus === 3) return 'Cancelado';
}

const verificarTipo = (estatus) =>{
    if(estatus === 1) return 'Venta Liquidada';
    
    return 'Adeudo';
}



const DetallesVenta = ({page, informacion}) => {
    const {dataUsuario, dato } = informacion; 
    console.log("llego de venta: ",informacion);
    console.log("llego de venta: ",dato);
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
    
     const calcularTotal = () =>{
        let total =  dato.reduce((acc, actual) =>{
        return acc + actual.subtotal;
    },0)
    return total;
    }

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
                        <input type="text" value={dataUsuario.fecha}/>
                        </div>

                        <div>
                            <label htmlFor="">Nombre de paciente</label>
                            <input type="text" value={dataUsuario.nombre}/>
                        </div>

                        <div>
                            <label htmlFor="">Telefono</label>
                            <input type="text" value={dataUsuario.telefono !== undefined ? dataUsuario.telefono: "ND" }/>
                        </div>

                        <div>
                            <label htmlFor="">Tipo</label>
                            <input type="text" value={verificarTipo(dataUsuario.status)}/>
                        </div>

                        <div>
                            <label htmlFor="">Estatus</label>
                            <input type="text" value={verificarEstatus(dataUsuario.status)}/>
                        </div>

                       
                    </section>
                    <div className='inputDomici'>
                            <label htmlFor="">Domicilio del paciente</label>
                            <input type="text" value={'ND'}/>
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
                        {dato.map((element)=>{
                            return(

                    <tr key={element.id}>
                                <td>{element.codigo}</td>
                                <td>{element.descripcion} </td>
                                <td> {element.cantidad_compra} </td>
                                
                                <td>{ (element.precio_venta / 100).toFixed(2)} </td>
                                <td> {} </td>
                                <td> { (element.subtotal / 100).toFixed(2)}</td>
                        
                    </tr>
                            )
                        })}
                            
                        
                </tbody>
            </table>
            </div>

            <section className="containerTotal">

                <label htmlFor="">Total</label>
                {/* Usa useMemo() */}
                <input type="text" value={(calcularTotal() / 100).toFixed(2)} disabled />
                 
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