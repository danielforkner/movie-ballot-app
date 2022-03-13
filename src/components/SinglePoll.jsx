import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Option from './Option';

const SinglePoll = ({ setPolls, polls }) => {
  const { pollID } = useParams();

  const currentPoll = polls.data.filter((element) => {
    return element.id === +pollID;
  })[0];

  return (
    <Fragment>
      <h1>
        {currentPoll.name}: #{currentPoll.id}
      </h1>

      <Option
        setPolls={setPolls}
        polls={polls}
        pollID={pollID}
        currentPoll={currentPoll}
      />
    </Fragment>
  );
};

export default SinglePoll;
