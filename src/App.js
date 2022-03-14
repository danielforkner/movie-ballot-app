import React, { useState } from 'react';
import { PollsContainer, AddPollForm, SinglePoll } from './components';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const dummyData = {
  info: { length: 3 },
  data: [
    {
      id: 1,
      name: 'Friday Night',
      pollType: 'single',
      numOfOptions: 1,
      options: [
        {
          option1: {
            name: 'Option1',
            movies: [],
          },
        },
      ],
    },
    {
      id: 2,
      name: 'Saturday Matinee',
      numOfOptions: 1,
      options: [
        {
          option1: {
            name: 'Option1',
            movies: [],
          },
        },
      ],
    },
    {
      id: 3,
      name: 'Funny Sunday',
      pollType: 'triple',
      numOfOptions: 1,
      options: [
        {
          option1: {
            name: 'Option1',
            movies: [],
          },
        },
      ],
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
