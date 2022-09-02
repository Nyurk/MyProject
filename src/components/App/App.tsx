import React from 'react';
import { observer } from 'mobx-react-lite';

import { usersStore } from '../../stores';
import UserForm from '../UserForm/UserForm';
import Button from '../Button';

const App: React.FC = () => {
  const { loadingUsers, users } = usersStore;

  return loadingUsers ? (
    <div>Loading...</div>
  ) : (
    <>
      {users.map((user) => {
        return (
          <div key={user.id}>
            {user.firstName}
            {user.lastName}
            <Button onClick={() => usersStore.deleteUser(user.id)}>Удалить пользователя</Button>
          </div>
        );
      })}

      <UserForm />
    </>
  );
};

export default observer(App);
