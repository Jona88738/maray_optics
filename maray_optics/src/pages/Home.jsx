import Navbar from "../components/navbar";
import { Link } from 'react-router-dom';
import '../../styles/home.css'

// const Home = () =>{
//     return(
//         <>
//             <main className="mainHome">
//                 <Navbar/>
                
                
//         <div className="main-content">
//             <div className="containerHome">
//             {/* <div className="header">
//                 <h1>Dashboard Maray Optics</h1>
//             </div> */}

//             <div className="dashboard-grid">
//                 <div className="card ventas floating" id="ventas-card" style={{animationDelay: '0s'}}>
//                     <div className="card-header">
//                         <div className="card-icon ventas">
//                             💰
//                         </div>
//                         <div>
//                             <div className="card-title">Ventas de la Semana</div>
//                             <div className="card-subtitle">Resumen de ingresos</div>
//                         </div>
//                     </div>
//                     <div className="card-stats">
//                         <div>
//                             <div className="stat-number">$24,580</div>
//                             <div className="stat-label">Total semanal</div>
//                         </div>
//                         <div className="trend trend-up">+15.3%</div>
//                     </div>
//                 </div>

//                 <div className="card consultas floating" id="consultas-card" style={{animationDelay: '0.2s'}}>
//                     <div className="card-header">
//                         <div className="card-icon consultas">
//                             👁️
//                         </div>
//                         <div>
//                             <div className="card-title">Consultas Realizadas</div>
//                             <div className="card-subtitle">Exámenes completados</div>
//                         </div>
//                     </div>
//                     <div className="card-stats">
//                         <div>
//                             <div className="stat-number">127</div>
//                             <div className="stat-label">Esta semana</div>
//                         </div>
//                         <div className="trend trend-up">+8.2%</div>
//                     </div>
//                 </div>

//                 <div className="card expedientes floating" id="expedientes-card" style={{animationDelay: '0.4s'}} >
//                     <div className="card-header">
//                         <div className="card-icon expedientes">
//                             📋
//                         </div>
//                         <div>
//                             <div className="card-title">Expedientes</div>
//                             <div className="card-subtitle">Gestión de pacientes</div>
//                         </div>
//                     </div>
//                     <div className="card-stats">
//                         <div>
//                             <div className="stat-number">1,248</div>
//                             <div className="stat-label">Total activos</div>
//                         </div>
//                         <div className="trend trend-up">+12.1%</div>
//                     </div>
//                 </div>

//                 <div className="card productos floating" id="productos-card" style={{animationDelay: '0.6s'}}>
//                     <div className="card-header">
//                         <div className="card-icon productos">
//                             🛍️
//                         </div>
//                         <div>
//                             <div className="card-title">Productos</div>
//                             <div className="card-subtitle">Inventario y catálogo</div>
//                         </div>
//                     </div>
//                     <div className="card-stats">
//                         <div>
//                             <div className="stat-number">342</div>
//                             <div className="stat-label">En stock</div>
//                         </div>
//                         <div className="trend trend-down">-3.1%</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//       </div>          
//             {/* <section classNameName="containerHome">
//                 <h2 classNameName="TitleHome">Home</h2>

//                 <section classNameName="containerMainHome">
//                     <article classNameName="containerApartadoHomeVenta">
//                         <div>
//                             <svg xmlns="http://www.w3.org/2000/svg" height="90px" viewBox="0 -960 960 960" width="90px" fill="#e3e3e3"><path d="M880-740v520q0 24-18 42t-42 18H140q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42ZM140-631h680v-109H140v109Zm0 129v282h680v-282H140Zm0 282v-520 520Z"/></svg>
//                         </div>
//                         <div>
//                             <h4>VENTAS DE LA SEMANA</h4>
//                         </div>
                        

//                     </article>
//                     <article classNameName="containerApartadoHomeConsulta">
//                         <div>
//                             <svg xmlns="http://www.w3.org/2000/svg" height="90px" viewBox="0 -960 960 960" width="90px" fill="#e3e3e3"><path d="M480.12-330q70.88 0 120.38-49.62t49.5-120.5q0-70.88-49.62-120.38T479.88-670Q409-670 359.5-620.38T310-499.88q0 70.88 49.62 120.38t120.5 49.5Zm-.36-58q-46.76 0-79.26-32.74-32.5-32.73-32.5-79.5 0-46.76 32.74-79.26 32.73-32.5 79.5-32.5 46.76 0 79.26 32.74 32.5 32.73 32.5 79.5 0 46.76-32.74 79.26-32.73 32.5-79.5 32.5Zm.24 188q-146 0-264-83T40-500q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.17 240Q601-260 702.5-325.5 804-391 857-500q-53-109-154.33-174.5Q601.34-740 480.17-740T257.5-674.5Q156-609 102-500q54 109 155.33 174.5Q358.66-260 479.83-260Z"/></svg>
//                         </div>
//                         <div>
//                             <h4>Consultas Realizadas</h4>
//                         </div>
                        
