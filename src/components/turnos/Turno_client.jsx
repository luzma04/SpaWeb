import React, { useState } from "react";
// Componentes
import { Header } from "../core/Header.jsx";
import { DateCalendarMultipleSelect } from "./Calendar.jsx";
import { HorarioSelect } from "./HorarioSelect.jsx";

// Firebase imports
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../credentials.js';

// Imports de terceros
import Swal from 'sweetalert2'


// Import the icons files
import deleteIcon from "icons/delete_icon.png";

// Import the css files
import "css/turnos.css";

const servicios = [
    { nombre: "Masajes con piedras calientes", precio: 10000, url: "https://www.google.com" },
    { nombre: "Sauna Seco", precio: 20000, url: "https://www.google.com" },
    { nombre: "Depilación facial", precio: 30000, url: "https://www.google.com" },
    { nombre: "Anti-stress", precio: 15000, url: "https://www.google.com" },
    { nombre: "Circulatorios", precio: 25000, url: "https://www.google.com" },
    { nombre: "Limpieza profunda + Hidratación", precio: 35000, url: "https://www.google.com" }
];

let horariosOptions = [
    { value: '08:00', label: '08:00' },
    { value: '10:00', label: '10:00' },
    { value: '12:00', label: '12:00' },
    { value: '14:00', label: '14:00' },
    { value: '16:00', label: '16:00' },
    { value: '18:00', label: '18:00' },
    { value: '20:00', label: '20:00' },
    { value: '22:00', label: '22:00' },

]


const fetchReservasByFecha = async (fecha) => {
    const reservasRef = collection(db, "reservasServicios");
    const q = query(reservasRef, where("fecha", "==", fecha));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
};


export function App() {
    const [services, setServices] = useState([]);
    const [horariosDisponibles, setHorariosDisponibles] = useState(horariosOptions);
    const [clearHorario, setClearHorario] = useState(false); // Estado para limpiar el valor del horario

    // Función que se ejecuta cuando cambia la fecha en el calendario
    const handleDateChange = async (fecha) => {
        const reservas = await fetchReservasByFecha(fecha);
        const horariosReservados = reservas.map(reserva => reserva.horario);

        // Deshabilitar horarios ocupados
        const updatedHorariosOptions = horariosOptions.map((option) => ({
            ...option,
            isDisabled: horariosReservados.includes(option.value),
        }));

        setHorariosDisponibles(updatedHorariosOptions);

        // Limpia la selección de horario
        setClearHorario(true); // Marca que se debe limpiar el horario
        setTimeout(() => setClearHorario(false), 100); // Reinicia el estado para futuras limpiezas
    };

    // Agregar o quitar un servicio de la lista de servicios seleccionados
    const addService = (service) => {
        console.log(service);
        const serviceExists = services.some((s) => s.nombre === service.nombre);
        if (serviceExists) {
            const updatedServices = services.filter((s) => s.nombre !== service.nombre);
            setServices(updatedServices);
        } else {
            setServices([...services, service]);
        }
    }

    // Calcular el costo total de los servicios seleccionados
    const totalCost = services.reduce((acc, service) => acc + service.precio, 0);

    // Eliminar un servicio de la lista de servicios seleccionados
    const deleteService = (serviceKey) => {
        let newServices = [...services];
        const serviceIndex = newServices.findIndex((s) => s.nombre === serviceKey);
        newServices.splice(serviceIndex, 1);
        setServices(newServices);
    }


    // Función para mostrar el modal de cargando
    const showLoading = () => {
        Swal.fire({
            title: 'Reservando...',
            text: 'Estamos enviando tu reserva, por favor espera un momento',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading(); // Muestra el ícono de carga
            }
        });
    }



    // Función para enviar la reserva
    const enviar = async (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Obtener los valores de horario y calendario
        const horario = document.getElementById('horarioInputID').value;
        const calendario = document.getElementById('calendarioInputID').value;

        try {
            showLoading();
            const solicitudesRef = collection(db, "reservasServicios");

            const data = {
                horario: horario,
                fecha: calendario,
                services: services,
                costoTotal: totalCost,
            };

            await addDoc(solicitudesRef, data);

            // Cierra el modal de "loading"
            Swal.close();

            // Muestra un mensaje de éxito o realiza alguna acción tras el envío
            Swal.fire({
                title: 'Enviado!',
                text: 'Tu reserva ha sido enviada con éxito',
                icon: 'success',
                confirmButtonText: 'Cerrar',
                allowOutsideClick: false,
            })


        } catch (error) {
            console.error("Error al enviar la reserva: ", error);

            // Cierra el modal de "loading" en caso de error
            Swal.close();

            // Muestra un mensaje de error
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al enviar tu reserva. Intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Cerrar',
            });
        }
    };

    const horario = document.getElementById('horarioInputID');
    const calendario = document.getElementById('calendarioInputID');

    const isFormComplete = services.length > 0 && horario && calendario;

    return (
        <>
            <Header />
            <div className="wrapper">
                <div className="listServiciosContainer">
                    <h1 className="seccionTittle">Servicios</h1>
                    <ul>
                        {servicios.map(sv =>
                            <Servicio key={sv.nombre} nombre={sv.nombre} precio={sv.precio} url={sv.url} addServiceEvent={addService} />
                        )}
                    </ul>
                </div>

                <div className="turnosSideManagementContainer">
                    <form method="post" id="formRequestServicios" onSubmit={enviar}>
                        <h1 className="seccionTittle">Turnos</h1>
                        {services.length > 0 && (
                            <div className="leyendaServiciosSelccionadosWrapper">
                                <h3>Servicios seleccionados</h3>
                            </div>
                        )}
                        <ul>
                            {services.map(sv =>
                                <ServicioSelected key={sv.nombre} nombre={sv.nombre} precio={sv.precio} deleteServiceEvent={() => deleteService(sv.nombre)} />
                            )}

                            {services.length === 0 ? (
                                <h2 className="warningMessage">Aun no tiene servicios seleccionados</h2>
                            ) : (
                                <li className="totalServiciosContainer">
                                    <h2>Total</h2>
                                    <h3>${totalCost}</h3>
                                </li>
                            )}
                        </ul>
                        <div className="selectHorarioFechaWrapper">

                            <div className="leyendaCalendarioWrapper">
                                <h3>Seleccioná el dia y horario</h3>
                            </div>

                            <div className="calendarioWrapper">
                                <DateCalendarMultipleSelect onDateChange={handleDateChange} />
                            </div>
                            <div className="horarioWrapper">
                                <HorarioSelect options={horariosDisponibles} clearValue={clearHorario} />
                            </div>

                        </div>
                        <div className="wrapperSubmitForm">
                            <input id="buttonSubmitForm" type="submit" value="Realizar reserva" disabled={!isFormComplete} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

function Servicio({ nombre, precio, url, addServiceEvent }) {
    return (
        <li className="serviceItem" onClick={() => addServiceEvent({ nombre, precio, url })}>
            <div className="backgroundContainer">
                <p>{url}</p>
            </div>
            <div className="coreInfoContainer">
                <h2>{nombre}</h2>
                <h3>${precio}</h3>
            </div>
        </li>
    )
}

function ServicioSelected({ nombre, precio, deleteServiceEvent }) {
    return (
        <li className="serviceItemSelected">
            <div className="infoItemSelected">
                <h2>{nombre}</h2>
                <h3>${precio}</h3>
            </div>
            <img src={deleteIcon} alt="delete icon" onClick={deleteServiceEvent} />
        </li>
    )
}
