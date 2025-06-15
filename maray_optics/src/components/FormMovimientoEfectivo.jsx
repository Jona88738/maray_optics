import { useState } from 'react';
import '../../styles/FormMovimientoEfectivo.css'
import Swal from 'sweetalert2';

const ModalMovimientoEfectivo = ({ModalOpen}) => {

    const [datos, setDatos] = useState({optionSelect: '0', descripcion: '', cantidad: ''})

    const guardarDatos = (e) => {
        const {name, value} = e.target;

        setDatos({
            ...datos,
            [name]: value
        })

    }

    const aplicarMovimiento = () =>{
        console.log(datos)
        const datosEnviar = {descripcion: datos.descripcion, monto: parseInt(datos.cantidad), tipo: ''};
        datosEnviar.tipo = datos.optionSelect === '0' ? 'Entrada': 'Retiro';
        fetch('/api/ventas/movimientoEfectivo', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(datosEnviar)
        })
            .then(res => res.json())
            .then((res) =>{
                if(res.result){
                    Swal.fire({title:"Movimiento completado!!", text: "Movimiento realizado", icon:"success"})
                    ModalOpen()
                }
            })
    }

    return(<>
        <h2 style={{textAlign: 'center'}}>Realizar movimiento de efectivo</h2>
        <hr />
        
        <article className="mainFormMovimiento">

            <section className="bodyFormMovimiento">
                <section  className='input' onChange={guardarDatos} >

                    <label htmlFor="">Tipo de movimiento</label>
                <select name="optionSelect" id="" class="form-select" >
                    <option value="0">Entrada de efectivo</option>
                    <option value="1">Salida de efectivo</option>
                </select>

                </section>
                

                <section className="input">
                    <label htmlFor="">Descripcion</label>
                    <input type="text" name='descripcion' onChange={guardarDatos} />
                </section>
                <section className="input">
                    <label htmlFor=""> {datos.optionSelect === '1' ? ('Cantidad a retirar'): ('Cantidad a introducir')}</label>
                    <input type="number" min={0} name='cantidad' onChange={guardarDatos}/>
                </section>

            </section>

            <section className='BtnMovimientoEfectivoForm'>
                <button className="btnRegresar" onClick={() => ModalOpen()} >Cancelar</button>
                <button className="btnGuardar" onClick={aplicarMovimiento}>Aplicar</button>
            </section>

        </article>
    </>)
}

export default ModalMovimientoEfectivo;