//                     </article>
//                     <article classNameName="containerApartadoHomeExpediente">
//                         <div>
//                             <svg xmlns="http://www.w3.org/2000/svg" height="90px" viewBox="0 -960 960 960" width="90px" fill="#e3e3e3"><path d="m694-120 53-54-93-93-54 53q-20 20-19.5 47t19.5 47q20 19 47 19.5t47-19.5Zm94-95 54-53q20-20 19.5-47T841-362q-20-20-46.28-20T748-362l-53 54 93 93ZM736-78q-37 37-89 37t-89-37q-37-37-37-89t37-89l148-148q37-37 89-37t89 37q37 37 37 89t-37 89L736-78ZM180-180v-600 600Zm0 60q-24.75 0-42.37-17.63Q120-155.25 120-180v-600q0-24.75 17.63-42.38Q155.25-840 180-840h205q5-35 32-57.5t63-22.5q36 0 63 22.5t32 57.5h205q24.75 0 42.38 17.62Q840-804.75 840-780v284q-15-4-30-5t-30 1v-280H180v600h281q-1 15 .5 30t5.5 30H180Zm300-677q14 0 24.5-10.5T515-832q0-14-10.5-24.5T480-867q-14 0-24.5 10.5T445-832q0 14 10.5 24.5T480-797ZM280-620v-60h400v60H280Zm0 170v-60h400v49q-3 2-6.5 5t-6.5 6H280Zm0 170v-60h277l-42 42q-5 5-8.5 9t-7.5 9H280Z"/></svg>
//                         </div>
//                         <div>
//                             <h4>Expedientes</h4>
//                         </div>
//                     </article>
//                     <article classNameName="containerApartadoHomeProducto">
//                         <div>
//                             <svg xmlns="http://www.w3.org/2000/svg" height="90px" viewBox="0 -960 960 960" width="90px" fill="#e3e3e3"><path d="M620-159 460-319l43-43 117 117 239-239 43 43-282 282Zm220-414h-60v-207h-60v90H240v-90h-60v600h251v60H180q-26 0-43-17t-17-43v-600q0-26 17-43t43-17h202q7-35 34.5-57.5T480-920q36 0 63.5 22.5T578-840h202q26 0 43 17t17 43v207ZM480-780q17 0 28.5-11.5T520-820q0-17-11.5-28.5T480-860q-17 0-28.5 11.5T440-820q0 17 11.5 28.5T480-780Z"/></svg>
//                         </div>
//                         <div>
//                             <h4>Producto</h4>
//                         </div>

//                     </article>
//                 </section>
//             </section> */}
                
//             </main>

            
//         </>
//     )
// }

import React, { useState } from 'react';

