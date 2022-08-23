import React from 'react';

import Button from '../Button';
import Input from '../Input';
import RadioGroup from '../RadioGroup';
import Checkbox from '../Checkbox';
import Select from '../Select';
import styles from './App.module.scss';

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
  const [inputValue, setInputValue] = React.useState<string>('');

  const [textarea, setTextarea] = React.useState<string>('');

  const [radio, setRadio] = React.useState<string>(options[0].value);

  const [checked, setChecked] = React.useState<boolean>(false);

  const [selectValue, setSelectValue] = React.useState<Maybe<IInputOption>>(null);

  const handleChangeInput = (value: string) => {
    setInputValue(value);
  };

  const handleChangeTextarea = (value: string) => {
    setTextarea(value);
  };

  const handleRadioChange = (value: string) => {
    setRadio(value);
  };

  const handleCheckboxChange = (value: boolean) => {
    setChecked(value);
  };

  const handleSelectChange = (value: Maybe<IInputOption>) => {
    setSelectValue(value);
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

      <Checkbox checked={checked} id="checkbox" label="test" onChange={handleCheckboxChange} />

      <Select value={selectValue} options={options} onChange={handleSelectChange} />
    </>
  );
};

export default App;
