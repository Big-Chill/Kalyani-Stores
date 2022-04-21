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
import {database} from '../Firebase';
import { toaster } from 'evergreen-ui';


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
      // history.push("/form");
      const uid=user.uid;
      const resp=await database.users.doc(uid).get();
      if(resp.exists)
      {
        history.form("/");
      }
      else{
        history.push("/form");
      }
    }
    catch(error)
    {
      console.log(error);
    }
  }

  const emailLogin=async()=>{
    try{
      const resp=await Login(email,password);
      toaster.success('Sign in successfull',{id: 'forbidden-action',duration:"1"});
      history.push("/");
    }
    catch(error)
    {
      console.log("Error :- ");
      if(error.code==="auth/user-not-found")
      {
        toaster.warning('You dont have an account with us. Please sign up',{id: 'forbidden-action',duration:"1"});
      }
      else if(error.code==="auth/wrong-password")
      {
        toaster.warning('Please enter correct password',{id: 'forbidden-action',duration:"1"});
      }
      else
      {
        toaster.warning('Please enter your email and password to continue',{id: 'forbidden-action'});
      }
    }
  }

  useEffect(()=>{
    if(user)
    {
      history.push("/");
    }
  })

  return (
    <div className="login-div">

        <Card sx={{ maxWidth: 445, height:"585px", border:5, borderColor:"#fafafa", borderRadius:7, boxShadow: 20, bgcolor:"#f2f2f2" }} className="signup-card">
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

    </div>
  );
}