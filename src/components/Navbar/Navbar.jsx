import { useNavigate } from 'react-router-dom';
import './CSS/styles.css';
import VTV from './logo-vtv-transparente.png';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('sesion_control');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <nav className='navbar'>
          <div id='tituloNav' className='w-50 d-flex align-items-center'>
            <img className='img-logo mx-4' src={VTV} alt="" />
            <h2 className='text-white '>
              Control de Cintillos
            </h2>
          </div>
          <div className='btn-logout'>
            <button type='button' className='btn btn-danger ml-2' onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width="35" height="35" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
            <path d="M9 12h12l-3 -3" />
            <path d="M18 15l3 -3" />
          </svg>
            </button>
          </div>
      </nav>
    </>
  );
};
