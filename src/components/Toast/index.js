import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

import { AiFillCheckCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { RiErrorWarningFill } from 'react-icons/ri';

const cx = classNames.bind(styles);

const Toast = ({ trigger, message, placement = 'top-mid', duration = 3000, type = 'success' }) => {
    // const [isTrigger, setIsTrigger] = useState(true);
    const icon = [
        {
            name: 'success',
            icon: <AiFillCheckCircle />,
        },
        {
            name: 'warning',
            icon: <RiErrorWarningFill />,
        },
        {
            name: 'loading',
            icon: <AiOutlineLoading3Quarters />,
        },
        {
            name: 'info',
            icon: <BsFillInfoCircleFill />,
        },
        {
            name: 'error',
            icon: <IoCloseCircleSharp />,
        },
    ];

    // setTimeout(() => {
    // setIsTrigger(false);
    // }, duration);

    const iconSelect = icon.filter((icon) => icon.name === type);
    const classes = cx('content', placement, type);
    const classIcon = cx('icon', type);

    return (
        <>
            {/* {isTrigger && ( */}
            <div className={classes}>
                <span className={cx('blank', type, placement)}></span>
                <span className={classIcon}>{iconSelect[0].icon}</span>
                <p className={cx('message')}>{message}</p>
            </div>
            {/* )} */}
        </>
    );
};

export default Toast;
