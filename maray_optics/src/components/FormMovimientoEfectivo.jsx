import '../../styles/FormMovimientoEfectivo.css'
const ModalMovimientoEfectivo = () => {

    return(<>
        <h2 style={{textAlign: 'center'}}>Realizar movimiento de efectivo</h2>
        <hr />
        
        <article className="mainFormMovimiento">

            <section className="bodyFormMovimiento">
                <section  className='input'>

                    <label htmlFor="">Tipo de movimiento</label>
                <select name="" id="" class="form-select" >
                    <option value="">Entrada de efectivo</option>
                    <option value="">Salida de efectivo</option>
                </select>

                </section>
                

                <section className="input">
                    <label htmlFor="">Descripcion</label>
                    <input type="text" />
                </section>
                <section className="input">
                    <label htmlFor="">Cantidad a introducir</label>
                    <input type="number" min={0}/>
                </section>

            </section>

            <section className='BtnMovimientoEfectivoForm'>
                <button className="btnRegresar" >Cancelar</button>
                <button className="btnGuardar">Aplicar</button>
            </section>

        </article>
    </>)
}

export default ModalMovimientoEfectivo;