import React, { useState } from 'react';
import { PollsContainer, AddPollForm, SinglePoll, Home } from './components';
import { Navbar } from './components/NAVBAR';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { FooterLinks } from './components/FOOTER';
import AuthProvider from './components/context/AuthContext';

const dummyData = {
  data: [
    {
      index: 0,
      name: 'Friday Night',
      pollType: 'single',
      options: [],
    },
    {
      index: 1,
      name: 'Saturday Matinee',
      options: [],
    },
    {
      index: 2,
      name: 'Funny Sunday',
      pollType: 'triple',
      options: [],
    },
  ],
};

const App = () => {
  const [polls, setPolls] = useState(dummyData);

  return (
    <AuthProvider>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/polls/:pollID">
            <Link to="/polls">Back to my polls</Link>
            <SinglePoll setPolls={setPolls} polls={polls} />
          </Route>
          <Route path="/polls">
            <AddPollForm polls={polls} setPolls={setPolls} />
            <PollsContainer polls={polls} setPolls={setPolls} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <FooterLinks />
    </AuthProvider>
  );
};

export default App;
