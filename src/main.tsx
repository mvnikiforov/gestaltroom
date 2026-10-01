import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Не найден корневой элемент #root в index.html');
}

ReactDOM.createRoot(container).render(<App />);