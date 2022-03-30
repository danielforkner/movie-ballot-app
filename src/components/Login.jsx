import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const resetForm = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
