import { createRoot } from 'react-dom/client';
import './styles/main.css';
import 'nes.css/css/nes.min.css';
import '../node_modules/nes.css/css/nes.css';

import App from './App.tsx';

createRoot(document.getElementById('pixi-container')!).render(<App />);
