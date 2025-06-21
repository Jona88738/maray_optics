

const FormCreateUser = () => {

    return(<>
    <main className="scroll">
        <form className="formLogin">
            <h2>Registro de Usuarios</h2>
                <div className="input">
                    <label htmlFor="">*Usuario</label>
                    <input type="text" placeholder="Ingresa un usuario con el cual vas a ingresar a tu cuenta."
                    name="nombre"
                    // value={datos.nombre} 
                    // onChange={guardarDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">*nombre</label>
                    <input type="text" placeholder="Ingresa el nombre"
                    name="nombre"
                    // value={datos.nombre} 
                    // onChange={guardarDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">*Apellidos</label>
                    <input type="text" placeholder="Ingresa el apellido"
                    name="nombre"
                    // value={datos.nombre} 
                    // onChange={guardarDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">*Contraseña</label>
                    <input type="password" placeholder="Ingresa la contraseña"
                    name="nombre"
                    // value={datos.nombre} 
                    // onChange={guardarDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">*Correo</label>
                    <input type="text" placeholder="Ingresa el correo"
                    name="nombre"
                    // value={datos.nombre} 
                    // onChange={guardarDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">*Telefono</label>
                    <input type="text" placeholder="Ingresa tu telefono"
                    name="nombre"
                    // value={datos.nombre} 
                    // onChange={guardarDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">Curp</label>
                    <input type="text" placeholder="Ingresa tu curp"
                    name="nombre"
                    // value={datos.nombre} 
                    // onChange={guardarDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">Titulo profesional</label>
                    <input type="text" placeholder="Ingresa tu curp"
                    name="nombre"
                    // value={datos.nombre} 
                    // onChange={guardarDatos}
                    />
                </div>

                <button className="btnGuardar">Guardar</button>
        </form>
    </main>
           
    </>)
}

export default FormCreateUser;