import { createRoot } from 'react-dom/client';
import Noticias from '../noticias/Noticias.jsx';
import '../../css/noticias.css';

const root = createRoot(document.getElementById('noticias-root'));
root.render(<Noticias />);
