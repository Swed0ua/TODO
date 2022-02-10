import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './state/redux-store';
import { Provider } from 'react-redux';

const allTreeRender = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider  store={state}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

allTreeRender(store);
store.subscribe( ()=> {
  allTreeRender(store)
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


