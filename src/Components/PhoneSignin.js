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
    const{PhoneLogin}=useContext(AuthContext);
    const[number,setNumber]=useState("");
    const[otp,setOtp]=useState("");
    const[confirmobj,setConfirmobj]=useState("");
    const history=useHistory();

    const getOtp=async(e)=>{
        e.preventDefault();
        if(number=="" || number ==undefined || number.length!=13)
        return;

        try{
            const resp=await PhoneLogin(number);
            console.log(resp)
            setConfirmobj(resp);
        }
        catch(error)
        {
            console.log(error);
        }
        finally
        {
            setNumber("");
        }
    }

    const verifyOTP=async(e)=>{
        e.preventDefault();
        if(otp=="" || otp ==undefined || otp.length!=6)
        return;

        try{
            await confirmobj.confirm(otp);
            history.push("/form");
        }
        catch(error)
        {
            console.log(error);
        }
    }

  return (
      <div>
          {
              confirmobj==""?
              <div>

                    <div>
                        <Card sx={{ maxWidth: 445, height:"230px", border:5, borderColor:"#fafafa", borderRadius:7, boxShadow: 20, bgcolor:"#edf7fa" }} className="signup-card">
                                <CardContent>
                                <TextField id="outlined-basic" label="Phone Number" variant="outlined" fullWidth={true} margin="dense" size="medium" sx={{mb:"8%"}} value={number} onChange={(e)=>setNumber(e.target.value)}/>
                                
                                <FormGroup>
                                    <Button variant="contained" sx={{borderRadius:10, maxWidth:200, ml:"25%",mb:"4%",mt:"3%"}} onClick={(e)=>getOtp(e)}>Get OTP</Button>
                                </FormGroup>
                                <Typography variant="subtitle2" sx={{ml:"37%"}}>
                                    <Link to="/login">Log In via Email</Link>
                                </Typography>
                                </CardContent>
                        </Card>
                    </div>

                    <div>
                    <div id="recaptcha-container" className="captcha"></div>
                    </div>
              </div>
              :
              <div>

                    <div>

                    <div>
                        <Card sx={{ maxWidth: 445, height:"230px", border:5, borderColor:"#fafafa", borderRadius:7, boxShadow: 20, bgcolor:"#edf7fa" }} className="signup-card">
                                <CardContent>
                                <TextField id="outlined-basic" label="OTP" variant="outlined" fullWidth={true} margin="dense" size="medium" sx={{mb:"8%"}} value={otp} onChange={(e)=>setOtp(e.target.value)}/>
                                
                                <FormGroup>
                                    <Button variant="contained" sx={{borderRadius:10, maxWidth:200, ml:"25%",mb:"4%",mt:"3%"}} onClick={(e)=>verifyOTP(e)}>Verify OTP</Button>
                                </FormGroup>
                                <Typography variant="subtitle2" sx={{ml:"37%"}}>
                                    <Link to="/login">Log In via Email</Link>
                                </Typography>
                                </CardContent>
                        </Card>
                    </div>

                    <div>
                    <div id="recaptcha-container" className="captcha"></div>
                    </div>
                    </div>
              </div>
          }
    </div>
  );
}