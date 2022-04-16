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


export default function Login() {
  const history=useHistory();
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  function gotoPhone()
  {
    history.push("/phone");
  }

  const {user,GoogleLogin,Login}=useContext(AuthContext);

  const logGoogle=async ()=>{

    try{
      await GoogleLogin();
      history.push("/form");
    }
    catch(error)
    {
      console.log(error);
    }
  }

  const emailLogin=async()=>{
    try{
      const resp=await Login(email,password);
      history.push("/");
    }
    catch(error)
    {
      console.log(error);
    }
  }

  useEffect(()=>{
    if(user)
    {
      history.push("/");
    }
  })

  return (
    <Card sx={{ maxWidth: 445, height:"585px", border:5, borderColor:"#fafafa", borderRadius:7, boxShadow: 20, bgcolor:"#edf7fa" }} className="signup-card">
        <CardContent>
        <Typography variant="h4" gutterBottom component="div" align="center" sx={{mt:"13.5%", mb:"12%"}}>LOG IN</Typography>
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="medium" sx={{mb:"8%"}} value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <TextField type="password" id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="medium" sx={{mb:"8%"}} value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Typography variant="subtitle2" sx={{ml:"70%", mt:"-6%", mb:"5%"}}>
          <Link to="/forgot">Forgot password</Link>
        </Typography>
        <FormGroup>
            <Button variant="contained" sx={{borderRadius:10, maxWidth:200, ml:"25%",mb:"6%"}} onClick={emailLogin}>Sign In</Button>
            <Button variant="contained" fullWidth={true} sx={{mb:"4%"}} onClick={logGoogle}>Google Sign In</Button>
            <Button variant="contained" fullWidth={true} sx={{mb:"4%"}} onClick={gotoPhone}>LogIn via Phone</Button>
        </FormGroup>
        <Typography variant="subtitle2" sx={{ml:"15%"}}>
              Don't have an account yet?<Link to="/signup">Create Account</Link>
        </Typography>
        </CardContent>
    </Card>
  );
}