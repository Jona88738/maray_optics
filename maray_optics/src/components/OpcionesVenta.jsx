import { useState } from 'react';
import '../../styles/OpcionesVenta.css'
const OpcionesVenta = ({ModalOpen, dato}) => {
    const [mostrar, setMostrar] = useState({select:'1',ModoPago:''});
    const [datosSelect, setDatosSelect] = useState();
    
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
        }
        
    }
   
    const finalizarVenta = (e) =>{
        e.preventDefault();
        if(mostrar.select === '1'){
            dato.metodo_pago = 'Efectivo'
            console.log("Estos son mis datos antes de enviar: ", dato);
             fetch('/api/ventas',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify(dato)
                
                    })
                    .then((res) => res.json())
                    .then((res) =>{
                        if(res.result){
                            Swal.fire({title:"Se ingreso con exito", text: "Categoria agregada", icon:"success"})
                            ModalOpen();
                            //console.log("Producto registrado");
                        }else{
                            console.log("algo fallo", res.result)
                        }
                    })
        }
    }
    const salir = (e) =>{
        e.preventDefault();
        ModalOpen();
    }
    
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
                <h2>XD</h2>
                </>
                ): ""}

            <hr />
            <section className='containerOVenta'>
                <div className='containerTotalOp'>
                    <h2>Total a pagar</h2>
                </div>
                <div className='containerEfecOp'>
                    <h2>$800</h2>
                </div>
            </section>
            <hr />
            <div className='containerbtnOpVenta'>
                <button onClick={salir}>Volver</button>
                <button onClick={finalizarVenta}>Finalizar Venta</button>
            </div>
        </form>
    </>)
}

export default OpcionesVenta;