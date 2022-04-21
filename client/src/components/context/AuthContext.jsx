import React, { useState, useEffect } from 'react';
import { getMe } from '../../api/fetch';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(
    localStorage.getItem('fridayNightMoviesToken')
  );

  // set user
  const getUser = async () => {
    if (localStorage.getItem('fridayNightMoviesToken')) {
      const user = await getMe(token);
      setUser(user);
      console.log('ME THE USER: ', user);
    } else {
      console.log('no token');
      setUser({});
    }
  };

  useEffect(() => {
    getUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
