import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

export const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/register', {
        email: email,
        password: password,
        username: username,
      })
      .then((response) => {
        if (response.data.message === 'User registered successfully') {
          // Show success toast
          toast.success('Registration successful!', {
            position: 'top-right',
            autoClose: 3000,
          });
          // navigate('/login');
        } else if (response.data.message === 'Email already registered') {
          // Show error toast
          toast.error('Email is already registered', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('An error occurred', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Dist_cat1"
          id="username"
          name="username"
        />
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="dist@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          type="password"
          id="password"
          name="password"
        />
        <button onClick={()=>props.onFormSwitch('login')} type="submit">Register</button>
      </form>
    </div>
  );
};
