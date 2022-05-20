import React, { useState } from 'react';
import { fetchCreateNewOption } from '../../api/fetch';
import useAuth from '../hooks/useAuth';
import usePolls from '../hooks/usePolls';

const NewOptionForm = ({ currentPoll }) => {
  const { setMyPolls } = usePolls();
  const { token } = useAuth();
  const [optionName, setOptionName] = useState('');

  const handleNewOption = async (e) => {
    e.preventDefault();
    const updatedPolls = await fetchCreateNewOption(
      token,
      optionName,
      currentPoll.id
    );
    setMyPolls(updatedPolls);
  };

  return (
    <div className="container m-2 d-flex justify-content-center">
      <form onSubmit={(e) => handleNewOption(e)}>
        <input
          name="optionName"
          placeholder="Option Name"
          value={optionName}
          onChange={(e) => setOptionName(e.target.value)}
        ></input>
        <button className="btn-warning rounded" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default NewOptionForm;
