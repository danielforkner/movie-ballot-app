import React, { useEffect, useState } from 'react';
import { Navbar } from './NAVBAR';
import { FooterLinks } from './FOOTER';
import { Main } from './MAIN';
import AuthProvider from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        <Router>
          <Main />
        </Router>
        <FooterLinks />
      </div>
    </AuthProvider>
  );
};

export default App;
