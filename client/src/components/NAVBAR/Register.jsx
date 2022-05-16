import React, { useEffect, useState } from 'react';
import { registerUser } from '../../api/fetch';
import useAuth from '../hooks/useAuth';
import { Modal } from 'react-bootstrap';

const Register = ({ setRegisterBtn, registerBtn }) => {
  const { setToken } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const resetForm = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  useEffect(() => {
    setIsError(false);
  }, []);

  const handleClose = () => setRegisterBtn(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setIsError(true);
      setErrorMessage('Passwords do not match, please try again.');
      resetForm();
    } else {
      try {
        const response = await registerUser(username, password);
        localStorage.setItem('fridayNightMoviesToken', response.token);
        setToken(response.token);
      } catch (error) {
        setIsError(true);
        setErrorMessage(error.message);
      } finally {
        resetForm();
      }
    }
  };

  return (
    <Modal show={registerBtn} onHide={handleClose}>
      <header className="modal-header border-bottom-0">
        <h2 className="fw-bold mb-0">Register</h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => setRegisterBtn(false)}
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
          <div className="form-floating mb-3">
            <input
              value={confirmPassword}
              className="form-control rounded-4"
              type="password"
              name="confirmPassword"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            ></input>
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
          <button
            className="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
            type="submit"
          >
            Submit
          </button>
        </form>
        {isError ? (
          <div className="errorMessage">
            <small>{`${errorMessage}`}</small>
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default Register;
