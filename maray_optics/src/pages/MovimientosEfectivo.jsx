import { useEffect, useState } from "react"

const MovimientoEfectivo = ({page}) =>{

    const [movimientoEfecto, setMovimientoEfecto] = useState([]);

    useEffect(() =>{

        fetch("/api/ventas/movimientoEfectivo", {
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((res) =>{
                console.log(res.data)
                setMovimientoEfecto(res.data)
            })
    },[])

    return(<>
            <main className="containerProducts">
                <section className="containerTitulo" style={{marginTop:"20px"}}>
                <button className="btnRegresar" onClick={() => page(1)}>Regresar</button>
                

                <button className="btnBaja">Corte de caja</button>
                <button className="btnBaja">Movimiento de efectivo</button>
                </section>
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
                    {movimientoEfecto.map((element,index) =>{

                        return(
                    <tr>
                                <td>{index}</td>
                                <td>{element.fecha} </td>
                                
                                <td> {element.descripcion}</td>
                                <td> {element.monto}</td>
                        
                    </tr>
                        )
                    })}
                            
                        
                </tbody>
            </table>
            </div>

                </section>
            </main>
    </>)
}

export default MovimientoEfectivo