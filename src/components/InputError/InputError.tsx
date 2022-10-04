import React from 'react';
import cn from 'classnames';

import styles from './InputError.module.scss';

interface IPropsInputError {
  className?: string;
  children: React.ReactNode;
}

const InputError: React.FC<IPropsInputError> = (props) => {
  const { className, children } = props;

  const classes = React.useMemo(() => {
    return cn(styles.container, className);
  }, [className]);

  return <div className={classes}>{children}</div>;
};

export default InputError;