// Main App component
const Home = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Function to toggle simulated full screen mode using CSS
  const toggleFullScreen = () => {
    setIsFullScreen(prev => !prev);
  };

  return (
    <>
      <style>
        {`
          /* Importa la fuente Inter de Google Fonts */
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

          /* Estilos globales para el cuerpo */
          body {
            margin: 0;
            font-family: 'Inter', sans-serif;
            background-color: #f3f4f6; /* Color de fondo similar a bg-gray-100 */
            color: #1f2937; /* Color de texto principal similar a text-gray-900 */
          }

          /* Contenedor principal de la aplicación */
          .app-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start; /* Alinea el contenido arriba */
            padding: 1rem; /* p-4 */
            transition: all 0.3s ease-in-out; /* transition-all duration-300 */
          }

          /* Estilos para el modo de pantalla completa simulado */
          .app-container.fullscreen {
            position: fixed;
            inset: 0; /* top:0, right:0, bottom:0, left:0 */
            z-index: 50;
            overflow: auto;
          }

          /* Estilos del encabezado */
          .header {
            width: 100%;
            max-width: 64rem; /* max-w-4xl */
            background-color: #ffffff; /* bg-white */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
            border-radius: 0.75rem; /* rounded-xl */
            padding: 1.5rem; /* p-6 */
            margin-bottom: 2rem; /* mb-8 */
            display: flex;
            justify-content: space-between; /* Ajustado para centrar el logo y el botón */
            align-items: center;
            position: relative;
          }

          /* Ajuste del encabezado en pantalla completa para pantallas medianas y grandes */
          @media (min-width: 768px) { /* md breakpoint */
            .header.fullscreen {
              max-width: 100%; /* md:max-w-full */
            }
          }

          /* Estilos del logo/nombre de marca en el encabezado */
          .header-brand {
            display: flex;
            align-items: center;
            gap: 0.75rem; /* space-x-3 */
            /* Centrar el logo si no hay nav */
            flex-grow: 1;
            justify-content: center;
          }

          .header-brand-text {
            font-size: 1.5rem; /* text-2xl */
            font-weight: 700; /* font-bold */
            color: #1f2937; /* text-gray-800 */
          }

          /* Estilos del botón de pantalla completa */
          .fullscreen-button {
            position: absolute; /* Para que quede en la esquina */
            top: 1rem; /* top-4 */
            right: 1rem; /* right-4 */
            padding: 0.5rem; /* p-2 */
            border-radius: 9999px; /* rounded-full */
            background-color: #e5e7eb; /* bg-gray-200 */
            color: #4b5563; /* text-gray-700 */
            transition: background-color 0.2s ease-in-out; /* transition-colors duration-200 */
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .fullscreen-button:hover {
            background-color: #d1d5db; /* hover:bg-gray-300 */
          }

          .fullscreen-icon {
            width: 1.5rem; /* w-6 */
            height: 1.5rem; /* h-6 */
          }

          /* Estilos del área de contenido principal */
          .main-content {
            width: calc(100% - 10%); /* Ajustado para el margen izquierdo */
            max-width: 64rem; /* max-w-4xl */
            margin-left: 10%; /* Añadido margin-left del 10% */
            margin-right: auto; /* Para que el margen izquierdo sea el dominante y el contenido se ajuste */
          }

          /* Ajuste del contenido principal en pantalla completa para pantallas medianas y grandes */
          @media (min-width: 768px) { /* md breakpoint */
            .main-content.fullscreen {
              max-width: 100%; /* md:max-w-full */
            }
          }

          /* Contenedor del título principal */
          .title-box {
            background-color: #ffffff; /* Fondo blanco para el cuadro */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* Sombra */
            border-radius: 0.75rem; /* Bordes redondeados */
            padding: 1.5rem 2rem; /* Espaciado interno: reducido el padding vertical */
            margin-bottom: 4rem; /* Margen inferior */
            text-align: center; /* Centrar el texto */
            display: flex; /* Para centrar el h1 verticalmente si fuera necesario */
            align-items: center;
            justify-content: center;
            width: fit-content; /* Ajustar al contenido */
            margin-left: auto; /* Centrar horizontalmente DENTRO de main-content */
            margin-right: auto; /* Centrar horizontalmente DENTRO de main-content */
          }

          /* Título principal del panel */
          .main-title {
            font-size: 2.25rem; /* text-4xl */
            font-weight: 800; /* font-extrabold */
            color: #1f2937; /* text-gray-900 */
            margin: 0; /* Eliminar margen predeterminado del h1 */
          }

          /* Contenedor de la cuadrícula de tarjetas */
          .cards-grid {
            display: grid;
            grid-template-columns: 1fr; /* Por defecto, una columna en móviles */
            gap: 1.5rem; /* gap-6 */
            /* margin-left: 10%;  -- Este margen se ha movido a .main-content */
          }

          /* Ajuste de la cuadrícula para dos columnas en pantallas medianas y grandes */
          @media (min-width: 768px) { /* md breakpoint */
            .cards-grid {
              grid-template-columns: repeat(2, 1fr); /* md:grid-cols-2 */
            }
          }

          /* Estilos para las tarjetas individuales */
          .card {
            color: #ffffff; /* text-white */
            padding: 1rem; /* p-6, reducido a 1rem para menor altura */
            border-radius: 0.5rem; /* rounded-xl (ajustado para ser más rectangular) */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            transform: scale(1); /* transform */
            transition: transform 0.3s ease-in-out; /* transition-transform duration-300 */
          }

          .card:hover {
            transform: scale(1.05); /* hover:scale-105 */
          }

          /* Estilos para el ícono dentro de la tarjeta */
          .card-icon-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem; /* p-3, reducido a 0.5rem */
            border-radius: 9999px; /* rounded-full */
            background-color: rgba(255, 255, 255, 0.2); /* bg-white bg-opacity-20 */
            margin-bottom: 0.75rem; /* mb-4, reducido a 0.75rem */
          }

          .card-icon {
            width: 1.75rem; /* w-8, reducido a 1.75rem */
            height: 1.75rem; /* h-8, reducido a 1.75rem */
            color: #ffffff; /* text-white */
          }

          /* Título de la tarjeta */
          .card-title {
            font-size: 1.125rem; /* text-xl, reducido a 1.125rem */
            font-weight: 600; /* font-semibold */
            margin-bottom: 0.25rem; /* mb-2, reducido a 0.25rem */
          }

          /* Valor principal de la tarjeta */
          .card-value {
            font-size: 2rem; /* text-4xl, reducido a 2rem */
            font-weight: 700; /* font-bold */
            margin-bottom: 0.75rem; /* mb-4, reducido a 0.75rem */
          }

          /* Descripción de la tarjeta */
          .card-description {
            font-size: 0.8rem; /* text-sm, reducido a 0.8rem */
            opacity: 0.9; /* opacity-90 */
          }

          /* Colores de fondo para las tarjetas */
          .bg-green-gradient {
            background: linear-gradient(to right, #22c55e, #16a34a); /* from-green-500 to-green-600 */
          }
          .bg-blue-gradient {
            background: linear-gradient(to right, #3b82f6, #2563eb); /* from-blue-500 to-blue-600 */
          }
          .bg-red-gradient {
            background: linear-gradient(to right, #ef4444, #dc2626); /* from-red-500 to-red-600 */
          }
          .bg-yellow-gradient {
            background: linear-gradient(to right, #f59e0b, #d97706); /* from-yellow-500 to-yellow-600 */
          }

          /* Estilos del pie de página */
          .footer {
            margin-top: 1rem; /* mt-12 */
            color: #6b7280; /* text-gray-500 */
            font-size: 0.875rem; /* text-sm */
            text-align: center;
          }
        `}
      </style>
            {/* <Navbar/> */}
      <div className={`app-container ${isFullScreen ? 'fullscreen' : ''}`}>
        {/* Sección del encabezado */}
        

        {/* Área de contenido principal */}
        <main className={`main-content ${isFullScreen ? 'fullscreen' : ''}`}>
          {/* Cuadro para el título principal del panel */}
          <div className="title-box">
            <h1 className="main-title">Bienvenido al Panel de Control</h1>
          </div>

          {/* Cuadrícula para métricas/acciones clave */}
          <div className="cards-grid">
            {/* Tarjeta: Ventas de la Semana */}
            <Card
              title="Ventas de la Semana"
              value="120"
              icon={<ChartLineIcon className="card-icon" />}
              bgColorClass="bg-green-gradient"
              description="Incremento del 15% respecto a la semana anterior."
            />

            {/* Tarjeta: Consultas Realizadas */}
            <Card
              title="Consultas Realizadas"
              value="45"
              icon={<EyeIcon className="card-icon" />}
              bgColorClass="bg-blue-gradient"
              description="2 nuevas consultas hoy."
            />

            {/* Tarjeta: Expedientes */}
            <Card
              title="Expedientes Activos"
              value="89"
              icon={<DocumentTextIcon className="card-icon" />}
              bgColorClass="bg-red-gradient"
              description="3 expedientes actualizados recientemente."
            />

            {/* Tarjeta: Productos en Stock */}
            <Card
              title="Productos en Stock"
              value="230"
              icon={<CubeIcon className="card-icon" />}
              bgColorClass="bg-yellow-gradient"
              description="10 productos bajo mínimo."
            />
          </div>
        </main>

        {/* Opcional: Pie de página u otras secciones */}
        <footer className="footer">
          <p>&copy; 2025 Maray_Optics. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  );
};

// Componente Card para mostrar información
const Card = ({ title, value, icon, bgColorClass, description }) => {
  return (
    <div className={`card ${bgColorClass}`}>
      <div className="card-icon-wrapper">
        {icon}
      </div>
      <h2 className="card-title">{title}</h2>
      <p className="card-value">{value}</p>
      
    </div>
  );
};

// Iconos SVG (simplificados para demostración)
const ChartLineIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8L11 2m9 9v9a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h9l-5 5h5z" />
  </svg>
);

const EyeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const DocumentTextIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CubeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

// Nuevos iconos SVG para alternar pantalla completa
const MaximizeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5v4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
  </svg>
);

const MinimizeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h4m-4 0V4m0 4l5-5m7 11h4m-4 0v4m0-4l5 5M4 16h4m-4 0v4m0-4l5 5m7-11h4m-4 0V4m0 4l5-5" />
  </svg>
);

export default Home;