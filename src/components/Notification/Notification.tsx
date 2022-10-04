import React from 'react';
import cn from 'classnames';

import styles from './Notification.module.scss';
import { NotificationType } from '../../stores/NotificationStore';
import FontIcon from '../FontIcon/FontIcon';

interface INotificationProps {
  type: NotificationType;
  text: string;
  id: string;
  onClick: any;
}

const Notification: React.FC<INotificationProps> = (props) => {
  const { type, text, id, onClick } = props;

  const classes = cn(styles.container, {
    [styles.success]: type === NotificationType.Success,
    [styles.danger]: type === NotificationType.Danger,
    [styles.warning]: type === NotificationType.Warning,
    [styles.info]: type === NotificationType.Info,
  });

  const handleOnClick = () => {
    onClick(id);
  };

  return (
    <div className={classes}>
      <div className={styles.content}>{text}</div>

      <button type="button" className={styles.close} onClick={handleOnClick}>
        <FontIcon name="cross" />
      </button>
    </div>
  );
};

export default React.memo(Notification);
