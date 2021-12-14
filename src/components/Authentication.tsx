import { Navigate } from 'react-router-dom';

import { useUserAuth } from '../hooks/useAuthorization';

export const PrivateRoute = ({ children }) => {
  const { isUserLoggedIn } = useUserAuth();

  if (isUserLoggedIn === undefined) {
    return 'loading...';
  }

  return isUserLoggedIn ? children : <Navigate to="/login" />;
};
