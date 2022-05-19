const axios = require('axios');

// database variables
const DB_URL = '/api';

// FETCH FROM OUR DATABASE
export const loginUser = async (username, password) => {
  try {
    const { data } = await axios.post(`${DB_URL}/users/login`, {
      username,
      password,
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerUser = async (username, password) => {
  try {
    const { data } = await axios.post(`${DB_URL}/users/register`, {
      username,
      password,
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getMe = async (token) => {
  try {
    const { data } = await axios.get(`${DB_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchPollById = async (pollId) => {
  try {
    const { data } = await axios.get(`${DB_URL}/polls/poll/${pollId}`);

    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchMyPolls = async (token) => {
  try {
    const { data } = await axios.get(`${DB_URL}/polls/myPolls`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchMovies = async (title, year) => {
  try {
    const response = await axios.get(`${DB_URL}/movies/${title}&${year}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addMovieToOption = async (token, title, year, optionId) => {
  try {
    const { data } = await axios.patch(
      `${DB_URL}/polls/options/addMovie`,
      { title, year, optionId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const activatePoll = async (token, pollId) => {
  try {
    const { data } = await axios.patch(
      `${DB_URL}/polls/activate`,
      { pollId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const removeMovieFromOption = async (token, title, optionId) => {
  try {
    const { data } = await axios.delete(`${DB_URL}/polls/options/removeMovie`, {
      data: {
        title,
        optionId,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchCreateNewPoll = async (token, pollName, authorID) => {
  try {
    const { data } = await axios.post(
      `${DB_URL}/polls/newPoll`,
      {
        pollName,
        authorID,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchDeletePoll = async (token, pollId) => {
  try {
    const { data } = await axios.delete(`${DB_URL}/polls/deletePoll`, {
      data: {
        pollId,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteOption = async (token, optionId) => {
  try {
    const { data } = await axios.delete(`${DB_URL}/polls/deleteOption`, {
      data: {
        optionId,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchCreateNewOption = async (token, optionName, pollId) => {
  try {
    const { data } = await axios.post(
      `${DB_URL}/polls/newOption`,
      {
        optionName,
        pollId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const castVote = async (rankList, pollId) => {
  try {
    const { data } = await axios.post(`${DB_URL}/polls/castVote`, {
      rankList,
      pollId,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchCalculateVotes = async (token, pollId) => {
  try {
    const { data } = await axios.get(
      `${DB_URL}/polls/calculateVotes/${pollId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};
