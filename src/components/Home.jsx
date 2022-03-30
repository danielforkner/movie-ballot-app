import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Login, Register } from './';

const Home = () => {
  const [loginBtn, setLoginBtn] = useState(false);
  const [registerBtn, setRegisterBtn] = useState(false);

  return (
    <div>
      <Link to="/polls">Continue as Guest</Link>
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

export default Home;
