import React from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

interface IButtonProps {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<React.PropsWithChildren<IButtonProps>> = (props) => {
  const { type = 'button', className, disabled, children, onClick } = props;

  const classes = React.useMemo<string>(() => {
    return cn(
      styles.container,
      {
        [styles.disabled]: disabled,
      },
      className,
    );
  }, [className, disabled]);

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
