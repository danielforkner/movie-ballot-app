import React, { useState } from 'react';

const AddPollForm = (props) => {
  const { polls, setPolls } = props;
  let newPoll = {};
  const [name, setName] = useState('');
  const [pollType, setType] = useState('');

  const setBoth = () => {
    setName('');
    setType('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // prevent empty and duplicate polls
    if (name === '' || pollType === '') {
      return;
    }
    for (let i = 0; i < polls.data.length; i++) {
      if (polls.data[i].name === name) {
        alert('please enter a unique name');
        setBoth();
        return;
      }
    }

    
      newPoll = {
        index: Date.now(),
        name: name,
        pollType: pollType,
        options: [
          {
            name: 'Option',
            movies: [],
          },
        ],
      };
      setPolls({
        data: [newPoll, ...polls.data],
      });
      setBoth();
    }

  return (
    <div className="addPollContainer">
      <h2>Add Poll Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name of Poll
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
