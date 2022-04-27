import React from 'react';
import { Navbar } from './NAVBAR';
import Main from './MAIN/Main';
import AuthProvider from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import PollsProvider from './context/PollsContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <PollsProvider>
          <Navbar />
          <Main />
          {/* <FooterLinks /> */}
        </PollsProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
