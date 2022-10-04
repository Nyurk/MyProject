import React from 'react';
import { Navigate, Route } from 'react-router-dom';

interface IProtectedRouteProps {
  allowed: boolean;
  redirectPath: string;
  path: string;
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = (props) => {
  const { allowed, redirectPath, path, element } = props;

  if (!allowed) {
    return <Navigate to={redirectPath} />;
  }

  return <Route path={path} element={element} />;
};

export default ProtectedRoute;
