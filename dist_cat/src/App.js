import React, { useState } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import './App.css';
import { Register } from './Register';
import { Login } from './Login';
import { Form } from './Form';
import Home from './Home';

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setLoggedIn] = useState(false); 

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const handleLogin =()=>{
    setLoggedIn(true)
  }

  // return (
  //   <div className="App">
  //     {
  //       currentForm === "login" ?<Login onFormSwitch={toggleForm}/>: <Register onFormSwitch={toggleForm}/>
  //     }
  //   </div>
  // <Route 
  //         path="/form" 
  //         element={isLoggedIn ? <Form /> : <Navigate to="/register" />} />
  //       <Route
  // );

 return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={<Login />} />
        <Route 
          path="/register" 
          element={<Register />} />
        <Route 
          path="/form" 
          element={<Form />} />
        <Route
          path="/"
          element={<Home />} 
        />
      </Routes>
    </BrowserRouter>
  );

    }

 

export default App;
