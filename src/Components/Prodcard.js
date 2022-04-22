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

export default function Prodcard({item}) {

    const[quantity,setQuantity]=useState(0);
    

    function increasebyOne()
    {
        let olddata=JSON.parse(localStorage.getItem("cart") || "[]");
        let tempdata=[...olddata];
        if(tempdata.length==0)
        {
          let cqty=item["qty"];
          cqty=cqty+1;
          item["qty"]=cqty;
          item["new_price"]=item["base_price"];
          tempdata.push(item);
          setQuantity(1);
          localStorage.setItem("cart",JSON.stringify(tempdata));
        }
        else
        {
          let isPresent=false;

          for(let i=0;i<tempdata.length;i++)
          {
            let obj=tempdata[i];
            if(obj["id"]==item["id"])
            {
              isPresent=true;
              let cqty=obj["qty"];
              cqty=cqty+1;
              obj["qty"]=cqty;
              let np=obj["base_price"].substr(1);
              np=np*cqty;
              obj["new_price"]="₹"+np;
              tempdata[i]=obj;
            }
          }

          if(isPresent==false)
          {
            let cqty=item["qty"];
            cqty=cqty+1;
            item["qty"]=cqty;
            item["new_price"]=item["base_price"];
            tempdata.push(item);
            
            setQuantity(1);
            localStorage.setItem("cart",JSON.stringify(tempdata));
          }
          else
          {
            setQuantity(prev=>prev+1);
            localStorage.setItem("cart",JSON.stringify(tempdata));
          }
        }
    }

    function decreasebyOne()
    {
        if(quantity-1<0)
        return;
        setQuantity(prev=>prev-1);
        if(quantity-1==0)
        {
          let olddata=JSON.parse(localStorage.getItem("cart") || "[]");
          let tempdata=[...olddata];
          let index=tempdata.filter(obj=>obj["id"]!=item["id"]) ;
          tempdata=[...index];
          localStorage.setItem("cart",JSON.stringify(tempdata));
        }

        let olddata=JSON.parse(localStorage.getItem("cart") || "[]");
        let tempdata=[...olddata];

        for(let i=0;i<tempdata.length;i++)
        {
          let cobj=tempdata[i];
          if(cobj["id"]==item["id"])
          {
            let cqty=cobj["qty"];
            cqty=cqty-1;
            cobj["qty"]=cqty;
            let np=cobj["new_price"].substr(1);
            let bp=cobj["base_price"].substr(1);
            np=np-bp;
            cobj["new_price"]="₹"+np;
            tempdata[i]=cobj;
          }
        }
        localStorage.setItem("cart",JSON.stringify(tempdata));
    }


    function isPresent()
    {
      let olddata=JSON.parse(localStorage.getItem("cart") || "[]");
      if(olddata.length==0)
      return false;
      let tempdata=[...olddata];
      for(let i=0;i<tempdata.length;i++)
      {
        let cobj=tempdata[i];
        if(cobj["id"]==item["id"])
        {
          return true;
        }
      }
      return false;
    }

    useEffect(()=>{
      if(isPresent()==true)
      {
        let olddata=JSON.parse(localStorage.getItem("cart") || "[]");
        let tempdata=[...olddata];
        for(let i=0;i<tempdata.length;i++)
        {
          let cobj=tempdata[i];
          if(cobj["id"]==item["id"])
          {
            setQuantity(cobj["qty"]);
          }
        }
      }
    },[])
    
    

  return (
    <div className="product-card">
        <div className="badge">Hot</div>
        <div className="product-tumb">
          <img src={item["img"]} alt="" />
        </div>
        <div className="product-details">
          <h4>{item["name"]}</h4>
          <p>{item["desc"]}</p>
          <div className="product-bottom-details">
            <div className="product-price">{item["base_price"]}</div>
            </div>
            <div>
            {
                quantity==0?
                <Button variant="contained" sx={{backgroundColor:"#e84a5f"}} onClick={increasebyOne}>Add to Cart</Button>
                :
                <div className="button-block">
                    <Button onClick={increasebyOne} className="btns" sx={{backgroundColor:"#f23557", color:"#222831", height:"50px",mt:"-2%"}}>+</Button>
                    <input type="text" value={quantity} className="qty-field" readOnly/>
                    <Button onClick={decreasebyOne} className="btns" sx={{backgroundColor:"#f23557", color:"#222831", height:"50px",mt:"-2%"}}>-</Button>
                </div>
            }
          </div>
        </div>
      </div>
  )
}
