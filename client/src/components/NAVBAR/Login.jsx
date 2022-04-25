import React, { useState } from 'react';
import { loginUser } from '../../api/fetch';
import useAuth from '../hooks/useAuth';

const Login = ({ setLoginBtn }) => {
  const { setToken } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const resetForm = () => {
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      console.log('LOGIN RESPONSE: ', response);
      localStorage.setItem('fridayNightMoviesToken', response.token);
      setToken(response.token);
      setLoginBtn(false);
    } catch (error) {
      console.error(error);
    } finally {
      resetForm();
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          name="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          value={password}
          type="password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
