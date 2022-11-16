import React from 'react';
import classNames from 'classnames/bind';
import styles from './Test.module.scss';

const cx = classNames.bind(styles);

export default function Test() {
    return <div className={cx('content')}>TEST</div>;
}
