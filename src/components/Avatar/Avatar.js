import React from 'react';
import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
import Loading from '../Loading/Loading';
const cx = classNames.bind(styles);

const Avatar = ({ img, big, normal, setting, useName = false, name, onClick }) => {
    const imgNull = require('~/assets/images/avatar-null.png');
    return (
        <span className={cx('content', { setting })}>
            {useName ? <span className={cx('name')}>{name ? name : <Loading />}</span> : ''}
            <img src={img ? img : imgNull} alt="" className={cx('avatar-circle', { big, normal })} onClick={onClick} />
        </span>
    );
};

export default Avatar;
