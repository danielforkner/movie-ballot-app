import React, { useState, useEffect } from 'react';
import { getMe } from '../../api/fetch';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(
    localStorage.getItem('fridayNightMoviesToken')
  );

  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem('fridayNightMoviesToken')) {
        const user = await getMe(token);
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUser({});
      }
    };

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
