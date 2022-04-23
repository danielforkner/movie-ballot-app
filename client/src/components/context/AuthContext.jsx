import React, { useState, useEffect } from 'react';
import { getMe, fetchMyPolls } from '../../api/fetch';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(
    localStorage.getItem('fridayNightMoviesToken')
  );
  const [myPolls, setMyPolls] = useState({});

  // set user
  const getUser = async () => {
    if (localStorage.getItem('fridayNightMoviesToken')) {
      const user = await getMe(token);
      setUser(user);
      console.log('ME THE USER: ', user);
      getMyPolls();
    } else {
      console.log('no token');
      setMyPolls({});
      setUser({});
    }
  };

  const getMyPolls = async () => {
    const polls = await fetchMyPolls(token);
    setMyPolls(polls);
  };

  useEffect(() => {
    getUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, myPolls, setMyPolls }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
