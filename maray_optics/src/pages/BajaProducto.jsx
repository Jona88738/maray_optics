import '../../styles/BajaProducto.css';
import AutocompleteInput from "../components/AutoComplete";
import { useEffect, useState } from 'react';

const BajaProducto = ({btnRegresar}) =>{

    const [datos, setdatos] = useState([])
    const [valor, setValor] = useState('');

    useEffect(() =>{
        fetch('/api/bajaProducto')
    },[])
    const GuardarDatos = () =>{

    }

    const onChangeDatos = () =>{

    }

    return(<>
        {/* <Navbar /> */}
        <h2></h2>
        
            <div className="containerTitulo">
                <button onClick={() => btnRegresar(0) } className="btnRegresar">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                
                    Regresar</button>
            </div>
            <section className="inputBusqueda">

                <h2>Baja Producto</h2>
                <hr />
                <form className="formBajaProducto">
                    
                    <div className="input">
                        
                        <label htmlFor="">*Codigo del producto</label>
                        <AutocompleteInput tabla={onChangeDatos} valor={valor}  setValor={setValor}/>
                    </div>
                    <div className="input">
                        <label htmlFor="">*Cantidad</label>
                        <input type="number" min={1} />
                    </div>
                    <div className="input" >
                        <label htmlFor="">Stock Actual</label>
                        <input type="number" />
                    </div>
                    <div className="input" style={{width: '100%'}}>
                        <label htmlFor="">Anotaciones</label>
                        <textarea />
                    </div>
                    <div className="ContainerBtns" style={{width: '100%'}}>
                        <button className="btnLimpiar">Limpiar</button>
                        <button className="btnGuardar" onClick={GuardarDatos} >Dar de baja</button>
                        
                        
                    </div>
                </form>

               
            </section>

        <section className="containerTabla">

            <section className="table-responsive">
                <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                    {/* <th>Imagen</th> */}
                    <th>Fecha de baja</th>
                    <th>Codigo del producto</th>
                    <th>Cantidad</th>
                    <th>Anotaciones</th>
                    <th>usuario</th>
                    <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
               
                    

                </tbody>
            </table>
            </section>
        </section>
         
    </>)
}

export default BajaProducto;