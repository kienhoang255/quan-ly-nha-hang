import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './IconNotification.module.scss';
import { GoPrimitiveDot } from 'react-icons/go';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

const IconNotification = ({ icon, data }) => {
    const [isWarn, setIsWarn] = useState(true);
    const tippyContent = (
        <div>
            <div>
                <div>title</div>
                <div>
                    content <span>20.20</span>
                </div>
            </div>
        </div>
    );

    useEffect(() => {
        setIsWarn(true);
    }, [data]);

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
