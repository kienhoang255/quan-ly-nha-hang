import React from 'react';
import classNames from 'classnames/bind';
import styles from './ButtonInputw.module.scss';

const cx = classNames.bind(styles);

export default function ButtonInput({
    value,
    onClick,
    className,
    variant = 'normal',
    type = 'submit',
    onChange,
    full,
    zoom,
    active,
    disable,
    ...passProps
}) {
    const props = {
        onClick,
        ...passProps,
    };

    const variantMode = ['outline', 'normal', 'none'];
    const getVariant = () => variantMode.filter((e) => e === variant).toString();

    const classes = cx('content', getVariant(), { [className]: className, full, zoom, active, disable });

    return (
        <>
            {type === 'file' ? (
                <div className={classes}>
                    <label htmlFor="avatar">{value}</label>
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        {...props}
                        style={{ display: 'none' }}
                        onChange={onChange}
                    />
                </div>
            ) : (
                <input type={type} className={classes} value={value} {...props} />
            )}
        </>
    );
}
