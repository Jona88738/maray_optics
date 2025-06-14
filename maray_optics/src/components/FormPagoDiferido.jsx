import '../../styles/FormPagoDiferido.css';

const PagoDiferido = ({closeModal}) =>{

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
                 <input type="number" min={0}/>
            </section>
            
        </article>
        <hr />
        <article className='fooderPagoDiferdo'>
            <button className='btnRegresar' onClick={() => closeModal()}>Volver</button>
            <button className='btnAgregar'>Pagar</button>
        </article>
    </>)
}

export default PagoDiferido;