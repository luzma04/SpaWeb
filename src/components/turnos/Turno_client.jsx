import { Header } from "../core/Header.jsx";
import { DateCalendarMultipleSelect } from "../core/Calendar.jsx";
import { HorarioSelect } from "./HorarioSelect.jsx";

import Select from 'react-select'

import React from "react";

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

const horariosOcupados = [
    '08:00',
    '10:00',
    '20:00',
    '22:00'
];

horariosOptions = horariosOptions.map((option) => {
    if (horariosOcupados.includes(option.value)) {
        return { ...option, isDisabled: true };
    }
    return option;
});




export function App() {
    const [services, setServices] = React.useState([]);
    // const [servicesSelected, setServicesSelected] = React.useState([]);


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


    const totalCost = services.reduce((acc, service) => acc + service.precio, 0);

    const deleteService = (serviceKey) => {
        let newServices = [...services];
        const serviceIndex = newServices.findIndex((s) => s.nombre === serviceKey);
        newServices.splice(serviceIndex, 1);
        setServices(newServices);
    }


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
                    <form method="post" id="formRequestServicios">
                        <h1 className="seccionTittle">Turnos</h1>
                        <ul>

                            {services.map(sv =>
                                <ServicioSelected key={sv.nombre} nombre={sv.nombre} precio={sv.precio} deleteServiceEvent={() => deleteService(sv.nombre)} />
                            )}
                            {/* Puedes añadir aquí componentes como ServicioSelected */}
                            <li className="totalServiciosContainer">
                                <h2>Total</h2>
                                <h3>${totalCost}</h3>
                            </li>
                        </ul>
                        <div className="leyendaCalendarioWrapper">
                            <h3>Seleccioná el dia y horario</h3>
                        </div>
                        <div className="horarioWrapper">
                            <HorarioSelect
                                options={horariosOptions}
                            />
                        </div>
                        <div className="calendarioWrapper">
                            <DateCalendarMultipleSelect />
                        </div>
                        <div className="wrapperSubmitForm">
                            <input id="buttonSubmitForm" type="submit" value="Realizar reserva" />
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
