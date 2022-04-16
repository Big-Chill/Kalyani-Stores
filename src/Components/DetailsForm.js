import React,{useState,useEffect,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {AuthContext} from '../Context/AuthContext';
import {database} from '../Firebase';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker';


export default function DetailsForm() {

    const{Logout,user}=useContext(AuthContext);
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
    }

    async function onSubmit(e)
    {
      e.preventDefault();
      const uid=user.uid;
      const resp=await database.users.doc(uid).set({fname,lname,email,dob,age,aadhar,pan,address,city,state,pincode});
      history.push("/");
    }

    function handleProfile()
    {
      history.push("/profile");
    }

    


  return (
    <div>
      <div>
      <Button variant="outlined" onClick={handleClick} sx={{ml:"93%"}}>Log Out</Button>
      <Button variant="outlined" onClick={handleProfile}>Profile</Button>
      </div>

      <Card sx={{ maxWidth: 645, height:"750px", border:5, borderColor:"#fafafa", borderRadius:7, boxShadow: 20, bgcolor:"#edf7fa", mb:"12%" }} className="form-card">
        <div className="name-field">
         <TextField id="outlined-basic" label="First Name" variant="outlined" required value={fname} onChange={(e)=>setfname(e.target.value)}/>
         <TextField id="outlined-basic" label="Last Name" variant="outlined" sx={{ml:"8%"}} required value={lname} onChange={(e)=>setlname(e.target.value)}/>
        </div>
        <div className="email-field">
          <TextField label="Email ID" sx={{width:490}} required value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="age-field">
          <TextField label="DOB" required value={dob} onChange={(e)=>setDob(e.target.value)}></TextField>
          <TextField label="Age" sx={{ml:"8%"}} required value={age} onChange={(e)=>setAge(e.target.value)}></TextField>
        </div>
        <div className="proof-field">
          <TextField label="Aadhar Card No" required value={aadhar} onChange={(e)=>setAadhar(e.target.value)}></TextField>
          <TextField label="Pan Card No" sx={{ml:"8%"}} required value={pan} onChange={(e)=>setPan(e.target.value)}></TextField>
        </div>
        <div className="address-field">
          <TextField required label="Address" sx={{width:490}} value={address} onChange={(e)=>setAddress(e.target.value)}></TextField>
        </div>
        <div className="city-field">
          <TextField label="City" required sx={{width:157}} value={city} onChange={(e)=>setCity(e.target.value)}></TextField>
          <TextField label="State" required sx={{ml:"2%", width:157}} value={state} onChange={(e)=>setState(e.target.value)}></TextField>
          <TextField label="Pin Code" required sx={{ml:"2%", width:157}} value={pincode} onChange={(e)=>setPincode(e.target.value)}></TextField>
        </div>
        <Button variant="contained" sx={{borderRadius:10, maxWidth:200, ml:"37%",mb:"6%",my:"4%", backgroundColor:"#ff487e"}} onClick={(e)=>{onSubmit(e)}}>Upload Details</Button>
      </Card>
      
    </div>
  )
}
