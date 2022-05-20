import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [showLink, setShowLink] = useState(false);
  const [goToPoll, setGoToPoll] = useState('');
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/polls/vote/${goToPoll}`, { replace: true });
  };

  return (
    <div className="text-center m-5 p-5">
      <h2>Welcome to Friday Night Movies</h2>
      <p>
        the <em>only</em> ranked-choice movie voting app for you and your
        friends
      </p>
      <div className="d-flex justify-content-center gap-2">
        {isLoggedIn ? (
          <div className="bg-dark bg-gradient rounded">
            <Link to="/polls">
              <button className="btn btn-outline-light" id="landingLoginBtn">
                Create Poll
              </button>
            </Link>
          </div>
        ) : null}
        <div className="bg-dark bg-gradient rounded">
          <button
            onClick={() => setShowLink(!showLink)}
            className="btn btn-outline-warning"
            id="landingVoteBtn"
          >
            Cast a Vote
          </button>
        </div>
      </div>
      {showLink ? (
        <div className="d-flex justify-content-center m-2">
          <form onSubmit={handleSubmit}>
            <input
              name="goToPoll"
              value={goToPoll}
              placeholder="enter poll number here"
              onChange={(e) => setGoToPoll(e.target.value)}
              type="text"
            />
            <button className="btn-warning rounded" type="submit">
              Go
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default LandingPage;
