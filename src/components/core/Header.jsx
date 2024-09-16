import 'css/header_footer.css';
import logo from 'icons/logo.svg';
import iconUser from 'icons/user_icon.png';
import useUsuario from '../../hooks/useUsuario';
import appFirebase from '../../credentials';
import { getAuth , signOut} from 'firebase/auth';
import { useState } from 'react';
import Swal from 'sweetalert2';

export function Header() {
    const auth = getAuth(appFirebase);
    const usuario = useUsuario();

    // Estado para manejar la visibilidad del menú desplegable
    const [showMenu, setShowMenu] = useState(false);

    // Función para alternar la visibilidad del menú
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleSignOut = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se cerrará tu sesión.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth);
            }
        });
    };
    

    return (
        <header>
            <a className="wrapperLinkLogo"href="index.html">
                <div className="logo-title">
                    <img src={logo} alt="Logo" className="logo" />
                    <h1>Sentirse Bien</h1>
                </div>
            </a>
            
            <nav>
                <ul>
                    <li><a href="noticias.html">Noticias</a></li>
                    {usuario && usuario.rangoUser === "Administrador" ? (
                        <li><a href="empleo-admin.html">Solicitudes de empleo</a></li>
                    ) : (
                        <li><a href="empleo.html">Empleo</a></li>
                    )}

                    {usuario && usuario.rangoUser === "Cliente" ? (
                        <li><a href="turnos.html">Turnos</a></li>
                    ) : (
                        usuario && usuario.rangoUser === "Administrador" ? (
                            <li><a href="historialReservas-admin.html">Reservas</a></li>
                        ) : (
                            <li><a href="turnos.html">Turnos</a></li>
                        )
                    )}

                    {usuario && usuario.rangoUser === "Administrador" && (
                        <>
                            <li><a href="usuarios-admin.html">Usuarios</a></li>
                            <li><a href="servicio-admin.html">Servicios</a></li>
                        </>
                    )}

                    {usuario ? (
                        <div className="user-profile">
                            <div className="user-icon" onClick={toggleMenu}>
                                <img src={iconUser} alt="User Icon" className="user-icon-img" />
                            </div>
                            {showMenu && (
                                <ul className="user-menu">
                                    {usuario.rangoUser === "Cliente" && (
                                        <li><a href="#">Mis reservas</a></li>
                                    )}
                                    <li>
                                        <button id="buttonLogout" onClick={() => handleSignOut()}>Cerrar sesión</button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <li id="itemLogin"><a href="login.html">Iniciar sesión</a></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}