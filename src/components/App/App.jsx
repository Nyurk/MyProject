import React from 'react';

import Button from '../Button';
import styles from './App.module.scss';

function App() {
  return (
    <>
      <Button>text</Button>
      <Button className={styles.secondary}>text</Button>
      <Button className={styles.dark}>text</Button>
      <Button disabled>text</Button>
    </>
  );
}

export default App;
