import React, { useContext } from 'react';
import useAuth from '../hooks/useAuth';

const FooterLinks = () => {
  const { user } = useAuth();
  return (
    <div className="container">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <p className="nav-link px-2 text-muted">My Polls</p>
          </li>
          <li className="nav-item">
            <p className="nav-link px-2 text-muted">Dashboard</p>
          </li>
          <li className="nav-item">
            <p className="nav-link px-2 text-muted">Logout</p>
          </li>
        </ul>
        <p className="text-center text-muted">{`${user.username}'s profile`}</p>
      </footer>
    </div>
  );
};

export default FooterLinks;
