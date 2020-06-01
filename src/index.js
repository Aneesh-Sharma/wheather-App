import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import './index.css';
import reducer from './store/reducer';
import {BrowserRouter} from 'react-router-dom';

function saveToLocalStorage(state) {
  try {
      let serializedState = JSON.stringify(state);
      localStorage.setItem("state", serializedState);
  }
  catch (err) {
    console.log(err);
  }
}

function loadFromLocalStorage() {
  try {
      let serializedState = localStorage.getItem("state");
      if (serializedState === null) {
          return undefined;
      }
      return JSON.parse(serializedState);
  }
  catch (err) {
    console.log(err);
      return undefined;
  }
}

const persistedState = loadFromLocalStorage();
const store = createStore(reducer, persistedState);
store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
