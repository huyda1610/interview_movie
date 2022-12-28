import React from 'react';
import ReactDOM from 'react-dom/client';
import './Style/index.css';
import App from './App';
import store from './Redux/configStore';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);

