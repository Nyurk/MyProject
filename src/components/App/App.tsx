import React, { useState } from 'react';

import Button from '../Button';
import styles from './App.module.scss';
import Input from '../Input';
import RadioGroup from '../RadioGroup';

const options = [
  {
    label: 'text1',
    value: 'text1',
  },
  {
    label: 'text2',
    value: 'text2',
  },
  {
    label: 'text3',
    value: 'text3',
  },
];

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const [textarea, setTextarea] = useState<string>('');

  const [radio, setRadio] = useState<string>(options[0].value);

  const handleChangeInput = (value: string) => {
    setInputValue(value);
  };

  const handleChangeTextarea = (value: string) => {
    setTextarea(value);
  };

  const handleRadioChange = (value: string) => {
    setRadio(value);
  };

  return (
    <>
      <Button>text</Button>

      <Button className={styles.secondary}>text</Button>

      <Button className={styles.dark}>text</Button>

      <Button disabled>text</Button>

      <Input value={inputValue} onChange={handleChangeInput} />

      <Input textarea value={textarea} onChange={handleChangeTextarea} />

      <RadioGroup options={options} selected={radio} onChange={handleRadioChange} />
    </>
  );
};

export default App;
