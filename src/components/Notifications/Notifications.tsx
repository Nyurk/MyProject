import React from 'react';
import { observer } from 'mobx-react-lite';

import { notificationStore } from '../../stores';
import styles from './Notifications.module.scss';
import Notification from '../Notification';

const Notifications: React.FC = () => {
  const { messages } = notificationStore;

  const handleCloseNotification = (removeId) => {
    notificationStore.removeMessage(removeId);
  };

  return (
    <div className={styles.container}>
      {messages.map((message) => {
        return (
          <Notification
            key={message.id}
            type={message.type}
            text={message.text}
            id={message.id}
            onClick={handleCloseNotification}
          />
        );
      })}
    </div>
  );
};

export default observer(Notifications);
