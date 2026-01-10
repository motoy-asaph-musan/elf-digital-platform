import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const AdminRoute = ({ children }: { children: ReactNode }) => {
  const user = JSON.parse(localStorage.getItem('user_profile') || '{}');
  
  if (user.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};