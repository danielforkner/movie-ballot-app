import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import NewPollForm from './NewPollForm';

const Polls = () => {
  const { myPolls } = useAuth();

  const [isAddingNewPoll, setIsAddingNewPoll] = useState(false);
  console.log('My polls: ', myPolls);

  return (
    <div>
      <button onClick={() => setIsAddingNewPoll(!isAddingNewPoll)}>
        Add new Poll
      </button>
      {isAddingNewPoll ? <NewPollForm /> : null}
      {myPolls.length && myPolls.length > 0
        ? myPolls.map((poll, i) => {
            return (
              <div style={{ border: '1px solid gray' }}>
                <h4>{poll.name}</h4>
                <p>Date Created: {poll.dateCreated.slice(0, 10)}</p>
                {poll.publicURL ? (
                  <p>Public link: {poll.publicURL}</p>
                ) : (
                  <Link to={`${poll.id}`}>
                    <button>Manage</button>
                  </Link>
                )}
              </div>
            );
          })
        : 'Create Your First Poll!'}
    </div>
  );
};

export default Polls;
