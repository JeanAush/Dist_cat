import React, { useState } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import './App.css';
import { Register } from './Register';
import { Login } from './Login';
import { Form } from './Form';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="App">
      {
        currentForm === "login" ?<Login onFormSwitch={toggleForm}/>: <Register onFormSwitch={toggleForm}/>
      }
    </div>
  );
    }

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route 
//           path="/login" 
//           element={<Login handleLogin={handleLogin} />} />
//         <Route 
//           path="/register" 
//           element={<Register />} />
//         <Route 
//           path="/form" 
//           element={isLoggedIn ? <Form /> : <Navigate to="/register" />} />
//         <Route
//           path="/"
//           element={isLoggedIn ? <Navigate to="/form" /> : <Form />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

export default App;
