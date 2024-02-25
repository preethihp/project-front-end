// Logout.js
import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

function Logout() {
  const { logout } = useAuth();
  logout();

  return <Navigate to="/" replace />;
}

export default Logout;
