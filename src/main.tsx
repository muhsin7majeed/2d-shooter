import { createRoot } from 'react-dom/client';
import './main.css';

import App from './App.tsx';

createRoot(document.getElementById('pixi-container')!).render(<App />);
