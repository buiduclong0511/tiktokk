import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Provider } from 'react-redux'

import App from './components/App';
import reportWebVitals from './reportWebVitals';
import './assets/styles/global.scss'
import './assets/styles/react-phone-number-input/style.scss'
import store from '~/store'
import 'overlayscrollbars/css/OverlayScrollbars.css';

//global config baseURL
axios.defaults.baseURL = 'https://tiktok.f8team.dev';
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token')

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
