import { createRoot } from 'react-dom/client'
import {Header} from './components/Header.jsx'
import {Footer} from './components/Footer.jsx'



createRoot(document.getElementById('header-root')).render(<Header />);
createRoot(document.getElementById('footer-root')).render(<Footer />);
