import React from 'react';

const PollCard = (props) => {
  const { setPolls, polls, poll } = props;

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
      <button
        className="editPollBtn"
        onClick={(e) => {
          //   renderSinglePoll(e.target.parentElement.id);
        }}
      >
        EDIT
      </button>
      {}
    </div>
  );
};

export default PollCard;
