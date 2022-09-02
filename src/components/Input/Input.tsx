import React from 'react';
import cn from 'classnames';

import styles from './Input.module.scss';
import InputError from '../InputError';

interface IInputProps {
  label?: string;
  name: string;
  type?: 'text' | 'tel' | 'email' | 'password';
  value?: string;
  error?: string;
  onChange: (string) => void;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { name, label, className, value = '', type = 'text', error, onChange } = props;

  const classes = React.useMemo(() => {
    return cn(styles.container, className);
  }, [className]);

  return (
    <label htmlFor={name} className={classes}>
      {!!label && <div className={styles.label}>{label}</div>}

      <input
        id={name}
        type={type}
        className={styles.input}
        ref={ref}
        name={name}
        value={value}
        onChange={onChange}
      />

      {!!error && <InputError>{error}</InputError>}
    </label>
  );
});

export default Input;
