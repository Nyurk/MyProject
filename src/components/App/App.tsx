import React, { useState } from 'react';

import Button from '../Button';
import styles from './App.module.scss';
import Input from '../Input';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [textarea, setTextarea] = useState<string>('');

  const handleChangeInput = (value) => {
    setInputValue(value);
  };

  const handleChangeTextarea = (value) => {
    setTextarea(value);
  };

  return (
    <>
      <Button>text</Button>
      <Button className={styles.secondary}>text</Button>
      <Button className={styles.dark}>text</Button>
      <Button disabled>text</Button>
      <Input value={inputValue} onChange={handleChangeInput} />
      <Input textarea value={textarea} onChange={handleChangeTextarea} />
    </>
  );
};

export default App;
