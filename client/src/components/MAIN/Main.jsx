import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Wrapper from '../DASHBOARD/Wrapper';
import LandingPage from './LandingPage';
import Polls from './Polls';
import SinglePoll from './SinglePoll';
import Vote from './Vote';

const Main = () => {
  return (
    // .main min-height: 50vh
    // check useAuth for logged in, don't allow My Polls if not logged in
    <main>
      <Routes>
        <Route path="/polls/rank/:pollId" element={<Vote />} />
        <Route path="/polls/:pollId" element={<SinglePoll />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/dashboard" element={<Wrapper />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </main>
  );
};

export default Main;
