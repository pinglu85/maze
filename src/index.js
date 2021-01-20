import { createElement, render, setInitialGridSize } from './utils';
import store from './store';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
const node = render(<App />);
rootElement.appendChild(node);

window.addEventListener('DOMContentLoaded', () => {
  setInitialGridSize(store.dispatch);
});
