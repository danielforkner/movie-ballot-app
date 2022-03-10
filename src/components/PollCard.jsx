import React from 'react';

const PollCard = (props) => {
  const { setPolls, polls, poll } = props;

  return (
    <div className="pollCard">
      <h4>{poll.name}</h4>
      <p>This is a {poll.pollType} poll</p>
      <button
        id={poll.id}
        onClick={(e) => {
          const newPolls = polls.data.filter((item) => {
            return item.id !== parseInt(e.target.id);
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
      {}
    </div>
  );
};

export default PollCard;
