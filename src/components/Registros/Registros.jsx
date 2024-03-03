import  { useState,useEffect } from 'react';
import { Navbar } from "../Navbar/Navbar";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { isThisWeek, isSameMonth, parseISO } from 'date-fns';

export const Registros = () => {
    const datosIniciales = [
        { registradoPor: 'Juan Pérez', clienteProducto: 'Cliente A / Producto X', descripcion: 'Entrega de producto', fecha: '2024-02-01', hora: '10:00' },
        { registradoPor: 'Ana Gómez', clienteProducto: 'Cliente B / Producto Y', descripcion: 'Inicio de servicio', fecha: '2024-03-01', hora: '11:30' },
        // Agrega más registros aquí...
    ];

    const [filtro, setFiltro] = useState('ultimaSemana');
    const [mesSeleccionado, setMesSeleccionado] = useState('');
    const [datosFiltrados, setDatosFiltrados] = useState([]);

       

    const aplicarFiltro = () => {
        if (filtro === 'ultimaSemana') {
            setDatosFiltrados(datosIniciales.filter(dato => isThisWeek(parseISO(dato.fecha))));
        } else if (filtro === 'esteMes' && mesSeleccionado) {
            setDatosFiltrados(datosIniciales.filter(dato => isSameMonth(parseISO(dato.fecha), parseISO(mesSeleccionado))));
        } else {
            setDatosFiltrados(datosIniciales);
        }
    };

    const onhandleSelect = (dato) =>{
        setFiltro(dato)
        aplicarFiltro()
    }

    // Función para generar el PDF
    const generarPDF = () => {
        const doc = new jsPDF();
        doc.text('CONTROL DE CINTILLOS Y MENCIONES VTV', 14, 15);
        doc.text(`Filtrado: ${filtro === 'esteMes' ? `Mes seleccionado - ${mesSeleccionado}` : filtro}`, 14, 20);
        doc.autoTable({
            startY: 25,
            head: [['Registrado por', 'Cliente/Producto', 'Descripción', 'Fecha', 'Hora']],
            body: datosFiltrados.map(dato => [dato.registradoPor, dato.clienteProducto, dato.descripcion, dato.fecha, dato.hora]),
        });
        doc.save('informe.pdf');
    };

    useEffect(()=>{

        onhandleSelect('ultimaSemana')
    },[])

    return (
        <>
            <Navbar />
            <section className="mt-5 w-100 h-100 d-flex justify-content-center">
                <div className="tabla-registros">
                    <div className="mb-3">
                        <select className="form-select" onChange={(e) =>onhandleSelect(e.target.value)}>
                            <option value="ultimaSemana">Última semana</option>
                            <option value="esteMes">Seleccionar mes</option>
                            <option value="todos">Todos</option>
                        </select>
                        {filtro === 'esteMes' && (
                            <input
                                type="month"
                                className="form-control mt-2"
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
                                        <td>{dato.registradoPor}</td>
                                        <td>{dato.clienteProducto}</td>
                                        <td>{dato.descripcion}</td>
                                        <td>{dato.fecha}</td>
                                        <td>{dato.hora}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-md-none mt-3">
                        <ul className="list-group">
                            {datosFiltrados.map((dato, index) => (
                                <li key={index} className="list-group-item">
                                    <strong>Registrado por:</strong> {dato.registradoPor}<br />
                                    <strong>Cliente/Producto:</strong> {dato.clienteProducto}<br />
                                    <strong>Descripción:</strong> {dato.descripcion}<br />
                                    <strong>Fecha:</strong> {dato.fecha}<br />
                                    <strong>Hora:</strong> {dato.hora}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
};
