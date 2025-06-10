import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Usuario from './pages/Usuarios';
import Productos from './pages/Productos';
import Venta from './pages/Venta.jsx';
import Expediente from './pages/expediente.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/usuarios' element={<Usuario />} />
          <Route path='/venta' element={<Venta />}/>
          <Route path='/productos' element={<Productos />} />
          <Route path='/expediente' element={<Expediente />} />
        </Routes>
      
      
      </BrowserRouter>
      
      
      /* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
