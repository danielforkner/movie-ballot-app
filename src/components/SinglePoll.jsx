import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Option from './Option';

const SinglePoll = ({ setPolls, polls }) => {
  const { pollID } = useParams();

  console.log('polls.data:', polls.data);
  let currentPoll = polls.data.filter((element) => element.index === +pollID);
  currentPoll = currentPoll[0];
  console.log(currentPoll);

  // check if the poll is "finished" or not to either:
  // render options and "generate link" button or
  // render final poll with the generated link.

  return (
    <Fragment>
      <h1>
        {currentPoll.name}: #{currentPoll.index}
      </h1>
      <button
        onClick={() => {
          currentPoll.options.push({
            id: Date.now(),
            name: `Option`,
            movies: [],
          });
          console.log(currentPoll);
          setPolls({
            data: [
              ...polls.data.map((element) => {
                if (+pollID !== element.index) {
                  return element;
                } else return currentPoll;
              }),
            ],
          });
        }}
      >
        Add Option
      </button>
      {currentPoll.options.length > 0
        ? currentPoll.options.map((option, i) => {
            return (
              <Option
                currentPoll={currentPoll}
                setPolls={setPolls}
                polls={polls}
                pollID={pollID}
                key={i}
                optionIndex={i}
              />
            );
          })
        : null}
    </Fragment>
  );
};

export default SinglePoll;
