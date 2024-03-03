import{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CSS/styles.css';
import vtv from './logo-vtv-transparente.png';

export const Login = () => {
  const [nickname, setNickname] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('https://control-cintillos-vtv.onrender.com/api/vtv/usuarios/login', {
        nickname,
        contrasenia,
      });

      const { auth, tipo, usuario } = response.data;

      if (auth) {
        const sesionControl = { nombre_usuario: usuario, tipo };
        localStorage.setItem('sesion_control', JSON.stringify(sesionControl));
        if (tipo === 'master') {
          navigate('/Formulario');
        } else if (tipo === 'programacion') {
          navigate('/Registros');
        }
        window.location.reload();
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión, por favor intente nuevamente');
    }
  };


  return (
    <>
      <section className="main-login">
        <div className="section-login">
            <div id='div-img' className='d-flex justify-content-center'>   
                <img className='img-logo' src={vtv} alt="" />
            </div>
            <h4 className='fw-bold text-center mt-4'>Iniciar Sesión</h4>
            <form id='form-login' className='p-5 pt-2' onSubmit={handleLogin}>
                <div>
                    <label className='fw-bold mb-1'>Usuario</label>
                    <input className='form form-control' type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </div>
                <div className='mt-2'>
                    <label className='fw-bold mb-1'>Contraseña</label>
                    <input className='form form-control' type="password" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
                </div>
                <div className='mt-4 d-flex justify-content-center'>
                    <button className='btn btn-success' type="submit">Acceder</button>
                </div>
            </form>
        </div>
      </section>
    </>
  );
};
