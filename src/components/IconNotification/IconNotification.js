import React, { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './IconNotification.module.scss';
import { GoPrimitiveDot } from 'react-icons/go';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

const IconNotification = ({ icon, data }) => {
    const [isWarn, setIsWarn] = useState(true);
    const tippyContent = (
        <div className={cx('tippy')}>
            {data?.map((tippy, index) => {
                return (
                    <div key={index}>
                        <div className={cx('tippy-title')}>{tippy?.title}</div>
                        <div className={cx('tippy-content')}>
                            <span className={cx('tippy-content-main')}>{tippy?.main}</span>
                            <span className={cx('tippy-content-time')}>{tippy?.time}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    useCallback(() => {
        setIsWarn(true);
    }, []);

    const handleOnLooking = () => {
        setIsWarn(false);
    };

    return (
        <>
            <Tippy trigger="click" content={tippyContent}>
                <div className={cx('content')} onClick={handleOnLooking}>
                    {isWarn && (
                        <div className={cx('dot')}>
                            <GoPrimitiveDot />
                        </div>
                    )}
                    <div className={cx('icon')}>{icon}</div>
                </div>
            </Tippy>
        </>
    );
};

export default IconNotification;
