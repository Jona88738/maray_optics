import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Usuario from './pages/Usuarios';
import Productos from './pages/Productos';
import Venta from './pages/Venta.jsx';
import Expediente from './pages/expediente.jsx';
import Entrar from './Contexto/Entrar/ProvedorContext.jsx';
import ResumenVentas from './pages/ResumenVentas.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      {
      <BrowserRouter>
       
        <Routes>
          <Route path='/' element={<Login />} />
          <Route element={<Entrar />}>
          
            <Route path='/Home' element={<Home />} />
            <Route path='/usuarios' element={<Usuario />} />
            <Route path='/venta' element={<Venta />}/>
            <Route path='/productos' element={<Productos />} />
            <Route path='/expediente' element={<Expediente />} />
            <Route path='/ResumenVentas' element={<ResumenVentas/>} />
          </Route>
        </Routes>
      
      
      </BrowserRouter>
      }
    </>
  )
}

export default App
