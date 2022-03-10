import React, { useState } from 'react';
import { PollsContainer, AddPollForm } from './components';
import './index.css';

const dummyData = {
  info: { length: 3 },
  data: [
    { id: 1, name: 'movie night', pollType: 'single' },
    { id: 2, name: 'round robin', pollType: 'double' },
    { id: 3, name: 'movie', pollType: 'triple' },
  ],
};

const App = () => {
  const [polls, setPolls] = useState(dummyData);

  return (
    <div className="pollsContainer">
      <AddPollForm setPolls={setPolls} polls={polls} />
      <PollsContainer setPolls={setPolls} polls={polls} />
    </div>
  );
};

export default App;
