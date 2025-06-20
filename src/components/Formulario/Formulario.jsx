import { useState, useEffect } from 'react';
import './CSS/styles.css';
import { Navbar } from '../Navbar/Navbar';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const urlApi = import.meta.env.VITE_URL;

export const Formulario = () => {
    const [time, setTime] = useState('');
    const [nombreProducto, setNombreProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const user = JSON.parse(localStorage.getItem('sesion_control')).nombre_usuario;

    useEffect(() => {
        if (!localStorage.getItem('clientes')) {
            const defaultClientes = [
                'Descontrol Digital',
                'I Love my pet',
                'Clean Extreme',
                'Uno',
                'Pani Play',
                'Banco Atlantida',
                'Sudagrip',
            ];
            localStorage.setItem('clientes', JSON.stringify(defaultClientes));
        }
    }, []);

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const handleNombreProductoChange = (event) => {
        const value = event.target.value;
        setNombreProducto(value);
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        const filteredSuggestions = clientes.filter((cliente) =>
            cliente.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    };

    const handleFechaChange = (event) => {
        setFecha(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Tab' && suggestions.length > 0) {
            event.preventDefault();
            setNombreProducto(suggestions[0]);
            setSuggestions([]);
        }
    };

    const limpiarFormulario = () => {
        setTime('');
        setNombreProducto('');
        setDescripcion('');
        setFecha('');
        setSuggestions([]);
    };

    const registrar = async (event) => {
        event.preventDefault();
        setLoading(true);
        const data = {
            nombre_cliente: nombreProducto,
            tipo: descripcion,
            hora_transmitida: time,
            fecha: fecha,
            usuario: user,
        };

        try {
           await axios.post(urlApi + '/cintillos', data);
            
            const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
            if (!clientes.includes(nombreProducto)) {
                clientes.push(nombreProducto);
                localStorage.setItem('clientes', JSON.stringify(clientes));
            }

            Notify.success('Registro exitoso');
            limpiarFormulario();
        } catch (error) {
            console.error('Error en el registro:', error);
            Notify.failure('Error en el registro');
        } finally {
            setLoading(false);
        }
    };

    const isFormEmpty = !nombreProducto || !descripcion || !time || !fecha;

    return (
        <>
            <Navbar></Navbar>
            <section id="section-contenedor" className="mt-3 w-100 h-100 d-flex justify-content-center">
                <div className="contendor-formulario">
                    <form>
                        <h4 className="fw-bold text-center mb-5">Registrar</h4>
                        
                        {/* Campo de Nombre Cliente con autocompletar */}
                        <div className="mb-3 position-relative">
                            <label className="fw-bold mb-1">Nombre Cliente</label>
                            <div className="dropdown">
                                <input
                                    className="form-control dropdown-toggle"
                                    type="text"
                                    value={nombreProducto}
                                    onChange={handleNombreProductoChange}
                                    onKeyDown={handleKeyDown}
                                    onBlur={() => setTimeout(() => setSuggestions([]), 200)}
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    required
                                />
                                <div className={`dropdown-menu ${nombreProducto && suggestions.length > 0 ? 'show' : ''}`} 
                                    style={{ width: '100%', maxHeight: '200px', overflowY: 'auto' }}>
                                    {suggestions.map((suggestion, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className="dropdown-item"
                                            onClick={() => {
                                                setNombreProducto(suggestion);
                                                setSuggestions([]);
                                            }}
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Campo de Descripción */}
                        <div className="mb-3">
                            <label className="fw-bold mb-1">Descripción</label>
                            <select
                                className="form form-control"
                                name="opciones"
                                id="opciones"
                                value={descripcion}
                                onChange={handleDescripcionChange}
                                required
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="CINTILLO">CINTILLO</option>
                                <option value="PANTALLA INTERACTIVA">Pantalla Interactiva</option>
                                <option value="SQUEEZBACK">SQUEEZBACK</option>
                                <option value="MENCION">MENCION</option>
                                <option value="CORTINA">CORTINA</option>
                                <option value="SORTEO">SORTEO</option>
                                <option value="PATROCINIO">PATROCINIO</option>
                                <option value="CAPSULA">CAPSULA</option>
                                <option value="HOLOGRAMA">HOLOGRAMA</option>
                            </select>
                        </div>

                        {/* Campo de Hora */}
                        <div className="mb-3">
                            <label className="fw-bold mb-1" htmlFor="hora">
                                Hora:
                            </label>
                            <input
                                type="time"
                                className="form-control"
                                id="hora"
                                name="hora"
                                value={time}
                                onChange={handleTimeChange}
                            />
                        </div>

                        {/* Campo de Fecha */}
                        <div className="mb-3">
                            <label className="fw-bold mb-1">Fecha:</label>
                            <input
                                type="date"
                                className="form-control"
                                value={fecha}
                                onChange={handleFechaChange}
                            />
                        </div>

                        {/* Botón de Registro */}
                        <div className="mt-4 d-flex justify-content-center">
                            <button
                                className="btn btn-success"
                                disabled={isFormEmpty || loading}
                                onClick={registrar}
                                type="button"
                            >
                                {loading ? (
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                ) : (
                                    'Registrar'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};