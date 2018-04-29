import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/variables.css';
import './css/index.css';
import App from './js/App';
import registerServiceWorker from './js/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
