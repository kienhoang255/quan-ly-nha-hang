import React from 'react';
import classNames from 'classnames/bind';
import styles from './ContentLayout.module.scss';

const cx = classNames.bind(styles);

const ContentLayout = ({ title, children, className }) => {
    return (
        <div className={cx('container')}>
            <div className={cx('title')}>
                <span>{title}</span>
            </div>

            <div className={cx('content', { [className]: className })}>{children}</div>
        </div>
    );
};

export default ContentLayout;
