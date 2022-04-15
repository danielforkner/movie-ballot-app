import React, { useState } from 'react';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('Guest');

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
