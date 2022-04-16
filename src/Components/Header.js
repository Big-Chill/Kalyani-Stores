import React,{useState,useEffect,useContext} from 'react';
import { sizing } from '@mui/system';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link,useHistory} from 'react-router-dom';
import {AuthContext} from '../Context/AuthContext';

export default function Header() {
    const history=useHistory();
    const{user,Logout}=useContext(AuthContext);

    function handleLogin()
    {
        history.push("/login");
    }

    function handleLogout()
    {
        Logout();
        history.push("/");
    }

    function handleSignup()
    {
        history.push("/signup");
    }

    function handleProfile()
    {
        history.push("/profile");
    }

    function handleCart()
    {
        history.push("/cart");
    }

    function handleHome()
    {
        history.push("/");
    }

    function handleOrder()
    {
        history.push("/orders");
    }

  return (
      <div>
          {
              user===null?
              <div>
                  <Card sx={{ maxWidth: "100%",height:"100px" }}>
                        <div>
                            <Typography variant="h4">
                                <Button variant="text" sx={{ mt:"2%",color:"#626fe6", fontSize:"19px"}} onClick={handleCart}>Cart</Button>
                                <Button variant="text" sx={{ mt:"2%",color:"#626fe6", fontSize:"19px"}} onClick={handleHome}>Home</Button>
                            </Typography>
                        <Typography variant="h3"  component="div" align="center" sx={{mt:"-3%"}}>
                            Kalyani Stores
                        </Typography>
                        <Typography variant="h4">
                            <Button variant="text" sx={{borderRadius:10,mt:"-7%",ml:"90%", color:"#0092ca", fontSize:"17px"}} onClick={handleLogin}>Login</Button>
                            <Button variant="text" sx={{borderRadius:10, mt:"-7%", color:"#626fe6", fontSize:"17px"}} onClick={handleSignup}>Signup</Button>
                        </Typography>
                        </div>
                    </Card>
              </div>
              :
              <div>
                  <Card sx={{ maxWidth: "100%",height:"100px" }}>
                        <div>
                            <Typography variant="h4">
                                <Button variant="text" sx={{ mt:"2%",color:"#626fe6", fontSize:"19px"}} onClick={handleCart}>Cart</Button>
                                <Button variant="text" sx={{ mt:"2%",color:"#626fe6", fontSize:"19px"}} onClick={handleHome}>Home</Button>
                                <Button variant="text" sx={{ mt:"2%",color:"#626fe6", fontSize:"19px"}} onClick={handleOrder}>Orders</Button>
                            </Typography>
                        <Typography variant="h3"  component="div" align="center" sx={{mt:"-3%"}}>
                            Kalyani Stores
                        </Typography>
                        <Typography variant="h4">
                            <Button variant="text" sx={{borderRadius:10,mt:"-7%",ml:"88%", color:"#0092ca", fontSize:"17px"}} onClick={handleProfile}>profile</Button>
                            <Button variant="text" sx={{borderRadius:10, mt:"-7%", color:"#626fe6", fontSize:"17px"}} onClick={handleLogout}>Logout</Button>
                        </Typography>
                        </div>
                    </Card>
              </div>
          }
      </div>
  )
}
