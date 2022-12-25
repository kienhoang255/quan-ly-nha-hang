import React from 'react';
import classNames from 'classnames/bind';
import styles from './SelectButton.module.scss';

const cx = classNames.bind(styles);

const SelectButton = ({ title, name, type = 'radio', className, id, value, ...props }) => {
    return (
        <div className={cx('content', { [className]: className })}>
            <input type={type} id={id} name={name} defaultValue={value} className={cx('rad-btn')} {...props} />
            <label htmlFor={id} className={cx('title')}>
                {title}
            </label>
        </div>
    );
};

export default SelectButton;
