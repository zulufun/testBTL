import React, { useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState('fakeCaptchaToken');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  const handleCaptcha = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (action) => {
    if (action === 'login') {
      if (username === 'user' && password === 'password' && captchaToken) {
        onLogin();
        navigate('/'); // Navigate to the main page
      } else {
        setMessage('Invalid credentials or captcha not verified');
      }
    } else if (action === 'register') {
      // Implement registration logic here
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome</h1>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Login</h2>

          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <HCaptcha
              sitekey="496c1d9a-7714-4c70-82be-8cc666046cd0"
              onVerify={handleCaptcha}
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => handleSubmit('login')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>

            <button
              onClick={() => handleSubmit('register')}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Register
            </button>
          </div>

          {message && (
            <p className="mt-4 text-center text-sm text-red-500">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
