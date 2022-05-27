import React from 'react';
import usePolls from '../hooks/usePolls';

const Sidebar = () => {
  const { myPolls } = usePolls();
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <h4 className="nav-link">Polls</h4>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
