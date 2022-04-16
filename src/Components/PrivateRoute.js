import React,{useContext} from 'react';
import {AuthContext} from '../Context/AuthContext';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import {Redirect} from "react-router";

function PrivateRoute({component:Component,...rest}) {
    const{user}=useContext(AuthContext);

  return (
    <Route {...rest} render={props=>{
        return user!=null?<Component {...props}/>:<Redirect to="/login"/>
    }}/>
  )
}

export default PrivateRoute;