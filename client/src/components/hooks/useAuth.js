import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const { user, setUser, token, setToken, myPolls, setMyPolls } =
    useContext(AuthContext);
  return { user, setUser, token, setToken, myPolls, setMyPolls };
};

export default useAuth;
