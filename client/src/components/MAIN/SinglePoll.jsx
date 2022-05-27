import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { activatePoll, fetchPollByLink } from '../../api/fetch';
import useAuth from '../hooks/useAuth';
import usePolls from '../hooks/usePolls';
import NewOptionForm from './NewOptionForm';
import Option from './Option';

const SinglePoll = () => {
  const [isAddingNewOption, setisAddingNewOption] = useState(false);
  const pollLink = useParams().pollLink;
  const { myPolls, setMyPolls } = usePolls();
  const { token, user } = useAuth();
  const [currentPoll, setCurrentPoll] = useState([]);
  const [active, setActive] = useState(false);

  const navigate = useNavigate();

  const handleFinalize = async (id) => {
    const updatedPolls = await activatePoll(token, id);
    setMyPolls(updatedPolls);
  };

  // on page load, get poll by id. If authorId is not user.id, redirect. otherwise setCurrentPoll.
  useEffect(() => {
    const getPoll = async () => {
      if (!token) {
        navigate('/', { replace: true });
      } else {
        try {
          const response = await fetchPollByLink(pollLink);
          console.log('response: ', response);
          setCurrentPoll(response[0]);
          setActive(response[0].active);
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
    getPoll();
  }, [myPolls]);

  return (
    <div className="rank-container d-flex flex-column align-items-center">
      {user.username ? (
        <Fragment>
          <h1>{`Poll: ${currentPoll.name}`}</h1>
          {active && currentPoll.options.length > 0 ? null : (
            <>
              <button
                className="btn btn-success"
                onClick={() => handleFinalize(currentPoll.id)}
              >
                Finalize and Create Public Link
              </button>
              {active ? null : (
                <Fragment>
                  <h4>Options</h4>
                  <button
                    onClick={() => setisAddingNewOption(!isAddingNewOption)}
                  >
                    Add a poll option, aka ballot
                  </button>
                </Fragment>
              )}
              {isAddingNewOption ? (
                <NewOptionForm currentPoll={currentPoll} />
              ) : null}
            </>
          )}
          <div className="album p-5 w-100">
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {currentPoll.options
                ? currentPoll.options.map((option, i) => {
                    return (
                      <Option
                        active={active}
                        option={option}
                        poll={currentPoll}
                        key={`poll:${currentPoll.id}option:${option.id}`}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </Fragment>
      ) : (
        <p>Page not available</p>
      )}
    </div>
  );
};
export default SinglePoll;
