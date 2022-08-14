import React, { useMemo } from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

function Button(props) {
  const { children, className, disabled, onClick } = props;

  const classes = useMemo(
    () =>
      cn(
        styles.container,
        {
          [styles.disabled]: disabled,
        },
        className,
      ),
    [className, disabled],
  );

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
