import React, { useState } from 'react';
import { Login, Register } from '.';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, setToken } = useAuth();
  const [loginBtn, setLoginBtn] = useState(false);
  const [registerBtn, setRegisterBtn] = useState(false);

  return (
    <div className="continer">
      <header className="d-flex justify-content-center py-3">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <button
              onClick={() => {
                localStorage.removeItem('fridayNightMoviesToken');
                setToken('');
              }}
            >
              Logout
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => {
                setRegisterBtn(false);
                setLoginBtn(!loginBtn);
              }}
            >
              Login
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => {
                setRegisterBtn(!registerBtn);
                setLoginBtn(false);
              }}
            >
              Register new Account
            </button>
          </li>
          {loginBtn ? <Login setLoginBtn={setLoginBtn} /> : null}

          {registerBtn ? <Register setRegisterBtn={setRegisterBtn} /> : null}
        </ul>
      </header>
    </div>
  );
};

export default Navbar;
