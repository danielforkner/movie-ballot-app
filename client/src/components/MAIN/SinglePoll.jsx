import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { activatePoll } from '../../api/fetch';
import useAuth from '../hooks/useAuth';
import NewOptionForm from './NewOptionForm';
import Option from './Option';

const SinglePoll = () => {
  const [isAddingNewOption, setisAddingNewOption] = useState(false);
  const pollId = useParams().pollId;
  const { token, myPolls, setMyPolls } = useAuth();
  const [currentPoll, setCurrentPoll] = useState([]);

  const handleFinalize = async () => {
    const updatedPolls = await activatePoll(token, pollId);
    setMyPolls(updatedPolls);
  };

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
      <button className="btn btn-success" onClick={handleFinalize}>
        Finalize and Create Public Link
      </button>
      <div className="album py-5 bg-light">
        <h4>Options</h4>
        <button onClick={() => setisAddingNewOption(!isAddingNewOption)}>
          Add an Option
        </button>
        {isAddingNewOption ? <NewOptionForm currentPoll={currentPoll} /> : null}
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
