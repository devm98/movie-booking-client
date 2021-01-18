import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppProvider from './AppProvider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
