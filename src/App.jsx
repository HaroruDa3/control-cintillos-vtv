import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Formulario } from './components/Formulario/Formulario';
import { Login } from './components/Login/Login';
import { Registros } from './components/Registros/Registros';

function App() {
  const [user, setUser] = useState({
    nombre_usuario: '',
    tipo: '',
  });

  useEffect(() => {
    checkAuth();
    async function checkAuth() {
      const sesionControl = localStorage.getItem('sesion_control');
      if (sesionControl) {
        const { nombre_usuario, tipo } = JSON.parse(sesionControl);
        setUser({ nombre_usuario, tipo });
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige según el tipo de usuario almacenado en el estado */}
        {user.tipo ? (
          user.tipo === 'master' ? (
            <Route path="/Formulario" element={<Formulario />} />
          ) : user.tipo === 'programacion' ? (
            <Route path="/Registros" element={<Registros />} />
          ) : (
            <Route path="*" element={<Navigate replace to="/login" />} />
          )
        ) : (
          <Route path="*" element={<Login />} />
        )}
        {/* Otras rutas aquí, por ejemplo, para Navbar o rutas específicas */}
        {/* Asegúrate de que estas rutas no entren en conflicto con las redirecciones de tipo de usuario */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
