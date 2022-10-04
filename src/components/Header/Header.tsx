import React from 'react';
import { observer } from 'mobx-react-lite';

import styles from './Header.module.scss';
import image from '../../assets/images/logo.png';
import { sessionStore } from '../../stores';
import Avatar from '../Avatar';

const Header: React.FC = () => {
  const { sessionUser } = sessionStore;

  const handleLogout = React.useCallback(() => {
    sessionStore.logout();
  }, []);

  return (
    <header className={styles.container}>
      <span className={styles.logo}>
        <img alt="logo" src={image} />
      </span>
      {sessionUser && (
        <div className={styles.panel}>
          <Avatar firstName={sessionUser.firstName} lastName={sessionUser.lastName} />
          <button type="button" className={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default observer(Header);
