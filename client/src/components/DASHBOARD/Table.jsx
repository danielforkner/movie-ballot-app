import React, { Fragment } from 'react';

const Table = ({ pollList, setCurrentPoll }) => {
  return (
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
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
                if (!poll.active) return null;
                return (
                  <tr
                    className="tableSelectRow"
                    onClick={() => setCurrentPoll(poll)}
                  >
                    <td>{poll.id}</td>
                    <td>{poll.name}</td>
                    <td>{poll.dateCreated.slice(0, 10)}</td>
                    <td>{poll.voters}</td>
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
