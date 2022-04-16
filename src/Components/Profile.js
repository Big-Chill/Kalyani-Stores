import React,{useState,useEffect,useContext} from 'react';
import {AuthContext} from '../Context/AuthContext';
import {database} from '../Firebase';
import {Link,useHistory} from 'react-router-dom';
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

export default function Profile() {
    const{user,Logout}=useContext(AuthContext);
    const history=useHistory();

    const[fname,setfname]=useState("");
    const[lname,setlname]=useState("");
    const[email,setEmail]=useState("");
    const[dob,setDob]=useState("");
    const[age,setAge]=useState("");
    const[aadhar,setAadhar]=useState("");
    const[pan,setPan]=useState("");
    const[address,setAddress]=useState("");
    const[city,setCity]=useState("");
    const[state,setState]=useState("");
    const[pincode,setPincode]=useState("");

    function handleClick()
    {
        Logout();
        history.push("/");
    }

    function handleHome()
    {
      history.push("/");
    }

    useEffect(()=>{
        async function fetchData()
        {
            const uid=user.uid;
            const resp=await database.users.doc(uid).get();
            console.log(resp.data());
            setlname(resp.data().lname);
            setfname(resp.data().fname);
            setEmail(resp.data().email);
            setDob(resp.data().dob);
            setAge(resp.data().age);
            setAadhar(resp.data().aadhar);
            setPan(resp.data().pan);
            setAddress(resp.data().address);
            setCity(resp.data().city);
            setState(resp.data().state);
            setPincode(resp.data().pincode);
        }
        fetchData();
    })

    
  return (
    <div>
        <div>
        <Button variant="outlined" onClick={handleClick} sx={{ml:"93%"}}>Log Out</Button>
        <Button variant="outlined" onClick={handleHome} sx={{ml:"93%"}}>Main Page</Button>
        </div>
      
      <Card sx={{ maxWidth: 645, height:"750px", border:5, borderColor:"#fafafa", borderRadius:7, boxShadow: 20, bgcolor:"#edf7fa", mb:"12%" }} className="form-card">
        <div className="name-field">
         <TextField id="outlined-basic" label="First Name" variant="outlined" value={fname} InputProps={{readOnly: true,}}/>
         <TextField id="outlined-basic" label="Last Name" variant="outlined" sx={{ml:"8%"}} value={lname} InputProps={{readOnly: true,}}/>
        </div>
        <div className="email-field">
          <TextField label="Email ID" sx={{width:490}} value={email} InputProps={{readOnly: true,}}/>
        </div>
        <div className="age-field">
          <TextField label="DOB" value={dob} InputProps={{readOnly: true,}}></TextField>
          <TextField label="Age" sx={{ml:"8%"}} value={age} InputProps={{readOnly: true,}}></TextField>
        </div>
        <div className="proof-field">
          <TextField label="Aadhar Card No" value={aadhar} InputProps={{readOnly: true,}}></TextField>
          <TextField label="Pan Card No" sx={{ml:"8%"}} value={pan} InputProps={{readOnly: true,}}></TextField>
        </div>
        <div className="address-field">
          <TextField required label="Address" sx={{width:490}} value={address} InputProps={{readOnly: true,}}></TextField>
        </div>
        <div className="city-field">
          <TextField label="City" required sx={{width:157}} value={city} InputProps={{readOnly: true,}}></TextField>
          <TextField label="State" required sx={{ml:"2%", width:157}} value={state} InputProps={{readOnly: true,}}></TextField>
          <TextField label="Pin Code" required sx={{ml:"2%", width:157}} value={pincode} InputProps={{readOnly: true,}}></TextField>
        </div>
      </Card>
      
    </div>
  )
}
