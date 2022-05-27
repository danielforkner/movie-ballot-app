import React, { useState } from 'react';
import usePolls from '../hooks/usePolls';
import useAuth from '../hooks/useAuth';
import { fetchCalculateVotes, fetchMyPolls } from '../../api/fetch';
import ClosePollModal from './ClosePollModal';
import Results from './Results';
import { Link } from 'react-router-dom';
import VoteLog from './VoteLog';

const CurrentPoll = ({ currentPoll, setCurrentPoll }) => {
  const [showLog, setShowLog] = useState(false);
  const [currentOption, setCurrentOption] = useState(null);
  const [closingPoll, setClosingPoll] = useState(false);
  const { token } = useAuth();
  const { setMyPolls } = usePolls();

  const refreshVotes = async () => {
    try {
      await fetchCalculateVotes(token, currentPoll.id);
      const polls = await fetchMyPolls(token);
      setMyPolls(polls);
      let [updatedCurrentPoll] = polls.filter(
        (poll) => poll.id === currentPoll.id
      );
      setCurrentPoll(updatedCurrentPoll);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="currentPoll-container">
      {currentPoll ? (
        <div className="d-flex flex-column align-items-start gap-3 mb-3">
          <h1>{currentPoll.name}</h1>
          <h4>{`Date created: ${currentPoll.dateCreated.slice(0, 10)}`}</h4>
          <h4>
            {`Public link: `}
            <Link to={`vote/${currentPoll.link}`}>
              {`${window.origin}/polls/vote/${currentPoll.link}`}
            </Link>
          </h4>
          {currentPoll.closed ? null : (
            <div className="d-flex justify-content-start gap-3">
              <button
                className="btn bg-gradient btn-primary"
                onClick={refreshVotes}
              >
                Refresh vote count
              </button>
              <button
                className="btn bg-gradient btn-warning"
                onClick={() => setClosingPoll(true)}
              >
                Close Poll
              </button>
            </div>
          )}
          <Results
            poll={currentPoll}
            setShowLog={setShowLog}
            setCurrentOption={setCurrentOption}
          />
        </div>
      ) : (
        'Select a poll from the table below'
      )}
      {closingPoll && (
        <ClosePollModal
          poll={currentPoll}
          closingPoll={closingPoll}
          setClosingPoll={setClosingPoll}
        />
      )}
      {showLog && (
        <VoteLog
          option={currentOption}
          showLog={showLog}
          setShowLog={setShowLog}
        />
      )}
    </div>
  );
};

export default CurrentPoll;
