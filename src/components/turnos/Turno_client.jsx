import {Header} from "../core/Header.jsx";
import {DateCalendarMultipleSelect} from "../core/Calendar.jsx";
// Import the icons files
import deleteIcon from "icons/delete_icon.png";

// Import the css files
import "css/turnos.css";


export function App(){
    return(
        <>
        <Header/>
        <div className="wrapper">
            <div className="listServiciosContainer">
                <h1 className="seccionTittle">Servicios</h1>
                <ul>
                    <Servicio/>
                    <Servicio/>
                    <Servicio/>
                </ul>
            </div>
            
            <div className="turnosSideManagementContainer">
                <form method="" id="formRequestServicios">
                    <h1 className="seccionTittle">Turnos</h1>
                    <ul>
                        <ServicioSelected/>
                        <ServicioSelected/>
                        <ServicioSelected/>
                        <li className="totalServiciosContainer">
                            <h2>Total</h2>
                            <h3>$50000</h3>
                        </li>
                    </ul>
                    <div className="leyendaCalendarioWrapper">
                        <h3>Seleccioná tus días disponibles</h3>
                    </div>
                    <div className="calendarioWrapper">
                        <DateCalendarMultipleSelect />
                    </div>
                    <div className="wrapperSubmitForm">
                        <input id="buttonSubmitForm" type="submit" value="Consultar servicios" />
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

function Servicio() {
    return (
        <li className="serviceItem">
            <div className="backgroundContainer">
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, qui vel? Cupiditate vel animi, sed eius consequuntur quo distinctio.</p> */}
            </div>
            <div className="coreInfoContainer">
                <h2>Servicio</h2>
                <h3>$10000</h3>
            </div>
        </li>
    )
}

function ServicioSelected() {
    return (
        <li className="serviceItemSelected">
            <div className="infoItemSelected">
                <h2>Servicio</h2>
                <h3>$10000</h3>
            </div>
            <img src={deleteIcon} alt="" />
        </li>
    )
}