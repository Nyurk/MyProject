import React from 'react';

import styles from './Avatar.module.scss';
import getFirstLetters from '../../helpers/getFirstLetters';

interface IAvatarProps {
  firstName: string;
  lastName: string;
  avatarImage?: string;
}

const Avatar: React.FC<IAvatarProps> = (props) => {
  const { avatarImage, firstName, lastName } = props;

  return (
    <div className={styles.container}>
      <div className={styles.photo}>
        {avatarImage ? (
          <img alt="avatar" src={avatarImage} />
        ) : (
          <span className={styles.initials}>{getFirstLetters(firstName, lastName)}</span>
        )}
      </div>
      <span>{`Hello, ${firstName} ${lastName} !`}</span>
    </div>
  );
};

export default Avatar;
