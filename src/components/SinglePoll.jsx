import React, { Fragment, useState } from 'react';
import Option from './Option';

const SinglePoll = ({ currentPoll, setPolls, polls, setCurrentPoll }) => {
  return (
    <Fragment>
      <h1>
        {currentPoll.name}: #{currentPoll.id}
      </h1>

      <Option
        currentPoll={currentPoll}
        setPolls={setPolls}
        polls={polls}
        setCurrentPoll={setCurrentPoll}
      />
    </Fragment>
  );
};

export default SinglePoll;
