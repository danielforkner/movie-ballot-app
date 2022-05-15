import { Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import { loginUser } from '../../api/fetch';
import useAuth from '../hooks/useAuth';

const Login = ({ loginBtn, setLoginBtn }) => {
  const { setToken } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const resetForm = () => {
    setUsername('');
    setPassword('');
  };

  const handleClose = () => setLoginBtn(false);

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
    <Modal show={loginBtn} onHide={handleClose}>
      <header className="modal-header border-bottom-0">
        <h2 className="fw-bold mb-0">Login</h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => setLoginBtn(false)}
        ></button>
      </header>
      <div className="modal-body">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              value={username}
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              value={password}
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <label htmlFor="password">Password</label>
          </div>
          <button
            className="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default Login;
