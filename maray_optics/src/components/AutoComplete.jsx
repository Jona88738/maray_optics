import { useState } from 'react';

const AutocompleteInput = () => {
  const [sugerencias, setSugerencias] = useState([]);
  const [valor, setValor] = useState('');

  const todasLasOpciones = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla'];

  const manejarCambio = (e) => {
    const texto = e.target.value;
    setValor(texto);

    if (texto.length > 0) {
      const filtradas = todasLasOpciones.filter(op =>
        op.toLowerCase().includes(texto.toLowerCase())
      );
      setSugerencias(filtradas);
    } else {
      setSugerencias([]);
    }
  };

  const seleccionarOpcion = (opcion) => {
    setValor(opcion);
    setSugerencias([]);
  };

  return (
    <div style={{ position: 'relative', width: '500px' }}>
      <input
        type="text"
        value={valor}
         placeholder="Buscar por codigo o descripcion"
        onChange={manejarCambio}
        style={{ width: '100%' }}
      />
      {sugerencias.length > 0 && (
        <ul style={{
          position: 'absolute',
          background: '#fff',
          border: '1px solid #ccc',
          width: '100%',
          marginTop: 0,
          padding: '5px',
          listStyle: 'none',
          maxHeight: '150px',
          overflowY: 'auto',
          zIndex: 1
        }}>
          {sugerencias.map((op, i) => (
            <li key={i} onClick={() => seleccionarOpcion(op)} style={{ cursor: 'pointer', padding: '5px' }}>
              {op}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
