import React, { useState } from 'react';
import { Login, Register } from '.';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, setToken } = useAuth();
  const [loginBtn, setLoginBtn] = useState(false);
  const [registerBtn, setRegisterBtn] = useState(false);

  return (
    <div>
      <h1>{`Hello, ${user.username}`}</h1>
      <button
        onClick={() => {
          localStorage.removeItem('fridayNightMoviesToken');
          setToken('');
        }}
      >
        Logout
      </button>
      <button
        onClick={() => {
          setRegisterBtn(false);
          setLoginBtn(!loginBtn);
        }}
      >
        Login
      </button>
      {loginBtn ? <Login setLoginBtn={setLoginBtn} /> : null}
      <button
        onClick={() => {
          setRegisterBtn(!registerBtn);
          setLoginBtn(false);
        }}
      >
        Register new Account
      </button>
      {registerBtn ? <Register setRegisterBtn={setRegisterBtn} /> : null}
    </div>
  );
};

export default Navbar;
