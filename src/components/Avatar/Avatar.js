import React from 'react';
import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
const cx = classNames.bind(styles);

const Avatar = ({ img, big, setting, onClick }) => {
    const imgNull = require('~/assets/images/avatar-null.png');
    return (
        <span className={cx('content', { setting })}>
            <img src={img ? img : imgNull} alt="" className={cx('avatar-circle', { big })} onClick={onClick} />
        </span>
    );
};

export default Avatar;
