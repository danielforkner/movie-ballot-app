import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Option from './Option';

const SinglePoll = ({ setPolls, polls }) => {
  const { pollID } = useParams();

  const currentPoll = polls.data[pollID];

  return (
    <Fragment>
      <h1>
        {currentPoll.name}: #{currentPoll.index}
      </h1>
      <button
        onClick={() => {
          currentPoll.options.push({name: `Option${currentPoll.options.length}`, movies: []});
          console.log(currentPoll);
          setPolls({
            info: polls.info,
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
      {polls.data[pollID].options.length > 0
        ? polls.data[pollID].options.map((option, i) => {
            return (
              <Option
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
