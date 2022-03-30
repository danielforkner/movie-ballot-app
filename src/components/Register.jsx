import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const resetForm = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          resetForm();
        }}
      >
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
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          value={confirmPassword}
          type="password"
          name="confirmPassword"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
