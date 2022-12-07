import React from 'react';
import { getToLocalStorage } from '~/utils/saveToBrowser';

import classNames from 'classnames/bind';
import styles from './Info.module.scss';
import Avatar from '~/components/Avatar/Avatar';
import Label from '~/components/Label/Label';
import Button from '~/components/Button/Button';
import { checkIn, logout } from '~/services/users';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Info = () => {
    const user = getToLocalStorage('user');
    const navigate = useNavigate();
    const from = '/';

    const handleLogout = () => {
        logout();
        navigate(from, { replace: true });
    };

    const handleCheckIn = () => {
        checkIn();
    };

    const handleChangeAvatar = () => {};

    return (
        <div className={cx('container')}>
            <div className={cx('main')}>
                <div className={cx('main-avatar')}>
                    <Avatar big setting onClick={handleChangeAvatar} />
                    <span className={cx('check-in', { checkIn: true })}> Đã check in </span>
                </div>
                <div className={cx('main-info')}>
                    <div className={cx('main-info-title')}>Profile</div>
                    <div className={cx('main-info-content')}>
                        <Label title={'Tên đầy đủ'}>{user?.username}</Label>
                        <Label title={'Email'}>{user?.email}</Label>
                        <Label title={'Số điện thoại'}>{user?.phone}</Label>
                        <Label title={'Công việc'}>{user?.des}</Label>
                    </div>
                </div>
            </div>
            <div className={cx('sub')}>
                <Button onClick={handleLogout} variant={'outline'} className={cx('sub-log')}>
                    Log out
                </Button>
                <Button onClick={handleCheckIn} variant={'normal'} className={cx('sub-check')}>
                    Check In
                </Button>
            </div>
        </div>
    );
};

export default Info;
