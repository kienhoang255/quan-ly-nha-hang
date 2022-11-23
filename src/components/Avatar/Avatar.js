import React from 'react';
import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
const cx = classNames.bind(styles);

const Avatar = ({ img, big, normal, setting, name, onClick }) => {
    const imgNull = require('~/assets/images/avatar-null.png');
    return (
        <span className={cx('content', { setting })}>
            {name && <span className={cx('name')}>{name}</span>}
            <img src={img ? img : imgNull} alt="" className={cx('avatar-circle', { big, normal })} onClick={onClick} />
        </span>
    );
};

export default Avatar;
