import React, { Fragment } from 'react';
import { fetchCalculateVotes, fetchMyPolls } from '../../api/fetch';
import useAuth from '../hooks/useAuth';
import usePolls from '../hooks/usePolls';

const Table = ({ pollList, setCurrentPoll }) => {
  const { token } = useAuth();
  const { setMyPolls } = usePolls();
  const handleClick = async (poll) => {
    try {
      await fetchCalculateVotes(token, poll.id);
      const polls = await fetchMyPolls(token);
      setMyPolls(polls);
      let [updatedCurrentPoll] = polls.filter((item) => item.id === poll.id);
      setCurrentPoll(updatedCurrentPoll);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Name</th>
            <th scope="col">Date Created</th>
            <th scope="col">Vote Count</th>
            <th scope="col">No of Ballots</th>
          </tr>
        </thead>
        <tbody>
          {pollList.length && pollList.length > 0 ? (
            <Fragment>
              {pollList.map((poll, i) => {
                if (!poll.active && !poll.closed) return null;
                return (
                  <tr
                    className="tableSelectRow"
                    onClick={() => handleClick(poll)}
                  >
                    {poll.active ? <td>Active</td> : <td>Closed</td>}
                    <td>{poll.name}</td>
                    <td>{poll.dateCreated.slice(0, 10)}</td>
                    <td>{poll.voters || 0}</td>
                    <td>{poll.options.length}</td>
                  </tr>
                );
              })}
            </Fragment>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
