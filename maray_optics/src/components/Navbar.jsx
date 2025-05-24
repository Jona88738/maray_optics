import '../../styles/home.css'
import { Link, useNavigate } from 'react-router-dom';
import Swalt from 'sweetalert2';
import { Navigate } from 'react-router-dom';
const Navbar = () =>{
    const navigate = useNavigate();
    const handleClick = () => {
        Swalt.fire({
            title: "Atención",
            text: "¿Estas seguro que quieres cerrar sesión?",
            icon: "warning",
            showConfirmButton: true,
            confirmButtonText: "Si, cerrar sesión",
            showCancelButton: true,
            cancelButtonText: "No, mantener",
            customClass:{
                confirmButton: "btnAlertConfirm",
                cancelButton: "btnAlertCancel",
            }
        }).then((result) => {
            if(result.isConfirmed){
                navigate('/')
            }
        })
    }   
    return (
        <>
        <nav className="navbar">
            <h2>Maray_Optics</h2>
            {/* <Link to='/'>Inicio</Link>
            <Link to='/usuarios'>Usuarios</Link>
            <Link to='/venta'>Venta</Link>
            <Link to='/productos'>Productos</Link>
            <Link to='/expediente'>Expediente</Link>
            <Link to='/salir'>Salir</Link> */}
        </nav>

        <div className="navbarIzquierda">

                    <section className="containerLogo">
                        <img src="asdfsf" alt="Logo" />
                    </section>
                    <section className="containerIconosNav">
                        <Link to='/Home' className="iconosLink">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#000000"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
                        <span className="texto">Home</span>
                        </Link>
                        <Link to='/Usuarios'  className="iconosLink">
                        <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#000000"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
                        <span className="texto">Usuarios</span>
                        </Link>
                        <Link to='/venta'  className="iconosLink">
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M266.67-633.33q-27.5 0-47.09-19.59Q200-672.5 200-700v-113.33q0-27.5 19.58-47.09Q239.17-880 266.67-880h426.66q27.5 0 47.09 19.58Q760-840.83 760-813.33V-700q0 27.5-19.58 47.08-19.59 19.59-47.09 19.59H266.67Zm0-66.67h426.66v-113.33H266.67V-700Zm-120 620q-27.5 0-47.09-19.58Q80-119.17 80-146.67v-60h800v60q0 27.5-19.58 47.09Q840.83-80 813.33-80H146.67ZM80-240l143-320.33q8.67-18 25.07-28.84Q264.47-600 283.33-600h393.34q18.86 0 35.26 10.83 16.4 10.84 25.07 28.84L880-240H80Zm260-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Z"/></svg>
                        <span className="texto">Venta</span>
                        </Link>
                        <Link to='/productos' className="iconosLink">
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M186.67-80q-27.5 0-47.09-19.58Q120-119.17 120-146.67V-619q-17.33-7.67-28.67-23.76Q80-658.85 80-680v-133.33q0-27.5 19.58-47.09Q119.17-880 146.67-880h666.66q27.5 0 47.09 19.58Q880-840.83 880-813.33V-680q0 21.15-11.33 37.24Q857.33-626.67 840-619v472.33q0 27.5-19.58 47.09Q800.83-80 773.33-80H186.67Zm0-533.33v466.66h586.66v-466.66H186.67Zm-40-66.67h666.66v-133.33H146.67V-680ZM360-413.33h240V-480H360v66.67ZM480-380Z"/></svg>
                        <span className="texto">Productos</span>
                        </Link>
                        <Link to='/expediente'  className="iconosLink">
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M680-326.67q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-66.66q22.67 0 38-15.34 15.33-15.33 15.33-38 0-22.66-15.33-38Q702.67-500 680-500t-38 15.33q-15.33 15.34-15.33 38 0 22.67 15.33 38 15.33 15.34 38 15.34ZM440-46.67v-116q0-21 10-39.5t28-29.5q29.33-17.66 61.17-30.16 31.83-12.5 65.5-19.84L680-186l75.33-95.67q33.67 7.34 65 19.84 31.34 12.5 60.67 30.16 18 11 28.5 29.5t10.5 39.5v116H440Zm66.33-66.66H652L579.33-206q-19.33 7-37.66 16-18.34 9-35.34 19.33v57.34Zm201.67 0h145.33v-57.34q-16.66-10.66-34.66-19.5-18-8.83-37.34-15.83L708-113.33Zm-56 0Zm56 0ZM186.67-120q-27.5 0-47.09-19.58Q120-159.17 120-186.67v-586.66q0-27.5 19.58-47.09Q159.17-840 186.67-840h586.66q27.5 0 47.09 19.58Q840-800.83 840-773.33V-542q-12.67-20-29-37.33-16.33-17.34-37.67-28v-166H186.67v586.66h188.66q-1 6-1.5 12t-.5 12V-120H186.67ZM280-613.33h320.67q18-10 38.22-15 20.23-5 41.11-5V-680H280v66.67Zm0 166.66h213.33q0-17 3.17-34t9.17-32.66H280v66.66ZM280-280h151.33q15-11.67 31.84-19.67 16.83-8 34.5-15.33v-31.67H280V-280Zm-93.33 93.33v-586.66 165.66-25.66V-186.67Zm493.33-260Z"/></svg>
                        <span className="texto">Expediente</span>
                        </Link>
                        <Link  className="iconosLink" onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M186.67-120q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840h292.66v66.67H186.67v586.66h292.66V-120H186.67Zm470.66-176.67-47-48 102-102H360v-66.66h351l-102-102 47-48 184 184-182.67 182.66Z"/></svg>
                        <span className="texto">Salir</span>
                        </Link>
                    </section>
                </div>
        </>
    )
} 

export default Navbar;