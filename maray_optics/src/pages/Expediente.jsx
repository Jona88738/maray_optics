import Navbar from "../components/navbar";

const Expediente = () => {
    return(<>
        <Navbar/>
        <h1  style={{textAlign: 'center', marginBottom: '15px'}} >Expedientes </h1>
         <main className="containerProducts">

            <section className="inputBusqueda">
                <div className="input">
                    <label htmlFor="">Buscar categoría</label>
                    <input
                        type="text"
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}
                        placeholder="Escribe el nombre..."
                    />
                </div>
            </section>

         </main>
    </>)
}

export default Expediente;