import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Route} from 'react-router-dom'



function PrivateRoute({Component,...rest}) {
    const isAuth = useSelector(state=>state.login.isAuth)
    return (
        isAuth ? 
        <Route {...rest} render={(props)=><Component {...props}/>} />
        :
        <Redirect to='/login' />
    );
}

export default PrivateRoute;