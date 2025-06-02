import { useEffect, useState } from 'react';
import '../../styles/SelectorUsuarios.css';

const SelectorUsuarios = ({ onSelect }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  // Traer todos los usuarios una sola vez
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const res = await fetch(`/api/usuarios`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        const data = await res.json();
        if (data.result && data.data) {
          setUsuarios(data.data);
        }
      } catch (err) {
        console.error('Error al obtener usuarios:', err);
      }
    };

    obtenerUsuarios();
  }, []);

  // Filtrar usuarios localmente
  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleSelect = (usuario) => {
    setFiltro(usuario.nombre);
    setMostrarOpciones(false);
    onSelect(usuario);
  };

  return (
    <div className="selector-usuario">
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        onFocus={() => setMostrarOpciones(true)}
        onBlur={() => setTimeout(() => setMostrarOpciones(false), 200)}
      />
      {mostrarOpciones && (
        <ul className="opciones-lista">
          <li onClick={() => handleSelect({ id: 0, nombre: 'Venta al público' })}>
            Venta al público
          </li>
          {usuariosFiltrados.map((u) => (
            <li key={u.id} onClick={() => handleSelect(u)}>
              {u.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectorUsuarios;
