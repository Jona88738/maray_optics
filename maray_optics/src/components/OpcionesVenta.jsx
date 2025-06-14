import { useState } from 'react';
import '../../styles/OpcionesVenta.css'
import Swal from 'sweetalert2';
const OpcionesVenta = ({ModalOpen, dato,dataUsuario, page}) => {
    const [mostrar, setMostrar] = useState({select:'1',ModoPago:''});
    const [pagoDiferido, setPagoDiferido] = useState(0.00);
    
    const cambioModoPago = (event) =>{
        //setMostrar(1)
        const { name, value } = event.target;
        console.log( typeof value)
        if(value === '1' || value === 'default'){
            setMostrar({
                
                ['select']: '1',
                [name]: value

            })
        }else if(value === '2'){
            setMostrar({
                
                ['select']: '2',

                
            })
            console.log("Opcion 2")
        }
        
    }
   
    const finalizarVenta = (e) =>{
        e.preventDefault();
        dataUsuario.metodo_pago = 'Efectivo'
        //if()
        if(mostrar.select === '1'){
            dataUsuario.status = 1;
            dataUsuario.tipo = 0;
        } 
        
        if(mostrar.select === '2' && dataUsuario.nombre != 'Venta al publico'){
            dataUsuario.status = 2;
            dataUsuario.pago_venta = pagoDiferido;
            dataUsuario.tipo = 1;

         } else if( mostrar.select === '2' && dataUsuario.nombre === 'Venta al publico'){
            return Swal.fire({title:"Alerta", text: "Es necesario seleccionar un cliente o paciente para completar esta acción", icon:'warning'})
         }   
            

            
        
        const datosAEnviar = {
                    dato: dato,               // clave: dato, valor: arreglo
                    dataUsuario: dataUsuario  // clave: dataUsuario, valor: objeto
                    };
            console.log("Estos son mis datos antes de enviar: ", datosAEnviar);
             fetch('/api/ventas',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify(datosAEnviar)
                
                    })
                    .then((res) => res.json())
                    .then((res) =>{
                        if(res.success){
                            Swal.fire({title:"Se ingreso con exito", text: "Categoria agregada", icon:"success"})
                           // ModalOpen();
                           datosAEnviar.dataUsuario.fecha = res.fecha;
                           datosAEnviar.dataUsuario.totalVenta = res.total;
                           datosAEnviar.dataUsuario.idVenta = res.ventaId;
                            page(2, res.idVenta)
                            //console.log("Producto registrado");
                        }else{
                            console.log("algo fallo", res.result)
                        }
                    })
        
    }

    const salir = (e) =>{
        e.preventDefault();
        ModalOpen();
    }
    const calcularTotal = () =>{
        let total =  dato.reduce((acc, actual) =>{
        return acc + actual.subtotal;
    },0)
    return total;
    }

        {console.log("Mi dato: ",dataUsuario)}
    return (<>
        <h2 className='titleListadoVenta'>Opciones de venta </h2>
        <hr />
        <form >
            <section className='containerOVenta'>
                <div>
                    <label htmlFor="">Modo de pago</label>
                    <select name="ModoPago" id="" onChange={cambioModoPago}> 
                        {/* <option value="default">Selecciona una opcion</option> */}
                        <option value="1">Liquitar total</option>
                        <option value="2">Diferir pagos</option>
                    </select>
                </div>
        
                <div>
                    <label htmlFor="">Metodo de pago</label>
                    <select name="" id="">
                        {/* <option value="default">Selecciona una opcion</option> */}
                        <option value="1">Efectivo</option>
                    </select>
                </div>
            </section>
            

            {mostrar.select === '2' ? (
                <>
                <hr />
                <div className='input' style={{margin: '0 50px 0 50px'}}>
                    <label htmlFor="">*Monto de pago a realizar</label>
                    <input type="number" min={0} defaultValue={0} onChange={(event) => setPagoDiferido(event.target.value)}/>
                </div>
                
                </>
                ): ""}

            <hr />

            <section className='containerOVenta'>
                <div className='containerTotalOp'>
                    <h2>Total a pagar</h2>
                </div>
                <div className='containerEfecOp'>
                    <h2>${(calcularTotal() / 100).toFixed(2)}</h2>
                </div>
            </section>
            
            {mostrar.select === '2' ? (

                <section className='containerOVenta'>
                <div className='containerTotalOp'>
                    <h2>Restante</h2>
                </div>
                <div className='containerEfecOp'>
                    <h2>${( (calcularTotal() / 100) - pagoDiferido).toFixed(2)}</h2>
                </div>
            </section>

            ):null}
            


            <hr />
            <div className='containerbtnOpVenta'>
                <button onClick={salir}>Volver</button>
                <button onClick={finalizarVenta}>Finalizar Venta</button>
            </div>
        </form>
    </>)
}

export default OpcionesVenta;