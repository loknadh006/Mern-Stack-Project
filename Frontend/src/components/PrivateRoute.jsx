import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenValid, logout, getUser } from '../utils/auth';

// Protects routes for authenticated users and checks token expiry
export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;

  if (!isTokenValid(token)) {
    // token expired or invalid — cleanup and redirect to login
    logout();
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Protects routes for admin users only
export const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;

  if (!isTokenValid(token)) {
    logout();
    return <Navigate to="/login" replace />;
  }

  const user = getUser();
  if (!user) {
    logout();
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
};

export default PrivateRoute;
