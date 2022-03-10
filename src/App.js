import React, { useState } from 'react';
import { PollsContainer, AddPollForm } from './components';
import './index.css';

const dummyData = [
  { number: 1, name: 'movie night', pollType: 'single' },
  { number: 2, name: 'round robin', pollType: 'double' },
  { number: 3, name: 'movie', pollType: 'triple' },
];

const App = () => {
  const [polls, setPolls] = useState(dummyData);

  return (
    <div className="pollsContainer">
      <AddPollForm setPolls={setPolls} polls={polls} />
      <PollsContainer polls={polls} />
    </div>
  );
};

export default App;
