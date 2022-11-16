import React from 'react';
import classNames from 'classnames/bind';
import styles from './ButtonInputw.module.scss';

const cx = classNames.bind(styles);

export default function ButtonInput({ value, onClick, className, type = 'submit', ...passProps }) {
    const props = {
        onClick,
        ...passProps,
    };

    const classes = cx('container', {
        [className]: className,
    });

    return <input type={type} className={classes} value={value} {...props} />;
}
