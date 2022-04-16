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


export default function Forgot() {
    const{resetEmail}=useContext(AuthContext);
    const history=useHistory();
    const[email,setEmail]=useState("");

    async function handleReset(e)
    {
        e.preventDefault();
        try{
            const resp=await resetEmail(email);
            history.push("/login")
        }
        catch(error)
        {
            console.log(error);
        }
    }

  return (
    <Card sx={{ maxWidth: 445, height:"220px", border:5, borderColor:"#fafafa", borderRadius:7, boxShadow: 20, bgcolor:"#edf7fa" }} className="signup-card">
        <CardContent>
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="medium" sx={{mb:"8%"}} value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <FormGroup>
            <Button variant="contained" sx={{borderRadius:10, maxWidth:200, ml:"25%",mb:"6%"}} onClick={(e)=>handleReset(e)}>Reset Password</Button>
        </FormGroup>
        <Typography variant="subtitle2" sx={{ml:"37%"}}>
                <Link to="/login">Log In via Email</Link>
        </Typography>
        </CardContent>
    </Card>
  );
}