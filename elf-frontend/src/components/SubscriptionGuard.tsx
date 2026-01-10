import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const SubscriptionGuard: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  
  // In a real app, you'd check this from your AuthContext or a Redux store
  // For now, we'll check a 'is_subscribed' flag in localStorage
  const isSubscribed = localStorage.getItem('is_subscribed') === 'true';

  if (!isSubscribed) {
    // Redirect to subscribe but save the location they were trying to go to
    return <Navigate to="/subscribe" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default SubscriptionGuard;