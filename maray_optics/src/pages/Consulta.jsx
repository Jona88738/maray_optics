
import React, { useState,  useRef   } from 'react';
import '../../styles/Consulta.css';
import SelectorUsuarios from '../components/SelectorUsuarios.jsx';

// Main App component for New Consultation
const Consulta = ({page}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [patientNameOrCode, setPatientNameOrCode] = useState('');
  const [isAnonymousPatient, setIsAnonymousPatient] = useState(false);
  const [consultationDate, setConsultationDate] = useState(new Date().toISOString().slice(0, 16)); // YYYY-MM-DDTHH:MM
  const [eyeExamData, setEyeExamData] = useState({
    right: { sphere: '', cylinder: '', axis: '', addition: '', dip: '', lco: '', kto: '', height: '', avsco: '', avcco: '', prism: '' },
    left: { sphere: '', cylinder: '', axis: '', addition: '', dip: '', lco: '', kto: '', height: '', avsco: '', avcco: '', prism: '' },
  });
  const [patientNotes, setPatientNotes] = useState('');
  const [internalDoctorNotes, setInternalDoctorNotes] = useState('');

  const [informacionVenta, setInformacionVenta] = useState({ select: 0, id: 0, nombre: '' })
  const [filtro, setFiltro] = useState('');

  const inputRef = useRef();

  const manejarSeleccion = (usuario) => {
        console.log('Usuario seleccionado:', usuario);
        if (usuario.id === 0) {
            console.log("Venta al publico")
            setInformacionVenta({
                select: 0,
                id: -2, nombre: "Venta al publico"
            })
        } else if (usuario.id !== 0) {
            setInformacionVenta({
                select: 1,
                id: usuario.id, nombre: usuario.nombre + ' ' + usuario.apellido
            })
        }
    };
  // Simulated full screen mode using CSS
//   const toggleFullScreen = () => {
//     setIsFullScreen(prev => !prev);
//   };

  // Handle input changes for eye exam data
  const handleEyeExamChange = (eye, field, value) => {
    setEyeExamData(prev => ({
      ...prev,
      [eye]: {
        ...prev[eye],
        [field]: value,
      },
    }));
  };

  // Clear form fields
  const handleClearForm = () => {
    setPatientNameOrCode('');
    setIsAnonymousPatient(false);
    setConsultationDate(new Date().toISOString().slice(0, 16));
    setEyeExamData({
      right: { sphere: '', cylinder: '', axis: '', addition: '', dip: '', lco: '', kto: '', height: '', avsco: '', avcco: '', prism: '' },
      left: { sphere: '', cylinder: '', axis: '', addition: '', dip: '', lco: '', kto: '', height: '', avsco: '', avcco: '', prism: '' },
    });
    setPatientNotes('');
    setInternalDoctorNotes('');
    console.log('Formulario limpiado.');
  };

  // Finalize consultation action
  const handleFinalizeConsultation = () => {
    console.log('Consulta finalizada:', {
      patientNameOrCode,
      isAnonymousPatient,
      consultationDate,
      eyeExamData,
      patientNotes,
      internalDoctorNotes,
    });
    // Add logic to save data

    // fetch("api/expediente/consulta", {
    //   method: 'POST', 
    //   headers: {
        
    //   },
    //   body: JSON.stringify({
    //   patientNameOrCode,
    //   isAnonymousPatient,
    //   consultationDate,
    //   eyeExamData,
    //   patientNotes,
    //   internalDoctorNotes,
    // })
    // })
  };

  // Finalize and make sale action
  const handleFinalizeAndSell = () => {
    console.log('Consulta finalizada y venta realizada:', {
      patientNameOrCode,
      isAnonymousPatient,
      consultationDate,
      eyeExamData,
      patientNotes,
      internalDoctorNotes,
    });
    // Add logic to save data and proceed to sale
  };

  return (
    <>
      


      <div className={`app-container ${isFullScreen ? 'fullscreen' : ''}`}>
        {/* Main Content Area */}
        <div className="content-area">
          <header className={`header ${isFullScreen ? 'fullscreen' : ''}`}>
              <h1 className="header-title" style={{color: 'black'}}>Nueva Consulta</h1>
              
          </header>
          <section className="containerButtons">
            <button onClick={() => page(0) } className="btnRegresar">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                
                    Regresar</button>
          </section>

          <main className="main-content">
            {/* Patient and Date Section */}
            <section className="section section-grid">
              <div>
                <label htmlFor="" style={{ marginBottom: '15px' }}>*Elegir cliente o venta al público</label>
                <SelectorUsuarios ref={inputRef} onSelect={manejarSeleccion} filtro={filtro} setFiltro={setFiltro} />

                
              </div>
              <div>
                <label htmlFor="consultationDate" className="form-label">Fecha de consulta *</label>
                <input
                  type="datetime-local"
                  id="consultationDate"
                  className="text-input"
                  value={consultationDate}
                  onChange={(e) => setConsultationDate(e.target.value)}
                />
              </div>
            </section>

            {/* Eye Examination Section */}
            <section className="section">
              <h2 className="section-title">Datos del Examen Visual</h2>
              <div className="table-container">
                <table className="eye-exam-table">
                  <thead>
                    <tr>
                      <th></th>
                      {[
                        { label: 'Esfera', info: 'Información sobre Esfera' },
                        { label: 'Cilindro', info: 'Información sobre Cilindro' },
                        { label: 'Eje', info: 'Información sobre Eje' },
                        { label: 'Adición', info: 'Información sobre Adición' },
                        { label: 'DIP', info: 'Información sobre DIP' },
                        { label: 'LCO', info: 'Información sobre LCO' },
                        { label: 'KTO', info: 'Información sobre KTO' },
                        { label: 'Altura', info: 'Información sobre Altura' },
                        { label: 'AVS/CO', info: 'Información sobre AVS/CO' },
                        { label: 'AVC/CO', info: 'Información sobre AVC/CO' },
                        { label: 'Prisma', info: 'Información sobre Prisma' },
                      ].map((field) => (
                        <th key={field.label} className="text-center">
                          <div className="info-icon-container">
                            <span>{field.label}</span>
                            <span className="group relative cursor-help">
                              <InfoIcon className="info-icon" />
                              <span className="info-tooltip">
                                {field.info}
                              </span>
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {['right', 'left'].map((eye) => (
                      <tr key={eye}>
                        <td className="eye-label">{eye === 'right' ? 'Ojo Derecho' : 'Ojo Izquierdo'}</td>
                        {Object.keys(eyeExamData[eye]).map((field) => (
                          <td key={`${eye}-${field}`}>
                            <input
                              type="text"
                              className="eye-input"
                              value={eyeExamData[eye][field]}
                              onChange={(e) => handleEyeExamChange(eye, field, e.target.value)}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Notes Section */}
            <section className="notes-section">
              <div className="notes-block">
                <label htmlFor="patientNotes" className="notes-label">Notas/Diagnóstico para el paciente</label>
                <textarea
                  id="patientNotes"
                  rows="4"
                  className="textarea-input"
                  placeholder="Escribe aquí notas o diagnóstico que serán visibles para el paciente."
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label htmlFor="internalDoctorNotes" className="notes-label">Observaciones internas del médico</label>
                <p className="notes-description">(Observaciones propias del médico - No visibles por el paciente)</p>
                <textarea
                  id="internalDoctorNotes"
                  rows="4"
                  className="textarea-input"
                  placeholder="Escribe aquí observaciones internas solo para el médico."
                  value={internalDoctorNotes}
                  onChange={(e) => setInternalDoctorNotes(e.target.value)}
                ></textarea>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                onClick={handleClearForm}
                className="action-button button-clear"
              >
                <EraserIcon className="icon-size" />
                <span>Limpiar</span>
              </button>
              <button
                onClick={handleFinalizeConsultation}
                className="action-button button-finalize"
              >
                <CheckCircleIcon className="icon-size" />
                <span>Finalizar consulta</span>
              </button>
              <button
                onClick={handleFinalizeAndSell}
                className="action-button button-sell"
              >
                <ShoppingCartIcon className="icon-size" />
                <span>Finalizar y realizar venta</span>
              </button>
            </div>
          </main>

          {/* Optional: Footer */}
          <footer className="footer">
            <p>&copy; 2025 Maray_Optics. Todos los derechos reservados.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

// const HomeIcon = (props) => (
//   <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2 2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//   </svg>
// );

// const ChartLineIcon = (props) => (
//   <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8L11 2m9 9v9a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h9l-5 5h5z" />
//   </svg>
// );

// const EyeIcon = (props) => (
//   <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//   </svg>
// );

// const CubeIcon = (props) => (
//   <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//   </svg>
// );

const InfoIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const EraserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l-5 5m5-5h-2.5a2.5 2.5 0 100 5H14a2.5 2.5 0 100-5h0z" />
  </svg>
);

const CheckCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ShoppingCartIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export default Consulta;