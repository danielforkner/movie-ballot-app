import React, { useState } from 'react';
import { fetchDeletePoll } from '../../api/fetch';
import useAuth from '../hooks/useAuth';
import usePolls from '../hooks/usePolls';
import NewPollForm from './NewPollForm';
import PollCard from './PollCard';

const Polls = () => {
  const { token } = useAuth();
  const { myPolls, setMyPolls } = usePolls();
  const [isAddingNewPoll, setIsAddingNewPoll] = useState(false);

  const handleDeletePoll = async (pollId) => {
    try {
      const response = await fetchDeletePoll(token, pollId);
      setMyPolls(response);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="p-3 d-flex flex-column align-items-start ga-3">
      <button onClick={() => setIsAddingNewPoll(!isAddingNewPoll)}>
        Add new Poll
      </button>
      {isAddingNewPoll ? (
        <NewPollForm
          isAddingNewPoll={isAddingNewPoll}
          setIsAddingNewPoll={setIsAddingNewPoll}
        />
      ) : null}
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
            return !poll.deleted && !poll.active && !poll.closed ? (
              <PollCard
                key={`activePollcard:${i}`}
                poll={poll}
                handleDeletePoll={handleDeletePoll}
              />
            ) : null;
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
