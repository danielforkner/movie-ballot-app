import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchDeletePoll, fetchMyPolls } from '../../api/fetch';
import useAuth from '../hooks/useAuth';
import NewPollForm from './NewPollForm';
import PollCard from './PollCard';

const Polls = () => {
  const { myPolls, setMyPolls, token } = useAuth();
  const [isAddingNewPoll, setIsAddingNewPoll] = useState(false);
  console.log('My polls: ', myPolls);

  const handleDeletePoll = async (pollId) => {
    try {
      const response = await fetchDeletePoll(token, pollId);
      setMyPolls(response);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <button onClick={() => setIsAddingNewPoll(!isAddingNewPoll)}>
        Add new Poll
      </button>
      {isAddingNewPoll ? <NewPollForm /> : null}
      <h1>Active Polls</h1>
      {myPolls.length && myPolls.length > 0
        ? myPolls.map((poll, i) => {
            if (poll.deleted === false && poll.active) {
              return (
                <PollCard
                  key={`activePollcard:${i}`}
                  poll={poll}
                  handleDeletePoll={handleDeletePoll}
                />
              );
            }
          })
        : 'No Active Polls'}
      <h1>In Progress</h1>
      {myPolls.length && myPolls.length > 0
        ? myPolls.map((poll, i) => {
            if (poll.deleted === false && poll.active === false) {
              return (
                <PollCard
                  key={`activePollcard:${i}`}
                  poll={poll}
                  handleDeletePoll={handleDeletePoll}
                />
              );
            }
          })
        : 'Create Your First Poll!'}
      {/* Move the below into an admin dashboard */}
      {/* <h1>Deleted Polls</h1>
      {myPolls.length && myPolls.length > 0
        ? myPolls.map((poll, i) => {
            if (poll.deleted) {
              return (
                <PollCard
                  key={`deletedPollcard:${i}`}
                  poll={poll}
                  handleDeletePoll={handleDeletePoll}
                />
              );
            }
          })
        : null} */}
    </div>
  );
};

export default Polls;
