import React from 'react';

import styles from './Checkbox.module.scss';

interface ICheckbox {
  label: string;
  checked: boolean;
  id: string;
  onChange : (value: boolean) => void;
}

const Checkbox: React.FC<ICheckbox> = (props) => {
  const { label, checked, id, onChange } = props;

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label htmlFor={id} className={styles.container}>
      {label}
      <input type="checkbox" checked={checked} id={id} onChange={handleCheckbox} />
      <span className={styles.checkmark} />
    </label>
  );
};

export default Checkbox;
