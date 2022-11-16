import React from 'react';
import classNames from 'classnames/bind';
import styles from './Label.module.scss';

const cx = classNames.bind(styles);

const Label = ({ children, title }) => {
    return (
        <div className={cx('content')}>
            <div className={cx('title')}>{title}</div>
            <span className={cx('child')}>{children}</span>
        </div>
    );
};

export default Label;
