import React from 'react';
import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

const Loading = ({ color }) => {
    return (
        <div className={cx('content')}>
            <div className={cx('main')}>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;
