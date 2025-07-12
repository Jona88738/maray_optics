import Navbar from "../components/navbar";
import React, { useState, useEffect } from 'react';

// Estilos CSS como una cadena de texto
const appStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

   
    .container {
        max-width: 1100px;
        width: 100%;
        background: #ffffff;
        padding: 40px;
        border-radius: 18px; /* Bordes muy redondeados */
        box-shadow: 0 15px 40px rgba(0,0,0,0.1); /* Sombra suave y profunda */
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    h1 {
        color: #1a202c;
        text-align: center;
        margin-bottom: 30px;
        font-size: 2.8em;
        font-weight: 700;
        letter-spacing: -0.8px;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.05); /* Sombra de texto sutil */
    }
    .period-selector {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;
        gap: 15px; /* Espacio entre elementos */
        flex-wrap: wrap; /* Permitir que los elementos se envuelvan */
    }
    .period-selector-group { /* Nuevo grupo para label y select */
        display: flex;
        align-items: center;
        gap: 10px; /* Espacio entre label y select */
    }
    .period-selector label {
        font-size: 1.1em;
        font-weight: 600;
        color: #495057;
    }
    .period-selector select {
        padding: 12px 20px;
        border: 2px solid #ced4da;
        border-radius: 10px;
        background-color: #ffffff;
        font-size: 1.1em;
        color: #495057;
        appearance: none; /* Eliminar estilo nativo del select */
        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23495057%22%20d%3D%22M287%2C197.3L159.2%2C69.5c-3.2-3.2-8.3-3.2-11.5%2C0L5.4%2C197.3c-3.2%2C3.2-3.2%2C8.3%2C0%2C11.5l15.3%2C15.3c3.2%2C3.2%2C8.3%2C3.2%2C11.5%2C0l115.8-115.8l115.8%2C115.8c3.2%2C3.2%2C8.3%2C3.2%2C11.5%2C0l15.3-15.3C290.2%2C205.6%2C290.2%2C200.5%2C287%2C197.3z%22%2F%3E%3C%2Fsvg%3E'); /* Flecha personalizada */
        background-repeat: no-repeat;
        background-position: right 15px top 50%;
        background-size: 0.8em auto;
        cursor: pointer;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .period-selector select:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0,123,255,0.25);
        outline: none;
    }

    .report-content {
        animation: fadeInSlide 0.7s ease-out; /* Animación al cargar nuevo contenido */
    }
    @keyframes fadeInSlide {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 25px;
        margin-bottom: 40px;
    }
    .metric-card {
        background: linear-gradient(145deg, #ffffff, #f0f4f8); /* Degradado sutil */
        border: 1px solid #e0e6ed;
        border-radius: 15px;
        padding: 30px;
        text-align: center;
        box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 160px; /* Altura mínima para consistencia */
    }
    .metric-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 30px rgba(0,0,0,0.12);
    }
    .metric-card h3 {
        margin-top: 0;
        color: #0056b3;
        font-size: 1.3em;
        margin-bottom: 10px;
        font-weight: 600;
    }
    .metric-card p {
        font-size: 3.5em; /* Número principal muy grande */
        font-weight: bold;
        color: #007bff; /* Color de acento */
        margin: 0;
        line-height: 1.1;
    }
    .metric-card small {
        color: #6c757d; /* Gris más oscuro */
        font-size: 1.1em;
        display: block;
        margin-top: 8px;
    }

    .detail-section {
        background-color: #ffffff;
        border-radius: 15px;
        padding: 35px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.07);
        margin-bottom: 30px;
        border: 1px solid #e9ecef;
    }
    .detail-section h2 {
        color: #212529;
        border-bottom: 2px solid #e9ecef;
        padding-bottom: 18px;
        margin-bottom: 30px;
        font-size: 2.2em;
        font-weight: 600;
    }
    .detail-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .detail-list li {
        display: flex;
        justify-content: space-between;
        padding: 15px 0;
        border-bottom: 1px dashed #dee2e6; /* Borde punteado */
        font-size: 1.15em;
    }
    .detail-list li:last-child {
        border-bottom: none;
    }
    .detail-list span:first-child {
        font-weight: 600;
        color: #495057;
    }
    .detail-list span:last-child {
        color: #007bff;
        font-weight: bold;
    }

    .chart-placeholder {
        background-color: #e6f7ff; /* Fondo azul claro */
        border: 1px dashed #a8d9ff;
        border-radius: 15px;
        padding: 50px;
        text-align: center;
        color: #0056b3;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-style: italic;
        font-size: 1.4em;
        margin-top: 30px;
        box-shadow: inset 0 0 20px rgba(0,123,255,0.1);
    }

    /* Media Queries para Responsividad */
    @media (max-width: 992px) {
        .container {
            padding: 30px;
        }
        h1 {
            font-size: 2.4em;
        }
        .period-selector select {
            padding: 10px 15px;
            font-size: 1em;
        }
        .metrics-grid {
            gap: 20px;
        }
        .metric-card {
            padding: 25px;
        }
        .metric-card p {
            font-size: 3em;
        }
        .detail-section {
            padding: 30px;
        }
        .detail-section h2 {
            font-size: 2em;
        }
        .detail-list li {
            font-size: 1.1em;
        }
        .chart-placeholder {
            height: 250px;
            padding: 40px;
            font-size: 1.2em;
        }
    }

    @media (max-width: 768px) {
        body {
            padding: 15px;
        }
        .container {
            padding: 20px;
        }
        h1 {
            font-size: 2em;
            margin-bottom: 25px;
        }
        .period-selector {
            flex-direction: column;
            gap: 10px;
        }
        .period-selector-group { /* Ajuste en móvil */
            flex-direction: column;
            align-items: center;
            gap: 5px;
        }
        .period-selector select {
            width: 100%;
            max-width: 250px;
        }
        .metrics-grid {
            grid-template-columns: 1fr;
            gap: 15px;
        }
        .metric-card {
            padding: 20px;
            min-height: 140px;
        }
        .metric-card p {
            font-size: 2.8em;
        }
        .detail-section {
            padding: 20px;
        }
        .detail-section h2 {
            font-size: 1.8em;
        }
        .detail-list li {
            font-size: 1em;
            padding: 12px 0;
        }
        .chart-placeholder {
            height: 200px;
            font-size: 1.1em;
            padding: 30px;
        }
    }
