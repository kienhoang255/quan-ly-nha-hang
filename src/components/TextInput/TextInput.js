import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TextInput.module.scss';
import PopUp from '../PopUp/PopUp';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const cx = classNames.bind(styles);

export default function TextInput({
    name,
    type,
    title,
    onClick,
    className,
    notify,
    warn,
    danger,
    required,
    value,
    placeholder,
    LeftIcon,
    RightIcon,
    ...passProps
}) {
    const icon = {
        close: <BsFillEyeSlashFill />,
        open: <BsFillEyeFill />,
    };

    const [isClose, setIsClose] = useState(true);

    const props = {
        onClick,
        ...passProps,
    };

    const classes = cx('container', {
        [className]: className,
    });

    const handleOpenPassword = () => {
        setIsClose(!isClose);
    };

    const password = (
        <div className={classes} {...props}>
            {title && <div className={cx('title')}>{title}</div>}
            <PopUp notify={notify} warn={warn} danger={danger}>
                <div className={cx('content')}>
                    <input
                        className={cx('input-text')}
                        type={isClose ? 'password' : 'text'}
                        name={name}
                        id={name}
                        placeholder={placeholder}
                        required={required}
                    />
                    <div className={cx('rightIcon')} onClick={handleOpenPassword}>
                        {isClose ? icon.close : icon.open}
                    </div>
                </div>
            </PopUp>
        </div>
    );

    return (
        <>
            {type !== 'password' ? (
                <div className={classes} {...props}>
                    {title && <div className={cx('title')}>{title}</div>}
                    <PopUp notify={notify} warn={warn} danger={danger}>
                        <div className={cx('content')}>
                            <div className={cx('leftIcon')}>{LeftIcon}</div>
                            <input
                                className={cx('input-text')}
                                type={type}
                                name={name}
                                id={name}
                                placeholder={placeholder}
                                required={required}
                            />
                            <div className={cx('rightIcon')}>{RightIcon}</div>
                        </div>
                    </PopUp>
                </div>
            ) : (
                password
            )}
        </>
    );
}
