import cn from 'classnames';

import styles from './Button.module.scss';
import {useMemo} from "react";

const Button = (props) => {
    const{children, className, disabled, onClick} = props;

    const classes = useMemo(() => cn(
        styles.container,
        {
            [styles.disabled]: disabled,
        },
        className,
    ), [className,disabled]);

    return <button className={classes} disabled={disabled} onClick={onClick}>{children}</button>
};

export default Button;