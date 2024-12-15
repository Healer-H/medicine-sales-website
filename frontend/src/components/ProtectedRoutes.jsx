// components/ProtectedRoutes.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoutes = () => {
  const accessToken = Cookies.get('access_token');

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;