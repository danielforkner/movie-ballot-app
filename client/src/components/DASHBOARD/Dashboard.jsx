import React, { useEffect, useState } from 'react';
import { fetchMyPolls } from '../../api/fetch';
import useAuth from '../hooks/useAuth';
import usePolls from '../hooks/usePolls';
import CurrentPoll from './CurrentPoll';
import Table from './Table';

const Dashboard = () => {
  const { token } = useAuth();
  const [currentPoll, setCurrentPoll] = useState(null);
  const { myPolls, setMyPolls } = usePolls();

  useEffect(() => {
    const updateData = async () => {
      try {
        const polls = await fetchMyPolls(token);
        setMyPolls(polls);
      } catch (error) {
        console.error(error);
      }
    };
    updateData();
  }, []);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>
      <CurrentPoll currentPoll={currentPoll} setCurrentPoll={setCurrentPoll} />

      <h2>Poll List</h2>
      <Table setCurrentPoll={setCurrentPoll} pollList={myPolls} />
    </main>
  );
};

export default Dashboard;
