import { useContext } from 'react';
import { PollsContext } from '../context/PollsContext';

const usePolls = () => {
  const { myPolls, setMyPolls } = useContext(PollsContext);
  return { myPolls, setMyPolls };
};

export default usePolls;
