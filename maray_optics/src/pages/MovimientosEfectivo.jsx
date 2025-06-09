import { useEffect, useState } from "react"

const MovimientoEfectivo = ({page}) =>{

    const [movimientoEfecto, setMovimientoEfecto] = useState();

    useEffect(() =>{

        fetch()
    },[])

    return(<>
            <main className="containerProducts">
                <button onClick={() => page(1)}>Regresar</button>
                

                <button>Corte de caja</button>
                <button>Movimiento de efectivo</button>

                <section className="containerTabla">
                    <h2>Movimientos Efectivos</h2>

                    <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Descripcion</th>
                        
                        <th>Cantidad</th>
                        
                    </tr>
                </thead>
                <tbody>
                            <tr>
                                <td></td>
                                <td> </td>
                                
                                <td> <input type="number" placeholder="Descuento" min={0} value={0} /> </td>
                                <td></td>
                        
                    </tr>
                        
                </tbody>
            </table>
            </div>

                </section>
            </main>
    </>)
}

export default MovimientoEfectivo