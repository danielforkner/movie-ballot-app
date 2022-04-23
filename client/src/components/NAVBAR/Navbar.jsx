import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
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
          {user.username ? (
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
          ) : (
            <Fragment>
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
            </Fragment>
          )}
          <li>
            <Link to="/polls">
              <button>My Polls</button>
            </Link>
          </li>
        </ul>
        {loginBtn ? <Login setLoginBtn={setLoginBtn} /> : null}
        {registerBtn ? <Register setRegisterBtn={setRegisterBtn} /> : null}
      </header>
    </div>
  );
};

export default Navbar;
