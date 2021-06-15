import Wrapper from "./Wrapper";
import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import BookList from "./BookList";
import SignUp from "./SignUp";
import Login from "./Login";


export default function App() {

    return (
        <Router>
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

        </Router>
    )
}