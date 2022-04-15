import React, { useContext } from 'react';
import useAuth from '../hooks/useAuth';

const FooterLinks = () => {
  const { username } = useAuth();
  return <div>{`${username}'s profile`}</div>;
};

export default FooterLinks;
