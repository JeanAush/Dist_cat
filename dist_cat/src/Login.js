import React, { useState } from 'react';
import {Form} from './Form';
import {useNavigate} from 'react-router-dom'

// import { Search } from './Search';

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const navigate=useNavigate()


  const handleLogin = () => {
    fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,})
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Login successful') {
          // Show success message to the user
          setLoginMessage("Login successful");
          setIsLoggedIn(true);
          navigate("/form")
          console.log('Login successful');
        } else {
          // Show failed login message to the user
          setLoginMessage("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log(resetEmail);

    fetch('http://localhost:8000/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: resetEmail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Password reset email sent successfully') {
          // Show success message for password reset
          setResetSuccess(true);
        } else {
          // Show error message for password reset
          setResetSuccess(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="auth-form-container">
      {/* {isLoggedIn ? (
        <Form />
      ) : (
        <div> */}
      <h2>Login</h2>
      {loginMessage && <div className={loginMessage === 'Login successful' ? 'success-message' : 'error-message'}>{loginMessage}</div>}
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="dist@gmail.com"
          id="email"
          name="email"
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="*******"
          id="password"
          name="password"
        ></input>
        <button onClick={handleLogin} type="submit">Login </button>
      </form>
      <button className="link-btn" onClick={handleForgotPassword}>
        Forgot Password
      </button>
      <button className="link-btn" onClick={()=>props.onFormSwitch('register')}>
        Don't have an account? Register
      </button>

      {showForgotPassword && (
        <div className="forgot-password-modal">
          <h2>Forgot Password</h2>
          <form onSubmit={handleResetPassword}>
            <label htmlFor="reset-email">Email</label>
            <input
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="dist@gmail.com"
              id="reset-email"
              name="reset-email"
            ></input>
            <button type="submit">Reset Password</button>
          </form>
          {resetSuccess !== null && (
            <div className={resetSuccess ? 'success-message' : 'error-message'}>
              {resetSuccess ? 'Password reset email sent successfully' : 'Failed to send password reset email'}
            </div>
          )}
        </div>
      )}
      </div>
  );
};
