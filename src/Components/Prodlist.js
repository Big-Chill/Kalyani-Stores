import React,{useState,useEffect,useContext} from 'react';
import Header from './Header';
import Prodcard from './Prodcard';
import axios from 'axios';

export default function Prodlist() {
  const[items,setItems]=useState([]);

  useEffect(()=>{
    async function fetchItems()
    {
      const resp=await axios.get("https://testapp-ef926-default-rtdb.asia-southeast1.firebasedatabase.app/items.json");
      const data=resp.data;
      setItems(data);
    }
    fetchItems();
  },[])



  return (
    <div>
        <Header/>
        <div className="main-body">
          {items.map((obj,idx)=>(
            <Prodcard item={obj}/>
          ))}
        </div>
    </div>
  )
}
