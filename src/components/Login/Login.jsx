import './CSS/styles.css'
import vtv from './logo-vtv-transparente.png'
export const Login = () => {
  return (
   <>
       <section className="main-login">
        <div className="section-login">
            <div id='div-img' className='d-flex justify-content-center mt-4'>   
                <img className='img-logo' src={vtv} alt="" />
            </div>
            <h4 className='fw-bold text-center mt-4'>Iniciar Sesión</h4>
            <form id='form-login' className='p-5 pt-2 '>
            <div>
                <label className='fw-bold mb-1'>Usuario</label>
                <input className='form form-control' type="text" />
            </div>
            <div className='mt-2'>
                <label className='fw-bold mb-1'>Contraseña</label>
                <input className='form form-control' type="password" />
            </div>
            <div className='mt-4 d-flex justify-content-center'>
                <button className='btn btn-success'>Acceder</button>
            </div>

            </form>
        </div>
       </section>
   </>
  )
}
