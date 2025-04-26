import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../src/components/shared/Layout.jsx';
import Dashboard from '../src/pages/Dashboard.jsx';
import MyDevices from '../src/pages/myDevices.jsx';
import Chat from '../src/pages/Chat.jsx';
import About from '../src/pages/About.jsx';
import Report from '../src/pages/Report.jsx';
import Login from '../src/pages/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>

        <Routes>
          <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/my-devices" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<MyDevices />} />
          </Route>
          <Route path="/chat" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<Chat />} />
          </Route>
          <Route path="/about" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<About />} />
          </Route>
          <Route path="/report" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<Report />} />
          </Route>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
