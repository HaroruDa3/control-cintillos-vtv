import './CSS/styles.css'
import VTV from '../Navbar/vtv-rojo.webp'
export const Navbar = () => {
  return (
    <>
    <nav className='navbar'>
        <div className='w-50 d-flex align-items-center'>
          <img className='img-logo mx-4' src={VTV} alt="" />
          <h2 className='text-white '>
            Control de Cintillos
          </h2>
        </div>
        <div className='btn-logout'>
          <button type='button' className='btn btn-danger ml-2'>Cerrar Sesion</button>
        </div>
    </nav>
    </>
  )
}