import 'css/header_footer.css';
import logo from 'icons/logoVersion2.svg';
import iconoInsta from 'icons/iconoInstagram.svg'
import iconoFacebook from 'icons/iconoFacebook.svg'
import iconoTiktok from 'icons/iconoTiktok.svg'
import iconoMail from 'icons/iconoMail.svg'

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-section">
                <img src={logo} alt="Logo" className="footer-logo" />
                <h2 className='footer-section-titulo'>Sentirse Bien</h2>
                <p>Todos los derechos reservados 2024.</p>
                <p>Desarrolado por: Rodríguez Lautaro, Rossi Valentino, Roldán Luz</p>
            </div>
            <div className="footer-section">
                <h3>Seguinos</h3>
                <div className="social-icons">
                <a href="https://www.facebook.com/"><img src={iconoFacebook}/></a>
                <a href="https://www.tiktok.com/es/"><img src={iconoTiktok}/></a>
                <a href="https://www.instagram.com/"><img src={iconoInsta}/></a>
                </div>
                <h3>Contactanos</h3>
                <div className='footer-section-mail'>
                    <img src={iconoMail}/>
                    <p>sentirsebienspa@gmail.com</p>
                </div>
                <p className='footer-section-mail'>Tel: +5493624222333</p>
            </div>
            <div className="footer-section">
                <ul className="footer-links">
                <li><a className='footer-links-elemento' href="#">Home</a></li>
                <li><a className='footer-links-elemento' href="#">Noticias</a></li>
                <li><a className='footer-links-elemento' href="#">Empleo</a></li>
                <li><a className='footer-links-elemento' href="#">Turnos</a></li>
                <li><a className='footer-links-elemento' href="#">Login</a></li>
                </ul>
            </div>
        </footer>
    )
}