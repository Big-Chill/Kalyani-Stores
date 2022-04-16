import React,{useState,useEffect,useContext} from 'react';
import Header from './Header';
import Modal from '@mui/material/Modal';
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
import Box from '@mui/material/Box';
import {database,db,firestore} from '../Firebase';
import { doc, setDoc, getDoc } from "firebase/firestore"; 


export default function Orders() {
  const[ordereditems,setOrdereditems]=useState([]);

  const{user}=useContext(AuthContext);

  useEffect(()=>{
    (async function getDocs()
    {
      const uid=user.uid;
      const snapshot=await firestore.collection("orders").get();
      snapshot.docs.forEach(doci=>{
        const ids=doci.id;
        if(ids.startsWith(uid))
        {
          (async function setData()
          {
            const docRef = doc(db, "orders", ids);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const data = docSnap.data();
              Object.keys(data).forEach(key => {
                setOrdereditems(ordereditems=>[...ordereditems,data[key]]);
              });
            }
          })();
        }
      })
    })();
  },[]);

  

  return (
    <div>
      <div>
        <Header/>
      </div>

        
      <div>
        <table className="table">
      <thead>
        <tr>
          <th scope="col" className="col-2">Item image</th>
          <th scope="col" className="col-3">Name</th>
          <th scope="col" className="col-3">Qty</th>
          <th scope="col" className="col-2">Total Price</th>
          <th scope="col">Date of Order</th>
        </tr>
      </thead>

      <tbody>
        {
          ordereditems.map((item,index)=>(
            <tr>
            <th scope="row"><img src={item["img"]} style={{height:"90px"}}></img></th>
            <td>{item["name"]}</td>
            <td>{item["qty"]}</td>
            <td>{item["base_price"]}</td>
            <td>{item["ordered_at"]}</td>
          </tr>
          ))
        }
      
      </tbody>
      
      </table>
        </div>
    </div>
  )
}
