import React from 'react';
import classNames from 'classnames/bind';
import styles from './MenuLayout.module.scss';

import { IoMdArrowRoundBack } from 'react-icons/io';
import Avatar from '~/components/Avatar/Avatar';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const MenuLayout = ({ title, children, className, nameClient, onClickBack }) => {
    return (
        <div className={cx('container')}>
            <div className={cx('title')}>
                <Link to="/list-table" className={cx('back-btn')} onClick={onClickBack}>
                    <IoMdArrowRoundBack />
                </Link>
                <span className={cx('main-title')}>{title}</span>
                <Avatar useName name={nameClient} />
            </div>

            <div className={cx('content', { [className]: className })}>{children}</div>
        </div>
    );
};

export default MenuLayout;
