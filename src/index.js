import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App'
import axios from "axios";
import {createBrowserHistory} from 'react-router-dom'
const history = createBrowserHistory()
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config.method, config.headers, config.url)
    let token = localStorage.getItem('loggedInUser')
    if (token) {
        console.log(token)
        config.headers['authorization'] = 'Bearer ' + token
    } else {
        console.log('token not available.')
    }
    return config;
}, function (error) {
    // Do something with request error
    console.log('Error Faced!', error)
    return Promise.reject(error);
});
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // return Promise.reject(error);
    if (error.response.status === 403){
        // history.push('/login')
        console.log('error ', 403)
    }
});

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);