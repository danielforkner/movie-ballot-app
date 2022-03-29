import React, { useState } from 'react';
import { PollsContainer, AddPollForm, SinglePoll, Login } from './components';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

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
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
