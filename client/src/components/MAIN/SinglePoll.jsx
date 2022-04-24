import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Option from './Option';

const SinglePoll = () => {
  const pollId = useParams().pollId;
  const { user, myPolls } = useAuth();
  const [currentPoll, setCurrentPoll] = useState([]);

  console.log('CurrentPoll: ', currentPoll);

  useEffect(() => {
    if (myPolls.length) {
      const [poll] = myPolls.filter((poll) => {
        return poll.id === +pollId;
      });
      setCurrentPoll(poll);
    } else {
      setCurrentPoll([]);
      return;
    }
  }, [myPolls]);

  return (
    <div>
      <h1>{`Poll: ${currentPoll.name}`}</h1>
      <h4>Options</h4>
      <button>Add an Option</button>
      {currentPoll.options
        ? currentPoll.options.map((option, i) => {
            return <Option option={option} />;
          })
        : null}
    </div>
  );
};
export default SinglePoll;
