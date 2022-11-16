import React from 'react';
import classNames from 'classnames/bind';
import styles from './Logo.module.scss';

const cx = classNames.bind(styles);

export default function Logo() {
    const logo = require('~/assets/images/logo.webp');
    return <img className={cx('logo')} src={logo} alt="" />;
}
