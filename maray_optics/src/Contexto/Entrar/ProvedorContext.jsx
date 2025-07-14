import { useEffect, useState } from "react";
import { EntrarContext } from "./EntrarContext.js";
import { useNavigate, Outlet } from 'react-router-dom';
import Navbar from "../../components/navbar.jsx";

export default function  Entrar({children}){

    const [entrar,setEntrar] =useState(null);
    const [usuario, setUsuario] = useState(0);

    const navigate = useNavigate();

    useEffect(() =>{

        fetch("/api/usuario/sesion")
        .then(res => res.json())
        .then(res =>{
          
          console.log("Valor",res.Valor)
          setEntrar(res.Valor);
          setUsuario(res.usuario);
          if (!res.Valor) {
          navigate("/");
        }
        

        } )
    },[navigate])
    // Mientras se carga la sesión, no renderices nada
  if (entrar === null) return null;
    return(<>
     <EntrarContext.Provider value={{ usuario }}>
        <Navbar/>
      <Outlet />
    </EntrarContext.Provider>
        
        
    
    </>)
}