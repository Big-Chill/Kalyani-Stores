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



export default function Cart() {
  const[items,setItems]=useState([]);
  const[isEmpty,setisEmpty]=useState(true);
  const[totalCost,setTotalcost]=useState(0);
  const[isModal,setIsModal]=useState(false);
  const[orderid,setOrderid]=useState("");
  const [open, setOpen] = useState(false);
  const[open2,setOpen2]=useState(false);
  const[currdate,setCurrdate]=useState("");
  const[currtime,setCurrtime]=useState("");

  const{user}=useContext(AuthContext);

  async function savetoDatabase()
  {
    const uid=user.uid;
    
    const oid=makeid();
    const doc_name=`${uid}_${oid}`;
    const time=makedate();
    const final_time=`${time.date} ${time.time}`;
    // const ordered_items={...items,ordered_at:final_time};
    const ordered_items={...items};
    // ordered_items.ordered_at=final_time;
    Object.keys(ordered_items).forEach(key=>{
      ordered_items[key].ordered_at=final_time;
    })
    await setDoc(doc(db,"orders",doc_name),ordered_items);
  }

  

  function handleOpen()
  {
    if(user==null)
    {
      setOpen2(true);
    }
    else
    {
      setOpen(true);
      savetoDatabase();
    }
  }

  function handleClose()
  {
    if(user==null)
    {
      setOpen2(false);
    }
    else
    {
      setOpen(false);
      localStorage.clear();
      localStorage.setItem("cart",JSON.stringify([]));
      setItems([]);
    }
  }


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  function makeid() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (let i=0;i<12;i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    setOrderid(text);
    return text;
  }

  function makedate()
  {
      let date="";
      let time="";
      const today=new Date();
      date=today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      time=today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      setCurrdate(date);
      setCurrtime(time);
      return {date,time}
  }

  const handleRemove=(item)=>{
      let data=JSON.parse(localStorage.getItem("cart") || "[]");
      let tempdata=[...data];
      let new_data=tempdata.filter((d)=>(d["id"]!=item["id"]));
      setItems([...new_data]);
      localStorage.setItem("cart",JSON.stringify(new_data));
  }

  function getTotalCost(){
        let data=JSON.parse(localStorage.getItem("cart") || "[]");
        let tempdata=[...data];
        let total=0;
        for(let i=0;i<tempdata.length;i++)
        {
            let cobj=tempdata[i];
            let np=cobj["new_price"].substr(1);
            let price=np*1;
            total=total+price;
        }
        setTotalcost(total);
  }

  useEffect(()=>{
    const data=localStorage.getItem('cart');
    if(data!="[]"){
      setItems(JSON.parse(data));
      setisEmpty(false);
      getTotalCost();
    }
    else if(data=="[]")
    {
        setisEmpty(true);
    }
  },[handleRemove]);

  

  

  


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
          <th scope="col" className="col-5">Name</th>
          <th scope="col" className="col-1">Qty</th>
          <th scope="col">Price</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
      {
          items.map((item,index)=>(
            <tr>
            <th scope="row"><img src={item["img"]} style={{height:"90px"}}></img></th>
            <td>{item["name"]}</td>
            <td>{item["qty"]}</td>
            <td>{item["base_price"]}</td>
            <td><button type="button" className="btn btn-danger" onClick={()=>handleRemove(item)}>Remove</button></td>
          </tr>
          ))
      }
      </tbody>
      </table>
        </div>
        {
            isEmpty==false && 
            <div>
                <span className="total-price">₹{totalCost}</span>
                <button type="button" className="btn btn-warning pymnt-btn" onClick={handleOpen}>Make Payment</button>
           </div>
        }

        {
          user==null?
              <Modal
            open={open2}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
            <img src="error_img.png" className="err_img"/>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                ERROR!
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please Log In to make the Order
              </Typography>
            </Box>
          </Modal>
          :

              <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
              <img src="order_placed.png" className="odr-plcd"/>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                ORDER PLACED
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Order ID :- {orderid}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Time of order :- {currdate} {currtime}
              </Typography>
            </Box>
          </Modal>
        }
    </div>
  )
}
