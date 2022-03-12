import React, { useState } from 'react';
import { PollsContainer, AddPollForm, SinglePoll } from './components';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './index.css';

const dummyData = {
  info: { length: 3 },
  data: [
    { id: 1, name: 'Friday Night', pollType: 'single' },
    { id: 2, name: 'Saturday Matinee', pollType: 'double' },
    { id: 3, name: 'Funny Sunday', pollType: 'triple' },
  ],
};

const App = () => {
  const [polls, setPolls] = useState(dummyData);
  const [currentPoll, setCurrentPoll] = useState({});

  return (
    <Router>
      <Switch>
        <Route path="/poll/">
          <Link to="/">Back to my polls</Link>
          <SinglePoll currentPoll={currentPoll} />
        </Route>
        <Route path="/">
          <AddPollForm polls={polls} setPolls={setPolls} />
          <PollsContainer
            polls={polls}
            setPolls={setPolls}
            setCurrentPoll={setCurrentPoll}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
