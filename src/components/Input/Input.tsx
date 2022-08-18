import React, { ChangeEvent } from 'react';

import styles from './Input.module.scss';

interface IInputProps {
  type?: 'text' | 'tel' | 'email' | 'password';
  value?: string;
  textarea?: boolean;
  onChange: (string) => void;
}

const Input: React.FC<IInputProps> = (props) => {
  const { value, type = 'text', textarea, onChange } = props;

  const handleChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return textarea ? (
    <input value={value} type={type} className={styles.container} onChange={handleChange} />
  ) : (
    <textarea className={styles.textarea} onChange={handleChange}>
      {value}
    </textarea>
  );
};

export default Input;
