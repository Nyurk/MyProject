import React from 'react';
import { observer } from 'mobx-react-lite';

import Header from '../Header';
import { sessionStore } from '../../stores';

const UserPage = () => {
  const { sessionUser } = sessionStore;
  console.log(sessionUser);

  return (
    <>
      <Header />
      <div>text</div>
    </>
  );
};

export default observer(UserPage);
