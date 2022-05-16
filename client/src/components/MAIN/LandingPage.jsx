import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [showLink, setShowLink] = useState(false);
  const [goToPoll, setGoToPoll] = useState('');
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/polls/rank/${goToPoll}`, { replace: true });
  };

  return (
    <div id="landingPage" className="text-center">
      <h2>Welcome to Friday Night Movies</h2>
      <p>
        the <em>only</em> ranked-choice movie voting app for you and your
        friends
      </p>
      <div className="d-flex justify-content-around">
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
        <div className="container">
          <form onSubmit={handleSubmit}>
            <input
              name="goToPoll"
              value={goToPoll}
              onChange={(e) => setGoToPoll(e.target.value)}
              type="text"
            />
            <button type="submit">Go</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default LandingPage;
