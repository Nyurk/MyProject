import React from 'react';
import ReactSelect from 'react-select';

interface ISelectProps {
  options: IInputOption[];
  onChange: (value: Maybe<IInputOption>) => void;
  value: Maybe<IInputOption>;
}

const Select: React.FC<ISelectProps> = (props) => {
  const { options, value, onChange } = props;

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

  return <ReactSelect styles={selectStyles} value={value} options={options} onChange={onChange} />;
};
export default React.memo(Select);
