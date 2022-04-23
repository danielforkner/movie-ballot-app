import React, { useEffect, useState } from 'react';
import { Navbar } from './NAVBAR';
import { FooterLinks } from './FOOTER';
import Main from './MAIN/Main';
import AuthProvider from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <AuthProvider>
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
