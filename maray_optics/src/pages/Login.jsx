import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Swal from 'sweetalert2';


const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

const verificarDatosLogin = (e) =>{
    e.preventDefault();

    if(!usuario || !password)  return Swal.fire({title: 'Alerta', text: "* Todos los campos son requeridos",showConfirmButton: true, confirmButtonText: "cerrar", icon:"warning"})

    fetch(`http://localhost:3000/usuario/login?usuario=${usuario}&&password=${password}`,{
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
    })
        .then((res) => res.json())
        .then((res) =>{
            console.log("result",res.result);
            if(res.result){
                navigate('/Home')
            }else{
                Swal.fire({title:"Alerta", text:"No pudimos iniciar sesión. Verifica tus datos e inténtalo nuevamente.", icon:"warning"})
            }

        })
    //console.log("XD"+ usuario);
    

    // const usuario = document.getElementById("");
}

    return(
        <>
            <main className='bodyLogin'> 
                <section className='sectionLogin'>

                
                <form onSubmit={verificarDatosLogin}  className='formLogin'>
                    
                    <div className='logo_login'>
                        <img src="./logo_maray.jpeg" alt="logo" width="65%" height="auto" />
                    </div>

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