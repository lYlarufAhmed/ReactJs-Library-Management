import Wrapper from "./Wrapper";
import React from "react";
import {Route, Switch, useHistory} from 'react-router-dom'
import BookList from "./BookList";
import SignUp from "./SignUp";
import Login from "./Login";
import axios from "axios";

function setUpInterceptors(history) {
// Add a request interceptor
    axios.defaults.baseURL = 'http://localhost:3001'
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        console.log(config.headers, config.url)
        let token = localStorage.getItem('accessToken')
        config.headers['authorization'] = 'Bearer ' + token

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
    }, async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // return Promise.reject(error);
        const originalRequest = error.config
        console.log('response error', error.response)
        console.log('Original request ', originalRequest)
        let {status} = error.response
        if (status === 401) {
            if (localStorage.getItem('access_token') && !originalRequest._retry) {
                originalRequest._retry = true
                await saveNewToken()
                // history.push('/login')
                console.log('error ', 403)
                return axios(originalRequest)
            }
            else{
                history.replace('/login')
            }
        }
        if (status === 403){
            history.replace('/login')
        }

        return Promise.reject(error)
    });
}

function saveNewToken() {
    let res = axios.post('http://localhost:3001/auth/token', {refresh_token: localStorage.getItem('refresh_token')})
    console.log('from save new token', res)
    localStorage.setItem('access_token',res.data.acccessToken)
}

export default function App() {
    let history = useHistory()
    setUpInterceptors(history)

    return (
        <>
            <Wrapper>
                <Switch>
                    <Route exact path={'/'}>
                        Home
                    </Route>
                    <Route path={'/signup'}>
                        <SignUp/>
                    </Route>

                    <Route path={'/login'}>
                        <Login/>
                    </Route>
                    <Route path={'/books'}>
                        <BookList/>
                    </Route>
                    <Route path={'/categories'}>
                        List of categories
                    </Route>
                    <Route path={'/issues'}>
                        List of issued books
                    </Route>
                </Switch>
            </Wrapper>

        </>
    )
}