`;

// Datos de ejemplo para diferentes períodos
const reportData = {
    Hoy: {
        title: "Reporte de Hoy",
        displayTitle: "Hoy", // Nuevo campo para el título de la sección de detalle
        metrics: [
            { label: "Ventas Totales", value: "$ 1,500.00", unit: "MXN" },
            { label: "Unidades Vendidas", value: "25", unit: "productos" }
        ],
        details: [
            { label: "Ventas de Armazones", value: "$ 800.00" },
            { label: "Ventas de Lentes de Contacto", value: "$ 400.00" },
            { label: "Ventas de Servicios", value: "$ 300.00" },
            { label: "Descuentos Aplicados", value: "$ 50.00" },
            { label: "Devoluciones/Cancelaciones", value: "$ 0.00" }
        ],
        payments: [
            { label: "Efectivo", value: "$ 700.00" },
            { label: "Tarjeta de Crédito/Débito", value: "$ 650.00" },
            
        ],
        chartText: "Gráfico de Productos Más Vendidos del día (Ej: Lentes progresivos, armazones, líquidos)"
    },
    weekly: {
        title: "Reporte Semanal",
        displayTitle: "la Semana", // Nuevo campo para el título de la sección de detalle
        metrics: [
            { label: "Ventas Totales", value: "$ 9,800.00", unit: "MXN" },
            { label: "Venta Más Alta", value: "$ 850.00", unit: "(Ticket #0045)" }
        ],
        details: [
            { label: "Ventas Netas", value: "$ 9,600.00" },
            { label: "Descuentos Aplicados", value: "$ 200.00" },
            { label: "Devoluciones", value: "$ 150.00" },
            { label: "Servicios Realizados", value: "15" }
        ],
        payments: [
            { label: "Efectivo", value: "$ 4,500.00" },
            { label: "Tarjeta", value: "$ 4,000.00" },
            
        ],
        chartText: "Gráfico de Tendencia de Ventas Diarias de la Semana"
    },
    monthly: {
        title: "Reporte Mensual",
        displayTitle: "el Mes", // Nuevo campo para el título de la sección de detalle
        metrics: [
            { label: "Ventas Totales", value: "$ 45,200.00", unit: "MXN" }
        ],
        details: [
            { label: "Ventas de Productos", value: "$ 36,000.00" },
            { label: "Ventas de Servicios", value: "$ 9,200.00" },
            { label: "Descuentos Acumulados", value: "$ 1,500.00" },
            { label: "Total Devoluciones", value: "$ 600.00" }
        ],
        payments: [
            { label: "Efectivo", value: "$ 20,000.00" },
            { label: "Tarjeta", value: "$ 18,000.00" },
            
        ],
        chartText: "Gráfico de Ventas Semanales del Mes y Rendimiento por Vendedor"
    }
};

// Componente React
const ResumenVentas = () => {
    // Estado para el período seleccionado, por defecto es 'monthly'
    const [selectedPeriod, setSelectedPeriod] = useState('Hoy');
    const  [datos, setDatos] = useState([]);

    const cambioSelect = (e) => {

         fetch(`/api/ventas/getResumenVentas${e.target.value}`,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if(res.result){
                    console.log(res.hoy)
                    setDatos([res.hoy])
                }
            })

        setSelectedPeriod(e.target.value)
    }
    // Efecto para inyectar el CSS en el head del documento
    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = appStyles;
        document.head.appendChild(styleSheet);
        fetch("/api/ventas/getResumenVentasHoy",{
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if(res.result){
                    console.log(res.hoy)
                    setDatos([res.hoy])
                }
            })

        // Función de limpieza para remover la etiqueta de estilo cuando el componente se desmonta
        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []); // El array de dependencias vacío asegura que esto se ejecute solo una vez al montar

    // Obtiene los datos del reporte actual según el período seleccionado
   // const currentReport = reportData[selectedPeriod];
     const currentReport = reportData[selectedPeriod];

    // Función para renderizar una sección de lista (Detalle o Métodos de Pago)
    const renderListSection = (title, data) => {
        // No renderiza la sección si no hay datos o el array está vacío
        if (!data || data.length === 0) return null;
        return (
            <div className="detail-section">
                <h2>{title}</h2>
                <ul className="detail-list">
                    {data.map((item, index) => (
                        <li key={index}>
                            <span>{item.tipo_agregacion}:</span>
                            <span>{'$'+item.total}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <>
        <Navbar/> 
       
        <div className="container">
            <h1>📈 Reporte de Ventas</h1>

            <div className="period-selector">
                {/* Agregamos un div para agrupar label y select y controlarlos mejor con flexbox */}
                <div className="period-selector-group">
                    <label htmlFor="periodSelect">Ver reporte para:</label>
                    <select
                        id="periodSelect"
                        value={selectedPeriod}
                        onChange={cambioSelect}
                    >
                        <option value="Hoy">Hoy</option>
                        <option value="weekly">Semanal</option>
                        <option value="monthly">Mensual</option>
                    </select>
                </div>
            </div>

            {/* Renderiza el contenido del reporte si hay datos, de lo contrario muestra un mensaje */}
            {datos.length != 0 ? (
                <div className="report-content">
                    <div className="metrics-grid">
                        {datos.map((metric, index) => (
                            <div className="metric-card" key={index}>
                                <h3>{metric.indicadoresGlobales[0].titulo}</h3>
                                <p>{'$'+metric.indicadoresGlobales[0].total}</p>
                                <small>{""}</small>
                            </div>
                        ))}
                    </div>

                    {/* Usamos el nuevo campo displayTitle para evitar "de de Hoy" */}
                    {renderListSection("Detalle de " + currentReport.displayTitle, datos[0].detallePorConcepto )}
                    {renderListSection("Métodos de Pago", datos[0].metodosDePago)}

                    {/* <div className="chart-placeholder">
                        {currentReport.chartText}
                    </div> */}
                </div>
            ) : (
                <p style={{ textAlign: 'center', color: '#dc3545', fontSize: '1.2em' }}>
                    No hay datos disponibles para este período.
                </p>
            )}
        </div>
         </>
    );
};

export default ResumenVentas;