import React from 'react';

import styles from './InputError.module.scss';

interface IPropsInputError {
  children: React.ReactNode;
}

const InputError: React.FC<IPropsInputError> = (props) => {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
};

export default InputError;
