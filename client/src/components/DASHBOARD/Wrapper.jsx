import React, { Fragment } from 'react';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';

const Wrapper = () => {
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <Dashboard />
        </div>
      </div>
    </Fragment>
  );
};

export default Wrapper;
