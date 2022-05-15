import React from 'react';
import useAuth from '../hooks/useAuth';

const LandingPage = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div id="landingPage" className="text-center">
      <h2>Welcome to Friday Night Movies</h2>
      <p>
        the <em>only</em> ranked-choice movie voting app for you and your
        friends
      </p>
      <div className="d-flex justify-content-around">
        <div className="bg-dark bg-gradient rounded">
          <button className="btn btn-outline-light" id="landingLoginBtn">
            Create Poll
          </button>
        </div>
        <div className="bg-dark bg-gradient rounded">
          <button className="btn btn-outline-warning" id="landingVoteBtn">
            Cast a Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
