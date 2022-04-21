import React,{useState,useEffect,useContext} from 'react';
import Header from './Header';
import Prodcard from './Prodcard';
import axios from 'axios';
import {database} from '../Firebase';
import {AuthContext} from '../Context/AuthContext';
import {Link,useHistory} from 'react-router-dom';


export default function Prodlist() {
  const[items,setItems]=useState([]);
  const[filtereddata,setFilteredData]=useState([]);
  const[searchinput,setSearchInput]=useState("");
  const{user,Logout}=useContext(AuthContext);
  const history=useHistory();

  
  function handleSearch(searchval)
    {
        const text=searchval.toLowerCase();
        setSearchInput(text);
        console.log(text);
        const newarr=items.filter(item=>item.name.toLowerCase().includes(text));
        if(text!="")
        {
            setFilteredData(newarr);
        }
        else
        {
            setFilteredData(items);
        }
    }

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
        <div className="search-div">
                        
                        <div className="opt-card2">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Type to Search..." aria-label="Username" aria-describedby="basic-addon1" style={{marginTop:"-60px", fontSize:"25px"}} onChange={(e)=>handleSearch(e.target.value)}/>
                            </div>
                        </div> 
                        
                    </div>
        <div className="main-body">
          {
            searchinput.length==0?

            items.map((obj,idx)=>(
              <Prodcard item={obj}/>
            ))
            :
            filtereddata.map((obj,idx)=>(
              <Prodcard item={obj}/>
            ))
          }
        </div>
    </div>
  )
}
