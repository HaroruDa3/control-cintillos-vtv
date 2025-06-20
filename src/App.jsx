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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    async function checkAuth() {
      const sesionControl = localStorage.getItem('sesion_control');
      if (sesionControl) {
        try {
          const { nombre_usuario, tipo } = JSON.parse(sesionControl);
          setUser({ nombre_usuario, tipo });
        } catch (error) {
          console.error('Error al parsear la sesión:', error);
          localStorage.removeItem('sesion_control');
        }
      }
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige según el tipo de usuario almacenado en el estado */}
        {user.tipo === 'master' && (
          <>
            <Route path="/Formulario" element={<Formulario />} />
            <Route path="*" element={<Navigate replace to="/Formulario" />} />
          </>
        )}
        {user.tipo === 'programacion' && (
          <>
            <Route path="/Registros" element={<Registros />} />
            <Route path="*" element={<Navigate replace to="/Registros" />} />
          </>
        )}
        {!user.tipo && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;