import React from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';

import ROUTES from '../../constants/routes';
import { sessionStore } from '../../stores';
import LoginForm from '../LoginForm/LoginForm';
import UserForm from '../UserForm/UserForm';
import Notifications from '../Notifications/Notifications';
import UserPage from '../UserPage/UserPage';

const PrivateRoute = observer(() => {
  const { sessionUser } = sessionStore;

  if (!sessionUser) {
    return <Navigate to={`/${ROUTES.public}`} />;
  }

  return (
    <div>
      <UserPage />

      <Outlet />
    </div>
  );
});

const PublicRoute = observer(() => {
  const { sessionUser } = sessionStore;

  if (sessionUser) {
    return <Navigate to={`/${ROUTES.private}`} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
});

const App: React.FC = () => {
  return (
    <>
      <Notifications />

      <Routes>
        <Route path={ROUTES.private} element={<PrivateRoute />}>
          <Route index element={null} />

          <Route path="*" element={<Navigate to={ROUTES.index} replace />} />
        </Route>

        <Route path={ROUTES.public} element={<PublicRoute />}>
          <Route index element={<LoginForm />} />

          <Route path={ROUTES.register} element={<UserForm />} />

          <Route path="*" element={<Navigate to={ROUTES.index} replace />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.public} replace />} />
      </Routes>
    </>
  );
};

export default observer(App);
