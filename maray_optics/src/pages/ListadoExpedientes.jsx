import { useEffect } from "react";
import { useState } from "react";
import MostrarConsulta from "./MostrarConsulta";

const ListadoExpediente = ({page,id}) => {

    const [paginaActual, setPaginaActual] = useState(1);
    const [cambiarPage, setCambiarPage] = useState({action: 0, data: {}});
    //  Nuevo estado para la búsqueda
        const [filtroNombre, setFiltroNombre] = useState('');
        const [expedientes, setExpedientes]   = useState([]);
        const elementosPorPagina = 10;

    useEffect(() => {
        fetch(`/api/expedientes/listado?id=${id}`)
        .then(res => res.json())
        .then((res) =>{
            if(res.result){
                console.log(res.data)
                setExpedientes(res.data);
            }else{

            }
        })
    },[])

         //  Aplicar filtro por nombre
    const datosFiltrados = expedientes.filter(item =>
        item.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) 
    );

     const totalPaginas = Math.ceil(expedientes.length / elementosPorPagina);
    
    const datosPaginados = datosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
);
    return (<>

    {cambiarPage.action === 0 ? (
        <>
        <section className="containerTitulo">

            <button className="btnRegresar" onClick={() => page(0)}>
                   <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
               
                  Regresar</button>

            

        </section>

        <main className="containerProducts">
            <section className="inputBusqueda">
                <h2 style={{ fontWeight: '800' }}>Listado de expedientes</h2>
                <hr />
                <div className="input">
                    <label htmlFor="">Buscar Expediente</label>
                    <input
                        type="text"
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}
                        placeholder="Escribe el nombre..."
                    />
                </div>
            </section>

        <section className="containerTabla">

            <section className="table-responsive">

                <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                    {/* <th>Imagen</th> */}
                    <th>Fecha</th>
                    <th>Consulto</th>
                    {id === 0 ? (<th>Paciente</th>):null}
                    <th>Opciones</th>
                    
                    </tr>
                </thead>
                <tbody>
                
                 {expedientes.length > 0 ? (
                                datosPaginados.map((element, index) => (
                                    <tr key={element.id}>
                                        {/* <td>{(paginaActual - 1) * elementosPorPagina + index + 1}</td> */}
                                        
                                        <td id="codigo">{element.fecha_consulta}</td>
                                        <td id="nombre">{element.nombre}</td>
                                        {id === 0 ? (<td>{element.expedienteNombre === null ? 'Consulta sin expediente': element.expedienteNombre}</td>):null}
                                        <td>
                                            
                                                <button  className='btnBaja' style={{marginLeft: '15px'}} onClick={() => setCambiarPage({action: 1, data: element.id})}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M680-326.67q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-66.66q22.67 0 38-15.34 15.33-15.33 15.33-38 0-22.66-15.33-38Q702.67-500 680-500t-38 15.33q-15.33 15.34-15.33 38 0 22.67 15.33 38 15.33 15.34 38 15.34ZM440-46.67v-116q0-21 10-39.5t28-29.5q29.33-17.66 61.17-30.16 31.83-12.5 65.5-19.84L680-186l75.33-95.67q33.67 7.34 65 19.84 31.34 12.5 60.67 30.16 18 11 28.5 29.5t10.5 39.5v116H440Zm66.33-66.66H652L579.33-206q-19.33 7-37.66 16-18.34 9-35.34 19.33v57.34Zm201.67 0h145.33v-57.34q-16.66-10.66-34.66-19.5-18-8.83-37.34-15.83L708-113.33Zm-56 0Zm56 0ZM186.67-120q-27.5 0-47.09-19.58Q120-159.17 120-186.67v-586.66q0-27.5 19.58-47.09Q159.17-840 186.67-840h586.66q27.5 0 47.09 19.58Q840-800.83 840-773.33V-542q-12.67-20-29-37.33-16.33-17.34-37.67-28v-166H186.67v586.66h188.66q-1 6-1.5 12t-.5 12V-120H186.67ZM280-613.33h320.67q18-10 38.22-15 20.23-5 41.11-5V-680H280v66.67Zm0 166.66h213.33q0-17 3.17-34t9.17-32.66H280v66.66ZM280-280h151.33q15-11.67 31.84-19.67 16.83-8 34.5-15.33v-31.67H280V-280Zm-93.33 93.33v-586.66 165.66-25.66V-186.67Zm493.33-260Z"/></svg>
                                          
                                               </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>No hay resultados</td>
                                </tr>
                            )} 
                    
                </tbody>
            </table>
            </section>
        </section>

        </main>
        </>
        ): cambiarPage.action === 1 ? (<MostrarConsulta page={setCambiarPage} id={cambiarPage.data}/>): null}
    </>)
}

export default ListadoExpediente;