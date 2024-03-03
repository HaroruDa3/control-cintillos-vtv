import  { useState,useEffect } from 'react';
import { Navbar } from "../Navbar/Navbar";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { isThisWeek, isSameMonth, parseISO, startOfWeek, endOfWeek, startOfMonth, endOfMonth, format } from 'date-fns';
import axios from 'axios';
const urlApi = import.meta.env.VITE_URL;

export const Registros = () => {
    
    const [registros,setRegistros] =useState ([]);

    
    useEffect(()=>{
        const traerDatos = async () =>{
            const response = await axios.get(urlApi+'/cintillos/cintillos') 
            setRegistros(response.data)
         }
         traerDatos()
    },[registros])

    const [filtro, setFiltro] = useState('ultimaSemana');
    const [mesSeleccionado, setMesSeleccionado] = useState('');
    const [datosFiltrados, setDatosFiltrados] = useState([]);

    useEffect(() => {
        const aplicarFiltro = () => {
            let datos = [];
            if (filtro === 'ultimaSemana') {
                datos = registros.filter(dato => isThisWeek(parseISO(dato.fecha), { weekStartsOn: 1 }));
            } else if (filtro === 'esteMes' && mesSeleccionado) {
                datos = registros.filter(dato => isSameMonth(parseISO(dato.fecha), parseISO(mesSeleccionado)));
            } else if (filtro === 'todos') {
                datos = [...registros];
            }
            setDatosFiltrados(datos.reverse());
        };
        aplicarFiltro();
    }, [filtro, mesSeleccionado, registros]);

    const onhandleSelect = (dato) => {
        if (dato === 'esteMes' && filtro !== 'esteMes') {
            setMesSeleccionado(new Date().toISOString().slice(0, 7));
        }
        setFiltro(dato);
    };

    const generarPDF = () => {
        let textoFiltrado = '';
        if (filtro === 'ultimaSemana') {
            const inicioSemana = format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd');
            const finSemana = format(endOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd');
            textoFiltrado = `Última semana (del ${inicioSemana} al ${finSemana})`;
        } else if (filtro === 'esteMes' && mesSeleccionado) {
            const inicioMes = format(startOfMonth(parseISO(mesSeleccionado)), 'yyyy-MM-dd');
            const finMes = format(endOfMonth(parseISO(mesSeleccionado)), 'yyyy-MM-dd');
            textoFiltrado = `Este mes (del ${inicioMes} al ${finMes})`;
        } else if (filtro === 'todos') {
            textoFiltrado = 'Todos los registros';
        }

        const doc = new jsPDF();
        doc.text('CONTROL DE CINTILLOS Y MENCIONES VTV', 14, 15);
        doc.text(`Filtrado: ${textoFiltrado}`, 14, 20);
        doc.autoTable({
            startY: 25,
            head: [['Registrado por', 'Cliente/Producto', 'Descripción', 'Fecha', 'Hora']],
            body: datosFiltrados.map(dato => [dato.usuario, dato.nombre_cliente, dato.tipo, dato.fecha, dato.hora_transmitida]),
        });
        doc.save('informe.pdf');
    };
    return (
        <>
            <Navbar />
            <section className="mt-5 w-100 h-100 d-flex justify-content-center">
                <div className="tabla-registros">
                    <div className="mb-3">
                        <select className="form-select" onChange={(e) => onhandleSelect(e.target.value)}>
                            <option value="ultimaSemana">Última semana</option>
                            <option value="esteMes">Seleccionar mes</option>
                            <option value="todos">Todos</option>
                        </select>
                        {filtro === 'esteMes' && (
                            <input
                                type="month"
                                className="form-control mt-2"
                                value={mesSeleccionado}
                                onChange={(e) => setMesSeleccionado(e.target.value)}
                            />
                        )}
                        <button className="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#modalFechas">
                            Imprimir Registro
                        </button>
                    </div>

                    {/* Modal para confirmar generación de PDF */}
                    <div className="modal fade" id="modalFechas" tabIndex="-1" aria-labelledby="modalFechasLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="modalFechasLabel">Confirmar impresión</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    ¿Está seguro de que desea generar el informe PDF con los registros filtrados?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" className="btn btn-primary" onClick={generarPDF} data-bs-dismiss="modal">Generar PDF</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Renderizado condicional de la tabla o lista basado en los datos filtrados */}
                    <div className="d-none d-md-block mt-3">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Registrado por</th>
                                    <th>Cliente/Producto</th>
                                    <th>Descripción</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datosFiltrados.map((dato, index) => (
                                    <tr key={index}>
                                        <td>{dato.usuario}</td>
                                        <td>{dato.nombre_cliente}</td>
                                        <td>{dato.tipo}</td>
                                        <td>{dato.fecha}</td>
                                        <td>{dato.hora_transmitida}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-md-none mt-3">
                        <ul className="list-group">
                            {datosFiltrados.map((dato, index) => (
                                <li key={index} className="list-group-item">
                                    <strong>Registrado por:</strong> {dato.usuario}<br />
                                    <strong>Cliente/Producto:</strong> {dato.nombre_cliente}<br />
                                    <strong>Descripción:</strong> {dato.tipo}<br />
                                    <strong>Fecha:</strong> {dato.fecha}<br />
                                    <strong>Hora:</strong> {dato.hora_transmitida}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
};
