import React from 'react';

import styles from './RadioGroup.module.scss';

interface IRadioGroup {
  options: IInputOption[];
  selected: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<IRadioGroup> = (props) => {
  const { options, selected, onChange } = props;

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div>
      {
        options.map(({ label, value }) => {
          return (
            <div key={value}>
              <label htmlFor={value} className={styles.container}>
                {label}
                <input
                  className={styles.container}
                  type="radio"
                  name={value}
                  id={value}
                  value={value}
                  checked={selected === value}
                  onChange={handleChange}
                />
                <span className={styles.checkmark} />
              </label>
            </div>
          );
        })
      }
    </div>
  );
};

export default RadioGroup;
