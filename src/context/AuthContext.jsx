import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id: 'PN-1234', name: 'John Doe', phone: '1234567890', isVerified: true, role: 'user' }

  const login = (userData) => {
    // Generate PlayNow ID if new
    const playNowId = userData.id || `PN-${Math.floor(1000 + Math.random() * 9000)}`;
    setUser({ ...userData, id: playNowId, isVerified: true });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
