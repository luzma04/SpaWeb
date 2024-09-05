import { createRoot } from 'react-dom/client';
import { Header } from './components/core/Header.jsx';
import { Footer } from './components/core/Footer.jsx';
import { SliderCard } from './components/core/SliderCard.jsx';


createRoot(document.getElementById('header-root')).render(<Header />);
createRoot(document.getElementById('footer-root')).render(<Footer />);
createRoot(document.getElementById('sliderCard-root')).render(<SliderCard />);