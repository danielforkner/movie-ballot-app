import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import NewOptionForm from './NewOptionForm';
import Option from './Option';

const SinglePoll = () => {
  const [isAddingNewOption, setisAddingNewOption] = useState(false);
  const pollId = useParams().pollId;
  const { myPolls } = useAuth();
  const [currentPoll, setCurrentPoll] = useState([]);

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
      <button onClick={() => setisAddingNewOption(!isAddingNewOption)}>
        Add an Option
      </button>
      {isAddingNewOption ? <NewOptionForm currentPoll={currentPoll} /> : null}
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {currentPoll.options
              ? currentPoll.options.map((option, i) => {
                  return (
                    <div
                      className="col"
                      key={`poll:${currentPoll.id}option:${option.id}`}
                    >
                      <Option option={option} poll={currentPoll} />
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SinglePoll;
