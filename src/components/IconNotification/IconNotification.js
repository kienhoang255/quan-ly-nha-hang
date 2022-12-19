import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './IconNotification.module.scss';
import { GoPrimitiveDot } from 'react-icons/go';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

const IconNotification = ({ icon, data }) => {
    const [isWarn, setIsWarn] = useState(false);
    const tippyContent = (
        <div className={cx('tippy')}>
            {data.length !== 0 ? (
                data?.map((e, index) => {
                    return (
                        <div key={index} className={cx('main')}>
                            <div className={cx('tippy-title')}>Mới</div>
                            <div className={cx('tippy-content')}>
                                <span className={cx('tippy-content-food')}>
                                    Món <span className={cx('main-title')}>{e?.nameFood}</span>
                                </span>
                                <span className={cx('tippy-content-table')}>
                                    Bàn <span className={cx('main-title')}>{e?.nameTable}</span>
                                </span>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div>Trống</div>
            )}
        </div>
    );

    useEffect(() => {
        if (data.length !== 0) {
            setIsWarn(true);
        }
    }, [data]);

    const handleOnLooking = () => {
        setIsWarn(false);
    };

    return (
        <Tippy trigger="click" content={tippyContent} placement="bottom-end">
            <div className={cx('content')} onClick={handleOnLooking}>
                {isWarn && (
                    <div className={cx('dot')}>
                        <GoPrimitiveDot />
                    </div>
                )}
                <div className={cx('icon')}>{icon}</div>
            </div>
        </Tippy>
    );
};

export default IconNotification;
