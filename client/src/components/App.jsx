import React from 'react';
import { Navbar } from './NAVBAR';
import { FooterLinks } from './FOOTER';
import Main from './MAIN/Main';
import AuthProvider from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './DASHBOARD/Dashboard';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="dashboard-container" />
        <div className="app-container">
          <Navbar />
          <Main />
          <FooterLinks />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
