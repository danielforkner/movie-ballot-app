import React from 'react';
import usePolls from '../hooks/usePolls';

const Sidebar = () => {
  const { myPolls } = usePolls();
  console.log(myPolls);
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <div className="nav-link">Active Polls</div>
            <div className="nav-link">Closed Polls</div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
