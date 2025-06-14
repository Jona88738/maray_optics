import { useEffect, useState } from "react";
import { EntrarContext } from "./EntrarContext.js";
import { useNavigate, Outlet } from 'react-router-dom';

export default function  Entrar({children}){

    const [entrar,setEntrar] =useState(false);

    const navigate = useNavigate();

    useEffect(() =>{

        fetch("/api/usuario/sesion")
        .then(res => res.json())
        .then(res =>{
          
          console.log("Valor",res.Valor)
          setEntrar(res.Valor);

          {res.Valor === false ? (navigate("/")):
        
        
        
            (
    
                <EntrarContext.Provider >
    
                    {<Outlet/>}
    
    
                </EntrarContext.Provider>
            )
            }

        } )
    },[])
    return(<>
        {console.log("Entro segundaVez", entrar)}
        {entrar === false ? (navigate("/")):
        
        
        
        (

            <EntrarContext.Provider >

                {<Outlet/>}


            </EntrarContext.Provider>
        )
        }
        
    
    </>)
}