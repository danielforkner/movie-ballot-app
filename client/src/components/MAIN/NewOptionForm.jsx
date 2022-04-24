import React, { useState } from 'react';
import { fetchCreateNewOption } from '../../api/fetch';
import useAuth from '../hooks/useAuth';

const NewOptionForm = ({ currentPoll }) => {
  const { token, setMyPolls } = useAuth();
  const [optionName, setOptionName] = useState('');

  const handleNewOption = async () => {
    const updatedPolls = await fetchCreateNewOption(
      token,
      optionName,
      currentPoll.id
    );
    setMyPolls(updatedPolls);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="container">
        <div className="row">
          <span
            onClick={(e) => handleNewOption(e)}
            className="btn btn-sm btn-success col-1"
          >
            +
          </span>
          <input
            className="col-11"
            name="optionName"
            placeholder="Option Name"
            value={optionName}
            onChange={(e) => setOptionName(e.target.value)}
          ></input>
        </div>
      </div>
    </form>
  );
};

export default NewOptionForm;
