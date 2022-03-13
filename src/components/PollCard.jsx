import React from 'react';
import { Link } from 'react-router-dom';

const PollCard = ({ setPolls, polls, poll }) => {
  return (
    <div className="pollCard" id={poll.id}>
      <h4>{poll.name}</h4>
      <p>This is a {poll.pollType} poll</p>
      <button
        className="removePollBtn"
        onClick={(e) => {
          const newPolls = polls.data.filter((item) => {
            return item.id !== parseInt(e.target.parentElement.id);
          });
          console.log('newPolls', newPolls);
          setPolls({
            info: { length: polls.info.length - 1 },
            data: newPolls,
          });
          console.log('polls', polls);
        }}
      >
        REMOVE
      </button>
      <Link to={`/poll/${poll.id}`}>
        <button className="editPollBtn" onClick={() => {}}>
          EDIT
        </button>
      </Link>
      {}
    </div>
  );
};

export default PollCard;
