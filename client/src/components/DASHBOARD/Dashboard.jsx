import React, { useState } from 'react';
import usePolls from '../hooks/usePolls';
import Table from './Table';

const Dashboard = () => {
  const [currentPoll, setCurrentPoll] = useState({});
  const { myPolls } = usePolls();

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>
      {/* Current Polls */}
      {currentPoll.name ? (
        <div id="currentPoll-container">
          <h1>{currentPoll.name}</h1>
          <p>{`Current vote count: 5`}</p>
          <p>{`Current winning movie: ${currentPoll.options[0].movies[0].title}`}</p>
          <p>{`Date created: ${currentPoll.dateCreated.slice(0, 10)}`}</p>
          <p>{`More information`}</p>
        </div>
      ) : null}
      {/* List of polls - feed it poll list i.e. active vs closed polls */}
      <h2>Poll List</h2>
      <Table setCurrentPoll={setCurrentPoll} pollList={myPolls} />
    </main>
  );
};

export default Dashboard;
