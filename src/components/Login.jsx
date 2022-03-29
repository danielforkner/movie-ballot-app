import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      Hello <Link to="/polls">See all polls</Link>
    </div>
  );
};

export default Login;
