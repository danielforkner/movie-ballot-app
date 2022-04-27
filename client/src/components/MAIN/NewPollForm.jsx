import React, { useState } from 'react';
import { fetchCreateNewPoll } from '../../api/fetch';
import useAuth from '../hooks/useAuth';
import usePolls from '../hooks/usePolls';

const NewPollForm = () => {
  const { setMyPolls } = usePolls();
  const { token, user } = useAuth();
  const [pollName, setPollName] = useState('');

  const handleAddNewPoll = async (e) => {
    e.preventDefault();
    const updatedPolls = await fetchCreateNewPoll(token, pollName, user.id);
    setMyPolls(updatedPolls);
    setPollName('');
  };

  return (
    <form onSubmit={(e) => handleAddNewPoll(e)}>
      <div className="container">
        <div className="row">
          <span
            onClick={(e) => handleAddNewPoll(e)}
            className="btn btn-sm btn-success col-1"
          >
            +
          </span>
          <input
            className="col-11"
            name="pollName"
            placeholder="Poll Name"
            value={pollName}
            onChange={(e) => setPollName(e.target.value)}
          ></input>
        </div>
      </div>
    </form>
  );
};

export default NewPollForm;
