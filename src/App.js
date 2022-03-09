import React, { useState } from 'react';
import PollsContainer from './PollsContainer';
import AddPollForm from './AddPollForm';
import './index.css';

const dummyData = [
  { number: 1, name: 'movie night', type: 'single' },
  { number: 2, name: 'round robin', type: 'double' },
  { number: 3, name: 'movie', type: 'type' },
];

const App = () => {
  const [polls, setPolls] = useState(dummyData);

  return (
    <div className="pollsContainer">
      <h1>Polls Container</h1>
      <AddPollForm setPolls={setPolls} polls={polls} />
      <PollsContainer polls={polls} />
    </div>
  );
};

export default App;
