import '../header_footer.css';
import logo from '../assets/logo.svg'; // Importa la imagen del logo

export function Header() {
    return (
        <header>
            <div className="logo-title">
                <img src={logo} alt="Logo" className="logo" />
                <h1>Sentirse Bien</h1>
            </div>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="#">Noticias</a></li>
                <li><a href="empleo.html">Empleo</a></li>
                <li><a href="#">Turnos</a></li>
                <li><a href="login.html">Login</a></li>
            </ul>
        </nav>
        
    </header>
    )
}