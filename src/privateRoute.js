import React, { Component } from 'react'
import {Redirect,Route,Switch} from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => {

    const isLoggedIn = localStorage.getItem('token')

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/' }} />
                )
            }
        />
    )
}

export default PrivateRoute;