import React from 'react';
import classNames from 'classnames/bind';
import styles from './Logo.module.scss';

const cx = classNames.bind(styles);

export default function Logo({ className }) {
    const logo = require('~/assets/images/logo.webp');
    return <img className={cx('logo', { [className]: className })} src={logo} alt="" />;
}
