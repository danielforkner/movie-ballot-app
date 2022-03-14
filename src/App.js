import React, { useState } from 'react';
import { PollsContainer, AddPollForm, SinglePoll } from './components';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const dummyData = {
  info: { length: 3 },
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
        <Route path="/poll/:pollID">
          <Link to="/">Back to my polls</Link>
          <SinglePoll setPolls={setPolls} polls={polls} />
        </Route>
        <Route path="/">
          <AddPollForm polls={polls} setPolls={setPolls} />
          <PollsContainer polls={polls} setPolls={setPolls} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
