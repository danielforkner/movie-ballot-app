import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { activatePoll, fetchPollById } from '../../api/fetch';
import useAuth from '../hooks/useAuth';
import NewOptionForm from './NewOptionForm';
import Option from './Option';

const SinglePoll = () => {
  const [isAddingNewOption, setisAddingNewOption] = useState(false);
  const pollId = useParams().pollId;
  const { user, token, myPolls, setMyPolls } = useAuth();
  const [currentPoll, setCurrentPoll] = useState([]);
  const [active, setActive] = useState(false);

  const navigate = useNavigate();

  const handleFinalize = async () => {
    const updatedPolls = await activatePoll(token, pollId);
    setMyPolls(updatedPolls);
  };

  const getPoll = async () => {
    if (!token) {
      console.log('no user logged in, redirecting...');
      navigate('/', { replace: true });
    } else {
      try {
        const response = await fetchPollById(token, pollId);
        const poll = response.poll;
        if (!response.isOwner) {
          console.log('user does not own this poll, redirecting...');
          navigate('/', { replace: true });
        } else {
          setCurrentPoll(poll);
          setActive(poll.active);
        }
      } catch (error) {
        if (error.name === 'NoPageExists') {
          console.error(error.message);
          navigate('/', { replace: true });
        } else {
          throw error;
        }
      }
    }
  };

  // on page load, get poll by id. If authorId is not user.id, redirect. otherwise setCurrentPoll.
  useEffect(() => {
    getPoll();
  }, [myPolls]);

  return (
    <div>
      <h1>{`Poll: ${currentPoll.name}`}</h1>
      {active ? null : (
        <button className="btn btn-success" onClick={handleFinalize}>
          Finalize and Create Public Link
        </button>
      )}
      <div className="album py-5 bg-light">
        {active ? null : (
          <Fragment>
            <h4>Options</h4>
            <button onClick={() => setisAddingNewOption(!isAddingNewOption)}>
              Add an Option
            </button>
          </Fragment>
        )}
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
                      <Option
                        active={active}
                        option={option}
                        poll={currentPoll}
                      />
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
