import React, { useState, useEffect } from 'react';
import { fetchMyPolls } from '../../api/fetch';
import useAuth from '../hooks/useAuth';

export const PollsContext = React.createContext();

const PollsProvider = ({ children }) => {
  const [myPolls, setMyPolls] = useState([]);
  const { token } = useAuth();

  const getMyPolls = async () => {
    if (localStorage.getItem('fridayNightMoviesToken')) {
      const polls = await fetchMyPolls(token);
      setMyPolls(polls);
    }
  };

  useEffect(() => {
    getMyPolls();
  }, [token]);

  return (
    <PollsContext.Provider value={{ myPolls, setMyPolls }}>
      {children}
    </PollsContext.Provider>
  );
};

export default PollsProvider;
