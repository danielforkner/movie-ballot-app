import React, { useEffect, useState } from 'react';

const AddPollForm = (props) => {
  const [newPoll, setNewPoll] = useState({});
  const [name, setName] = useState('');
  const [pollType, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // ERROR ONE STEP BEHIND
    setNewPoll({ name: name, pollType: pollType });
    setName('');
    setType('');
    // ERROR
    // props.setPolls(newPoll);
  };

  const handleChange = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  return (
    <div className="addPollContainer">
      <h2>Add Poll</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name of Poll
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="type">
          Type of Poll
          <input
            type="text"
            value={pollType}
            name="type"
            onChange={(e) => {
              setType(e.target.value);
              console.log(pollType);
            }}
          ></input>
        </label>
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};

export default AddPollForm;
