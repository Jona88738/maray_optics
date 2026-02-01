
import React, { useState,  useRef   } from 'react';
import '../../styles/Consulta.css';
import SelectorUsuarios from '../components/SelectorUsuarios.jsx';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

// Main App component for New Consultation
const MostrarConsulta = ({page, id}) => {
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

  useEffect(() => {
    fetch('/api/expedientes/getconsultaExpediente')
        .then(res => res.json())
        .then((res) => {
            if(res.result){
                setEyeExamData(res.dataOjos);
                setPatientNotes(res.dataNotas[0].notas_paciente);
                setInternalDoctorNotes(res.dataNotas[0].notas_medico)
            }else{

            }
        })
  },[])

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
      informacionVenta,
      patientNameOrCode,
      isAnonymousPatient,
      consultationDate,
      eyeExamData,
      patientNotes,
      internalDoctorNotes,
    });
    // Add logic to save data

    if (informacionVenta.id === 0) return Swal.fire({ title: "Alerta!", text: "Debes seleccionar ya sea venta  publica o algun usuario ya registrado", icon: "warning" })

    fetch("api/expedientes/consulta", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      patientNameOrCode,
      isAnonymousPatient,
      consultationDate,
      eyeExamData,
      patientNotes,
      internalDoctorNotes,
      informacionVenta,
    })
    })
      .then((res) => res.json())
      .then((res) =>{
        if(res.result){
            Swal.fire({title: "Exito", text: "Se registro  correctamente", icon: "success"})
            page(0)
        }
      })
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
            <button onClick={() => page({action: 0, data: ''}) } className="btnRegresar">
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
                              disabled
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
                  disabled
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
                  disabled
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

export default MostrarConsulta;