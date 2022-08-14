import Button from '../Button/Button';
import styles from '../App/App.module.scss';

const App = () => {
    return (
        <>
            <Button>text</Button>
            <Button className={styles.secondary}>text</Button>
            <Button className={styles.dark}>text</Button>
            <Button disabled>text</Button>
            <a href="http://google.com">link</a>
        </>
    )

};

export default App;