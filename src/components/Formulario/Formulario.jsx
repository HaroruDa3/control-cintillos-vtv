import './CSS/styles.css'
import { useState } from 'react';

export const Formulario = () => {
    const [time, setTime] = useState('');
    const [nombreProducto, setNombreProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');

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

    return (
        <>
            <section className="mt-3 w-100 h-100 d-flex justify-content-center">
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
                            <button className='btn btn-success' type='btn'>Registrar</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
