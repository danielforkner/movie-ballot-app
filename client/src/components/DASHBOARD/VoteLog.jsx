import { Modal } from 'react-bootstrap';
import React, { Fragment } from 'react';

const VoteLog = ({ option, showLog, setShowLog }) => {
  const handleClose = () => setShowLog(false);
  const keys = Object.keys(option.log);
  console.log(option.log);
  return (
    <Modal show={showLog} onHide={handleClose}>
      <header className="modal-header border-bottom-0">
        <h2 className="fw-bold mb-0">{`Event Log for ${option.name}`}</h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </header>
      <div className="modal-body">
        <div className="card">
          {keys.map((round, i) => {
            return (
              <Fragment key={`${option.name}:round:${i}`}>
                <div className="card-header">{`Round ${round}`}</div>
                <ul className="list-group list-group-flush">
                  {option.log[round].map((item, i) => {
                    return <li className="list-group-item">{item}</li>;
                  })}
                </ul>
              </Fragment>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default VoteLog;
