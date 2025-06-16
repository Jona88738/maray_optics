import { useEffect, useState } from 'react';

const AutocompleteInput = ({tabla,valor,setValor}) => {
  const [sugerencias, setSugerencias] = useState([]);
  // const [valor, setValor] = useState('');
  const [todasLasOpciones, setTodasLasOpciones] = useState([]);

 // const todasLasOpciones = [{id: 1,nombre: 'Bogotá'}, {id: 2,nombre: 'Medellín'}, {id: 3,nombre: 'Barranquilla'}, {id: 4,nombre: 'Cali'}];

  useEffect(() =>{
      fetch("/api/producto",{
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
      })
      .then((res) => res.json())
      .then((res) =>{
        if(res.result){
             const datos = res.data.map((element) =>{
              element.precio_venta = Math.round(parseFloat(element.precio_venta ) * 100);
              return element;
            })
            setTodasLasOpciones(datos)
            console.log(datos)
        }else{
          console.log("existe un error")
        }
      })
  },[])

  const manejarCambio = (e) => {
    const texto = e.target.value;
    //console.log(texto, "Mi texto")
    setValor(texto);

    if (texto.length > 0) {
      const filtradas = todasLasOpciones.filter(op =>
        op.nombre.toLowerCase().includes(texto.toLowerCase()) ||
        op.codigo.toLowerCase().includes(texto.toLowerCase())

      );
      //console.log(filtradas)
      setSugerencias(filtradas);
    } else {
      setSugerencias([]);
    }
  };

  const seleccionarOpcion = (opcion) => {
    opcion.subtotal = opcion.precio_venta // parseFloat( opcion.precio_venta,2);
    opcion.cantidad_compra = 1;
    //opcion.cantidad_venta = 1;
    //opcion.push()
    tabla(opcion)
    setValor(opcion.nombre);
    setSugerencias([]);
  };

  return (
    <div style={{ position: 'relative'}}>
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
              {op.codigo +' - ' +op.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
