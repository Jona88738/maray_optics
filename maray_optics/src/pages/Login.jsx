import '../App.css';

const Login = () => {
    return(
        <>
            <main className='bodyLogin'> 
                <section className='sectionLogin'>

                
                <form  className='formLogin'>
                    <div className='inputLogin'>
                    <label htmlFor="">Usuario</label>
                    <input type="text" />
                    </div>
                    <div className='inputLogin'>
                        <label htmlFor="">Password</label>
                        <input type='password' />
                    </div>
                    <button type='button'>Iniciar Sesion</button>


                </form>
                </section>
            </main>
            

        </>
    )
};

export default Login;