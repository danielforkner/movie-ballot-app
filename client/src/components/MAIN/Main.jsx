import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Polls from './Polls';
import SinglePoll from './SinglePoll';
import Vote from './Vote';

const Main = () => {
  return (
    // .main min-height: 50vh
    <div className="main">
      <Routes>
        <Route path="/polls/rank/:pollId" element={<Vote />} />
        <Route path="/polls/:pollId" element={<SinglePoll />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/" element={<Link to="/polls">My Polls</Link>} />
      </Routes>
    </div>
  );
};

export default Main;
