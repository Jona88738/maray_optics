
const FormEditExpediente = () =>{

    return(<>

     <main className="scroll">
            
            <form className="formLogin">
                <h2>Registro de pacientes</h2>
                <div className="input">
                    <label htmlFor="">*nombre</label>
                    <input type="text" placeholder="Ingresa el nombre"
                    name="nombre"
                    value={datos.nombre} 
                    onChange={guardarDatos}/>
                </div>
                <div className="input">
                    <label htmlFor="">*Apellido</label>
                    <input type="text" placeholder="Ingresa el apellido"
                    name="apellido"
                    value={datos.apellido}
                    onChange={guardarDatos} />
                </div>
                <div className="input">
                    <label htmlFor="">*Fecha de nacimiento</label>
                    <input type="date"
                    name="fechaNacimiento"
                    value={datos.fechaNacimiento}
                    onChange={guardarDatos} />
                </div>
                <div className="input">
                    <label htmlFor="">*Edad</label>
                    <input type="text" placeholder="Ingresa la edad"
                    name="edad"
                    value={datos.edad}
                    onChange={guardarDatos}/>
                </div>
                <div className="input">
                    <label htmlFor="">*telefono</label>
                    <input type="text" placeholder="Ingresa el telefono"
                    name="telefono"
                    value={datos.telefono}
                    onChange={guardarDatos}/>
                </div>
                <div className="input">
                    <label htmlFor="">*correo</label>
                    <input type="text" placeholder="Ingresa el correo"
                    name="correo"
                    value={datos.correo}
                    onChange={guardarDatos}/>
                </div>
                <button onClick={btnGuardar}  className="btnGuardar">Guardar</button>
            </form>
        </main>
    </>)
}

export default FormEditExpediente;