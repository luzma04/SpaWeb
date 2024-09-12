import 'css/header_footer.css';
import logo from 'icons/logo.svg';

export function Header() {
    return (
        <header>
            <a href="index.html">
                <div className="logo-title">
                    <img src={logo} alt="Logo" className="logo" />
                    <h1>Sentirse Bien</h1>
                </div>
            </a>
            <nav>
                <ul>
                    {/* <li><a href="index.html">Home</a></li> */}
                    <li><a href="#">Noticias</a></li>
                    <li><a href="empleo.html">Empleo</a></li>
                    <li><a href="turnos.html">Turnos</a></li>
                    <li><a href="login.html">Iniciar sesión</a></li>
                </ul>
            </nav>

        </header>
    )
}