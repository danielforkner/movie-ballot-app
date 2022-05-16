import React, { Fragment, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Login, Register } from '.';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, setToken, isLoggedIn } = useAuth();
  const [loginBtn, setLoginBtn] = useState(false);
  const [registerBtn, setRegisterBtn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  console.log('user: ', user);

  return (
    <header className="p-2 bg-dark sticky-top text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link
                to="/"
                className={`nav-link px-2 ${
                  location.pathname === '/'
                    ? 'text-white active'
                    : 'text-warning'
                }`}
              >
                Home
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                {' '}
                <li>
                  <Link
                    to="/polls"
                    className={`nav-link px-2 ${
                      location.pathname === '/polls'
                        ? 'text-white active'
                        : 'text-warning'
                    }`}
                  >
                    My Polls
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className={`nav-link px-2 ${
                      location.pathname === '/dashboard'
                        ? 'text-white active'
                        : 'text-warning'
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
          <div className="text-end">
            {isLoggedIn ? (
              <button
                className="btn btn-outline-light me-2"
                onClick={() => {
                  localStorage.removeItem('fridayNightMoviesToken');
                  setToken('');
                  navigate('/', { replace: true });
                }}
              >
                Logout
              </button>
            ) : (
              <Fragment>
                <button
                  className="btn btn-outline-light me-2"
                  onClick={() => {
                    setRegisterBtn(false);
                    setLoginBtn(!loginBtn);
                  }}
                >
                  Login
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    setRegisterBtn(!registerBtn);
                    setLoginBtn(false);
                  }}
                >
                  Register new Account
                </button>
              </Fragment>
            )}
          </div>
        </div>
        {loginBtn ? (
          <Login setLoginBtn={setLoginBtn} loginBtn={loginBtn} />
        ) : null}
        {registerBtn ? (
          <Register setRegisterBtn={setRegisterBtn} registerBtn={registerBtn} />
        ) : null}
      </div>
    </header>
  );
};

export default Navbar;
