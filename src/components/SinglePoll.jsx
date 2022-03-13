import React, { Fragment, useState } from 'react';
import { fetchMovies } from '../api/fetch';
import Option from './Option';

const SinglePoll = ({ currentPoll }) => {


  return (
    <Fragment>
      <h1>
        {currentPoll.name}: #{currentPoll.id}
      </h1>

      <Option />


      
    </Fragment>
  );
};

export default SinglePoll;
