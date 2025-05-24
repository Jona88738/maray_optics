import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';



const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

const verificarDatosLogin = (e) =>{
    e.preventDefault();
    console.log("XD"+ usuario);
    navigate('/Home')

    // const usuario = document.getElementById("");
}

    return(
        <>
            <main className='bodyLogin'> 
                <section className='sectionLogin'>

                
                <form onSubmit={verificarDatosLogin}  className='formLogin'>

                    <div className='inputLogin'>
                    <label htmlFor="">Usuario</label>
                    <input 
                    type="text"
                    placeholder='Usuario'
                    value={usuario}
                    maxLength={100}
                    onChange={(e) => setUsuario(e.target.value)} />
                    </div>

                    <div className='inputLogin'>
                        <label htmlFor="">Password</label>
                        <input 
                        type='password'
                        placeholder='Password'
                        value={password}
                        maxLength={100}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className='btnLogin' type='submit'>Iniciar Sesion</button>


                </form>
                </section>
            </main>
            

        </>
    )
};

export default Login;