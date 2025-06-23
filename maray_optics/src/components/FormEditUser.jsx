import { useState } from "react";

const FormEditarUser = ({dato})=> {

    const [datos, setDatos] = useState(dato);

    const onChangeDatos = (e) => {
        const {name, value} = e.target;

        setDatos({
            ...datos,
            [name]: value
        })

    }

    return(<>
    
    <main className="scroll">
        <form className="formLogin">
            <h2>Registro de Usuarios</h2>
                <div className="input">
                    <label htmlFor="">*Usuario</label>
                    <input type="text" placeholder="Ingresa un usuario con el cual vas a ingresar a tu cuenta."
                    name="usuario"
                     value={datos.usuario} 
                     onChange={onChangeDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">*nombre</label>
                    <input type="text" placeholder="Ingresa el nombre"
                    name="nombre"
                     value={datos.nombre} 
                     onChange={onChangeDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">*Apellidos</label>
                    <input type="text" placeholder="Ingresa el apellido"
                    name="apellidos"
                     value={datos.apellidos} 
                     onChange={onChangeDatos}
                    />
                </div>
               
                <div className="input">
                    <label htmlFor="">*Correo</label>
                    <input type="text" placeholder="Ingresa el correo"
                    name="correo"
                     value={datos.correo} 
                     onChange={onChangeDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">*Telefono</label>
                    <input type="text" placeholder="Ingresa tu telefono"
                    name="telefono"
                     value={datos.telefono} 
                     onChange={onChangeDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">Curp</label>
                    <input type="text" placeholder="Ingresa tu curp"
                    name="curp"
                     value={datos.curp} 
                     onChange={onChangeDatos}
                    />
                </div>
                <div className="input">
                    <label htmlFor="">Titulo profesional</label>
                    <input type="text" placeholder="Ingresa tu curp"
                    name="titulo_profesional"
                     value={datos.titulo_profesional} 
                     onChange={onChangeDatos}
                    />
                </div>

                <button className="btnGuardar">Guardar</button>
        </form>
    </main>
    </>)
}
export default FormEditarUser