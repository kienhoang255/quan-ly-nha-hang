import React from 'react';
import classNames from 'classnames/bind';
import styles from './ButtonInputw.module.scss';

const cx = classNames.bind(styles);

export default function ButtonInput({ value, onClick, className, type = 'submit', ...passProps }) {
    const props = {
        onClick,
        ...passProps,
    };

    const classes = cx('container', {
        [className]: className,
    });

    return (
        <>
            {type === 'file' ? (
                <div className={classes}>
                    <span for="avatar">{value}</span>
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/png, image/jpeg"
                        {...props}
                        style={{ display: 'none' }}
                    />
                </div>
            ) : (
                <input type={type} className={classes} value={value} {...props} />
            )}
        </>
    );
}
