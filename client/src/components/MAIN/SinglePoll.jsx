import { user } from 'pg/lib/defaults';
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const SinglePoll = () => {
  const pollId = useParams().pollId;
  const { myPolls } = useAuth();
  const [currentPoll, setCurrentPoll] = useState([]);
  console.log('MY POLLS: ', myPolls);
  console.log('CURRENT POLL: ', currentPoll);
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

  return <div>{user.username ? currentPoll.name : <Navigate to="/" />}</div>;
};
export default SinglePoll;
