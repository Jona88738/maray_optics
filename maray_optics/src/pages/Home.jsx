import Navbar from "../components/navbar";
import { Link } from 'react-router-dom';
import '../../styles/home.css'

const Home = () =>{
    return(
        <>
            <main className="mainHome">
                <Navbar/>
                
                
        <div className="main-content">
            <div className="containerHome">
            {/* <div className="header">
                <h1>Dashboard Maray Optics</h1>
            </div> */}

            <div className="dashboard-grid">
                <div className="card ventas floating" id="ventas-card" style={{animationDelay: '0s'}}>
                    <div className="card-header">
                        <div className="card-icon ventas">
                            💰
                        </div>
                        <div>
                            <div className="card-title">Ventas de la Semana</div>
                            <div className="card-subtitle">Resumen de ingresos</div>
                        </div>
                    </div>
                    <div className="card-stats">
                        <div>
                            <div className="stat-number">$24,580</div>
                            <div className="stat-label">Total semanal</div>
                        </div>
                        <div className="trend trend-up">+15.3%</div>
                    </div>
                </div>

                <div className="card consultas floating" id="consultas-card" style={{animationDelay: '0.2s'}}>
                    <div className="card-header">
                        <div className="card-icon consultas">
                            👁️
                        </div>
                        <div>
                            <div className="card-title">Consultas Realizadas</div>
                            <div className="card-subtitle">Exámenes completados</div>
                        </div>
                    </div>
                    <div className="card-stats">
                        <div>
                            <div className="stat-number">127</div>
                            <div className="stat-label">Esta semana</div>
                        </div>
                        <div className="trend trend-up">+8.2%</div>
                    </div>
                </div>

                <div className="card expedientes floating" id="expedientes-card" style={{animationDelay: '0.4s'}} >
                    <div className="card-header">
                        <div className="card-icon expedientes">
                            📋
                        </div>
                        <div>
                            <div className="card-title">Expedientes</div>
                            <div className="card-subtitle">Gestión de pacientes</div>
                        </div>
                    </div>
                    <div className="card-stats">
                        <div>
                            <div className="stat-number">1,248</div>
                            <div className="stat-label">Total activos</div>
                        </div>
                        <div className="trend trend-up">+12.1%</div>
                    </div>
                </div>

                <div className="card productos floating" id="productos-card" style={{animationDelay: '0.6s'}}>
                    <div className="card-header">
                        <div className="card-icon productos">
                            🛍️
                        </div>
                        <div>
                            <div className="card-title">Productos</div>
                            <div className="card-subtitle">Inventario y catálogo</div>
                        </div>
                    </div>
                    <div className="card-stats">
                        <div>
                            <div className="stat-number">342</div>
                            <div className="stat-label">En stock</div>
                        </div>
                        <div className="trend trend-down">-3.1%</div>
                    </div>
                </div>
            </div>
        </div>
      </div>          
            {/* <section classNameName="containerHome">
                <h2 classNameName="TitleHome">Home</h2>

                <section classNameName="containerMainHome">
                    <article classNameName="containerApartadoHomeVenta">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="90px" viewBox="0 -960 960 960" width="90px" fill="#e3e3e3"><path d="M880-740v520q0 24-18 42t-42 18H140q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42ZM140-631h680v-109H140v109Zm0 129v282h680v-282H140Zm0 282v-520 520Z"/></svg>
                        </div>
                        <div>
                            <h4>VENTAS DE LA SEMANA</h4>
                        </div>
                        

                    </article>
                    <article classNameName="containerApartadoHomeConsulta">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="90px" viewBox="0 -960 960 960" width="90px" fill="#e3e3e3"><path d="M480.12-330q70.88 0 120.38-49.62t49.5-120.5q0-70.88-49.62-120.38T479.88-670Q409-670 359.5-620.38T310-499.88q0 70.88 49.62 120.38t120.5 49.5Zm-.36-58q-46.76 0-79.26-32.74-32.5-32.73-32.5-79.5 0-46.76 32.74-79.26 32.73-32.5 79.5-32.5 46.76 0 79.26 32.74 32.5 32.73 32.5 79.5 0 46.76-32.74 79.26-32.73 32.5-79.5 32.5Zm.24 188q-146 0-264-83T40-500q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.17 240Q601-260 702.5-325.5 804-391 857-500q-53-109-154.33-174.5Q601.34-740 480.17-740T257.5-674.5Q156-609 102-500q54 109 155.33 174.5Q358.66-260 479.83-260Z"/></svg>
                        </div>
                        <div>
                            <h4>Consultas Realizadas</h4>
                        </div>
                        
                    </article>
                    <article classNameName="containerApartadoHomeExpediente">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="90px" viewBox="0 -960 960 960" width="90px" fill="#e3e3e3"><path d="m694-120 53-54-93-93-54 53q-20 20-19.5 47t19.5 47q20 19 47 19.5t47-19.5Zm94-95 54-53q20-20 19.5-47T841-362q-20-20-46.28-20T748-362l-53 54 93 93ZM736-78q-37 37-89 37t-89-37q-37-37-37-89t37-89l148-148q37-37 89-37t89 37q37 37 37 89t-37 89L736-78ZM180-180v-600 600Zm0 60q-24.75 0-42.37-17.63Q120-155.25 120-180v-600q0-24.75 17.63-42.38Q155.25-840 180-840h205q5-35 32-57.5t63-22.5q36 0 63 22.5t32 57.5h205q24.75 0 42.38 17.62Q840-804.75 840-780v284q-15-4-30-5t-30 1v-280H180v600h281q-1 15 .5 30t5.5 30H180Zm300-677q14 0 24.5-10.5T515-832q0-14-10.5-24.5T480-867q-14 0-24.5 10.5T445-832q0 14 10.5 24.5T480-797ZM280-620v-60h400v60H280Zm0 170v-60h400v49q-3 2-6.5 5t-6.5 6H280Zm0 170v-60h277l-42 42q-5 5-8.5 9t-7.5 9H280Z"/></svg>
                        </div>
                        <div>
                            <h4>Expedientes</h4>
                        </div>
                    </article>
                    <article classNameName="containerApartadoHomeProducto">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="90px" viewBox="0 -960 960 960" width="90px" fill="#e3e3e3"><path d="M620-159 460-319l43-43 117 117 239-239 43 43-282 282Zm220-414h-60v-207h-60v90H240v-90h-60v600h251v60H180q-26 0-43-17t-17-43v-600q0-26 17-43t43-17h202q7-35 34.5-57.5T480-920q36 0 63.5 22.5T578-840h202q26 0 43 17t17 43v207ZM480-780q17 0 28.5-11.5T520-820q0-17-11.5-28.5T480-860q-17 0-28.5 11.5T440-820q0 17 11.5 28.5T480-780Z"/></svg>
                        </div>
                        <div>
                            <h4>Producto</h4>
                        </div>

                    </article>
                </section>
            </section> */}
                
            </main>

            
        </>
    )
}

export default Home;