import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { nanoid } from 'nanoid';

const Form = ({ModalOpen, producto}) => {

    const [datos, setDatos] = useState({codigo: "", nombre: "", costo_compra: "", existencias: "", marca: "", descripcion: "", categoria: "default", precio_venta: "", sat_producto: 'default', sat_unidad: 'default'});
    const [datosCategoria, setDatosCategoria] = useState([]);
    const claveSatProducto = ['31241501 - Lentes', '31241502 - Prismas', '42142902 - Lentes para anteojos',
        '42142913 - Lentes de contacto', '42142914 - Solución limpiadora o humidificadora de lentes de contacto',
        '42142910 - Estuches para lentes de contacto', '42183039 - Sujetadores de lentes oftálmicos',
        '42183067 - Lentes de examen de diagnóstico de visión para uso oftálmico', '46181811 - Lentes protectores',
        '46181806 - Limpiadores de lentes (Limpiadores de gafas)', '46181802 - Anteojos de seguridad (Lentes de seguridad)',
        '46181801 - Sujetadores o estuches de anteojos (Fundas para lentes, Soportes o estuches para lentes)',
        '42142906 - Estuches para anteojos', '01010101 - No existe en el catalogo'
    ]
    useEffect(() =>{
        fetch("/api/categoria",{
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((res) =>{
            if(res.result){
                console.log("Entro", res)
                setDatosCategoria(res.data)
            }
        })
    },[])

    const generarCodigo = (e) => {
        const {name} = e.target
        e.preventDefault();
        let nuevoCodigo;
        do {
        nuevoCodigo = nanoid(8);
        } while (producto.some(p => p.codigo === nuevoCodigo));

 
        setDatos({
            ...datos,
            [name]: nuevoCodigo,
        })
        // setCodigo(nuevoCodigo);
    };



    const btnGuardar = (e) =>{
        e.preventDefault();
        if(!datos.codigo || !datos.nombre || !datos.costo_compra || !datos.existencias  || !datos.descripcion || !datos.precio_venta  || datos.categoria === 'default') return Swal.fire({title:"Alerta", text: "Todo los campos con * son obligatorios", icon: "warning"})
        const filtrado = Object.fromEntries(
            Object.entries(datos).filter(([_, value]) => value !== 'default')
            );

            console.log(filtrado);
            
            fetch('/api/producto',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(filtrado)
    
        })
        .then((res) => res.json())
        .then((res) =>{
            if(res.result){
                Swal.fire({title:"Se ingreso con exito", text: "Categoria agregada", icon:"success"})
                ModalOpen();
                //console.log("Producto registrado");
            }else{
                console.log("algo fallo", res.result)
            }
        })
            
       // console.log("Se guardo",datos);
    }
    const guardarDatos = (event) =>{
        const { name, value } = event.target;
  let nuevoValor = value;

  // Si el campo requiere limitar a 2 decimales
  const camposConDecimales = ['costo_compra', 'precio_venta']; // Ajusta según tus campos

  if (camposConDecimales.includes(name)) {
    // Validar formato numérico válido
    if (/^\d*\.?\d*$/.test(value)) {
      const partes = value.split('.');
      if (partes.length === 2 && partes[1].length > 2) {
        nuevoValor = `${partes[0]}.${partes[1].slice(0, 2)}`;
      }
    } else {
      // Evitar guardar valores inválidos
      return;
    }
  }

  setDatos({
    ...datos,
    [name]: nuevoValor,
  });
    //     console.log(datos);
       
    //     setDatos({
    //         ...datos,
    //         [event.target.name]: event.target.value,
    // });
    
    }
    const btnLimpiar = (e) =>{
        e.preventDefault();
        console.log("Se  limpio");
        setDatos({codigo: "", nombre: "", costo_compra: "", existencias: "", marca: "", descripcion: "", categoria: "default", precio_venta: "", sat_producto: 'default', sat_unidad: 'default'})
    }
    return(<>
        
        <main className="scroll">
            <form className="formLogin" >
                <h2>Nuevo Producto</h2>
            <div className="inputLogin">
                <label htmlFor="">* Codigo</label>
                <input type="text"
                name="codigo"
                value={datos.codigo}
                placeholder="Codigo"
                onChange={guardarDatos} 
                />
                <button className="btnBaja" name="codigo" onClick={generarCodigo}>Generar codigo aleatorio</button>
            </div>
            <div className="inputLogin">
                <label htmlFor="">* Nombre</label>
                <input type="text"
                name="nombre"
                value={datos.nombre}
                placeholder="Nombre"
                onChange={guardarDatos} 
                />
                
            </div>
            <div className="inputLogin">
                <label htmlFor="">* Costo de compra</label>
                <input type="number" 
                name="costo_compra"
                // step={1.00}
                max={500}
                placeholder="ingrese el costo de compra"
                value={datos.costo_compra}

                onChange={guardarDatos} 
                />
            </div>
          
            <div className="inputLogin">
                <label htmlFor="">* Existencias</label>
                <input type="number" 
                name="existencias"
                min={0}
                placeholder="ingrese la cantidad del producto"
                value={datos.existencias}
                onChange={guardarDatos} 
                />
            </div>
            <div className="inputLogin">
                <label htmlFor="">Marca</label>
                <input type="text" 
                name="marca"
                placeholder="ingrese la marca del producto"
                value={datos.marca}
                onChange={guardarDatos} 
                />
            </div>
            <div className="inputLogin">
                <label htmlFor="">* Descripcion</label>
                <input type="text" 
                name="descripcion"
                placeholder="Descripcion"
                value={datos.descripcion}
                onChange={guardarDatos} 
                />
            </div>
            <div className="inputLogin">
                <label htmlFor="">* Categoria</label>
                
                <select name="categoria" class="form-select"  id="" value={datos.categoria} onChange={guardarDatos} >
                    <option value="default"> Selecciona una opcion</option>
                    {datosCategoria.map(element => {
                    return <option value={element.id}>{element.nombre}</option>

                    })}
                    
                </select>
            </div>
            <div className="inputLogin">
                <label htmlFor="">* Precio de venta</label>
                <input type="number" 
                name="precio_venta"
                min={0}
                placeholder="ingrese el precio de venta"
                value={datos.precio_venta}
                onChange={guardarDatos} 
                />
            </div>
            <div className="inputLogin">
                <label htmlFor="">Clave sat del producto</label>
                <select name="sat_producto" id="" class="form-select" value={datos.sat_producto} onChange={guardarDatos}>
                    <option value="default">Selecciona una opcion</option>
                    {claveSatProducto.map((element) =>{
                        return (<option value={element}>{element} </option>)
                    })}
                </select>
            </div>
            <div className="inputLogin">
                <label htmlFor="">Clave sat de unidad</label>
                <select name="sat_unidad" id="" class="form-select" value={datos.sat_unidad} onChange={guardarDatos}>
                    <option value="default">Selecciona una opcion</option>
                    <option value="PZ - Pieza">PZ - Pieza</option>
                    <option value="H87 - Actividad">H87 - Actividad</option>
                </select>
            </div>

            <div className="ContainerBtns">
                <button className="btnGuardar" onClick={btnGuardar}>Guardar</button>
                <button className="btnLimpiar" onClick={btnLimpiar}>Limpiar</button>
                
            </div>
            
            </form>
        </main>
        
    </>)
}
export default Form;