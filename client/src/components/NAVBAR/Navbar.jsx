import React, { useState } from 'react';
import { Login, Register } from '.';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { username } = useAuth();
  const [loginBtn, setLoginBtn] = useState(false);
  const [registerBtn, setRegisterBtn] = useState(false);

  return (
    <div>
      <h1>{`Hello, ${username}`}</h1>
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
