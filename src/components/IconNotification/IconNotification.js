import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './IconNotification.module.scss';
import { GoPrimitiveDot } from 'react-icons/go';
import Tippy from '@tippyjs/react';
import Button from '../Button/Button';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import moment from 'moment';

const cx = classNames.bind(styles);

const IconNotification = ({ icon, data, handleCheckIconNotification }) => {
    const [isWarn, setIsWarn] = useState(false);
    const tippyContent = (
        <div className={cx('tippy')}>
            {data.length !== 0 ? (
                data
                    ?.sort((a, b) => moment(a.time).format('HH:mm:ss').localeCompare(moment(b.time).format('HH:mm:ss')))
                    .reverse()
                    .map((e, index) => {
                        return (
                            <div key={index} className={cx('main')}>
                                <div className={cx('tippy-title')}>
                                    <span>Mới</span> <span>{moment(e?.time).format('HH:mm:ss')}</span>
                                </div>
                                <div className={cx('tippy-content')}>
                                    <span className={cx('tippy-content-food')}>
                                        Món <span className={cx('main-title')}>{e?.nameFood}</span>
                                    </span>
                                    <span className={cx('tippy-content-table')}>
                                        Bàn <span className={cx('main-title')}>{e?.nameTable}</span>
                                    </span>
                                    <Button
                                        variant="none"
                                        className={cx('tippy-content-btn')}
                                        onClick={() => handleCheckIconNotification(e)}
                                    >
                                        <AiOutlineCheckCircle />
                                    </Button>
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
        <Tippy trigger="click" content={tippyContent} interactive={true} placement="bottom-end">
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
