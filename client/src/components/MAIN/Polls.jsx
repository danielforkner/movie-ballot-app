import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Polls = () => {
  const { myPolls } = useAuth();
  console.log('My polls: ', myPolls);
  return (
    <div>
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
                    <button>Edit</button>
                  </Link>
                )}
              </div>
            );
          })
        : 'CREATE A POLL'}
    </div>
  );
};

export default Polls;
