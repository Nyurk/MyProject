import React from 'react';
import cn from 'classnames';
import ReactSelect from 'react-select';

import InputError from '../InputError';
import styles from './Select.module.scss';

interface ISelectProps {
  options: IInputOption[];
  onChange: (value: Maybe<IInputOption>) => void;
  value: Maybe<IInputOption>;
  error?: string;
  label: string;
  className?: string;
}

const selectStyles = {
  indicatorSeparator: (baseStyles) => {
    return {
      ...baseStyles,
      background: '#acc4d2',
      width: '2px',
      margin: '0',
    };
  },
  control: (baseStyles) => {
    return {
      ...baseStyles,
      borderColor: '#acc4d2',
      borderWidth: '2px',
      ':hover': {
        borderColor: '#284f65',
        boxShadow: 'none',
      },
    };
  },
  dropdownIndicator: (baseStyles) => {
    return {
      ...baseStyles,
      color: '#acc4d2',
    };
  },
};

const Select = React.forwardRef<any, ISelectProps>((props, ref) => {
  const { options, label, value, error, className, onChange } = props;

  const classes = React.useMemo<string>(() => {
    return cn(styles.container, className);
  }, [className]);

  return (
    <div className={classes}>
      <div className={styles.label}>{label}</div>

      <ReactSelect
        ref={ref}
        styles={selectStyles}
        value={value}
        options={options}
        onChange={onChange}
      />

      {!!error && <InputError>{error}</InputError>}
    </div>
  );
});

export default React.memo(Select);
