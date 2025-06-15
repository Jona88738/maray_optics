import { useState } from 'react';
import '../../styles/FormPagoDiferido.css';
import Swal from 'sweetalert2';

const PagoDiferido = ({closeModal, idVenta, restante_pago}) =>{

    const [datos, setDatos] = useState(0);


    const pagarDiferido = () => {
        const datoEnviar = {pagoDiferido: datos, id_venta: idVenta };
        if(restante_pago < datos)  return Swal.fire({title:"Alerta", text: "La cantidad es mayor de lo restante ", icon:'error'})
        fetch('/api/ventas/pagoDiferido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(datoEnviar)
        })
            .then(res => res.json())
            .then((res) => {
                if(res.result){
                    Swal.fire({title:"Se realizo con exito el pago", text: "Pago realizado", icon:"success"})
                    closeModal()
                }
            })
    }
    
    return(<>
        <h2 style={{textAlign:"center"}}>Realiza pago</h2>
        <hr />
        <article className="bodyPagoDiferido">
            <section className='input'>
                
                <label htmlFor="">Metodo de pago</label>
                <select name="" id="" class="form-select" style={{padding: '10px'}}>
                    <option value="">Efectivo</option>
                    <option value="">Tarjeta de debito</option>
                </select>
            </section>
            <section className='input'>
                 
                 <label htmlFor="">Cantidad abonar</label>
                 <input type="number" min={0} onChange={(e) => setDatos(e.target.value)}/>
            </section>
            
        </article>
        <hr />
        <article className='fooderPagoDiferdo'>
            <button className='btnRegresar' onClick={() => closeModal()}>Volver</button>
            <button className='btnAgregar' onClick={pagarDiferido}>Pagar</button>
        </article>
    </>)
}

export default PagoDiferido;