import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Wrapper from '../DASHBOARD/Wrapper';
import Polls from './Polls';
import SinglePoll from './SinglePoll';
import Vote from './Vote';

const Main = () => {
  return (
    // .main min-height: 50vh
    <main>
      <Routes>
        <Route path="/polls/rank/:pollId" element={<Vote />} />
        <Route path="/polls/:pollId" element={<SinglePoll />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/dashboard" element={<Wrapper />} />
        <Route path="/" element={<Link to="/polls">My Polls</Link>} />
      </Routes>
    </main>
  );
};

export default Main;
