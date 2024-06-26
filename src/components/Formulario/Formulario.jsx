import { useState } from 'react';
import './CSS/styles.css'
import { Navbar } from '../Navbar/Navbar';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const urlApi = import.meta.env.VITE_URL;

export const Formulario = () => {
    const [time, setTime] = useState('');
    const [nombreProducto, setNombreProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const user = (JSON.parse(localStorage.getItem('sesion_control'))).nombre_usuario;

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const handleNombreProductoChange = (event) => {
        setNombreProducto(event.target.value);
    };

    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    };

    const handleFechaChange = (event) => {
        setFecha(event.target.value);
    };

    const limpiarFormulario = () => {
        setTime('');
        setNombreProducto('');
        setDescripcion('');
        setFecha('');
    };

    const registrar = async (event) => {
        event.preventDefault();
        const data = {
            nombre_cliente: nombreProducto,
            tipo: descripcion,
            hora_transmitida: time,
            fecha: fecha,
            usuario: user,
        };

        try {
            const response = await axios.post(urlApi+'/cintillos', data);
            console.log(response.data);
            Notify.success('Registro exitoso');
            limpiarFormulario();
        } catch (error) {
            console.error('Error en el registro:', error);
            Notify.failure('Error en el registro');
        }
    };

    const isFormEmpty = !nombreProducto || !descripcion || !time || !fecha;
    return (
        <>
        <Navbar></Navbar>
            <section id='section-contenedor' className="mt-3 w-100 h-100 d-flex justify-content-center">
                <div className="contendor-formulario">
                    <form>
                        <h4 className='fw-bold text-center mb-5'>Registrar</h4>
                        <div className='mb-3'>
                            <label className='fw-bold mb-1'>Nombre Cliente</label>
                            <input 
                                className='form form-control' 
                                type="text" 
                                value={nombreProducto}
                                onChange={handleNombreProductoChange} 
                                required 
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='fw-bold mb-1'>Descripción</label>
                            <select 
                                className='form form-control' 
                                name="opciones" 
                                id="opciones"
                                value={descripcion}
                                onChange={handleDescripcionChange} 
                                required
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="CINTILLO">CINTILLO</option>
                                <option value="SQUEEZBACK">SQUEEZBACK</option>
                                <option value="MENCION">MENCION</option>
                                <option value="CORTINA">CORTINA</option>
                                <option value="SORTEO">SORTEO</option>
                                <option value="PATROCINIO">PATROCINIO</option>
                                <option value="CAPSULA">CAPSULA</option>
                                <option value="HOLOGRAMA">HOLOGRAMA</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className='fw-bold mb-1' htmlFor="hora">Hora:</label>
                            <input
                                type="time"
                                className="form-control"
                                id="hora"
                                name="hora"
                                value={time}
                                onChange={handleTimeChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className='fw-bold mb-1'>Fecha:</label>
                            <input
                                type="date"
                                className="form-control"
                                value={fecha}
                                onChange={handleFechaChange}
                            />
                        </div>
                        <div className='mt-4 d-flex justify-content-center'>
                            <button className='btn btn-success' disabled={isFormEmpty} onClick={registrar} type='btn'>Registrar</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
