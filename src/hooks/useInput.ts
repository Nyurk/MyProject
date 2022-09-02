import React from 'react';

interface IUseInputResponse {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useInput = (initialValue = ''): IUseInputResponse => {
  const [value, setValue] = React.useState<string>(initialValue);

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return {
    value,
    handleChange,
  };
};

export default useInput;
