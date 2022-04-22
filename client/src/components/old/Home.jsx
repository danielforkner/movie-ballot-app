import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Link to="/polls">Continue as Guest</Link>
    </div>
  );
};

export default Home;
