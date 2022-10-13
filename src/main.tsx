import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './index.scss';
import './index.scss';
import './locales/i18n';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
