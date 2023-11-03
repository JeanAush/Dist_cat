import React, {useState}from 'react';
import './Form.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Search } from './Search';
export const Form = () => {
  const[phoneNumber, setPhoneNumber] = useState('');
  const[email, setEmail] = useState('');
  const[address, setAddress] = useState('');
  const[reg, setReg] = useState('');

  const handleProfile = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:8000/api/register',{
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      reg: reg,
    })
    .then((response)=>{
      if(response.data.message==='user saved successfully'){
        toast.success('Data saved successfully',{
          position: 'top-right',
          autoClose: 3000,
        });
      } else if(response.data.message==='Data already saved'){
        toast.error('Details already exist',{
          position: 'top-right',
          autoClose: 3000,
        });
      }
    })
  }
  return (
    <div>
      < Search />
      <h2>Profile</h2>
      <form onSubmit={handleProfile}>
        <label htmlFor="phoneNumber">Phone</label><br/>
        <input 
        value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+254*********"
          id="phoneNumber"
          name="phoneNumber"/>
        <label htmlFor="reg">Reg</label><br/>
        <input 
        value={reg} 
        onChange={(e) => setReg(e.target.value)}
        placeholder="BBIT/MG/1234/06/30"
        id="reg"
        name="reg"/>
        <label htmlFor="address">address</label><br/>
        <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your Address"
        id="address"
        name="address"/>
        <label htmlFor="email">email</label><br/>
        <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@gmail.com"
        id="email"
        name="email" />

        <button type="submit">Save Profile</button>

      </form>
    </div>
  )

  
};
