import React from 'react';
import StaffLayout from '~/layout/StaffLayout/StaffLayout';
import { removeItemFromLS, setToLocalStorage } from '~/utils/saveToBrowser';

import classNames from 'classnames/bind';
import styles from './Info.module.scss';
import Avatar from '~/components/Avatar/Avatar';
import TextInput from '~/components/TextInput/TextInput';
import Label from '~/components/Label/Label';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

const Info = () => {
    const handleOnClick = () => {
        setToLocalStorage('role', 'staff');
    };

    const handleOnRemove = () => {
        removeItemFromLS('role');
    };

    const handleLogout = () => {
        // logout function
    };

    const handleCheckIn = () => {
        //khi nhan vien login se day nhan vien vao trang check in
        //server se kiem tra thoi gian va them vao danh sach ca sang/toi
        //Khi manager login, manager cung se can check in -> server se kiem tra thoi gian va lay list nhan vien tuy theo thoi gian.
        //Khi manager ca tim kiem thong tin nv
    };

    const handleChangeAvatar = () => {};

    const data = [1000, 2000];

    return (
        <StaffLayout roles={data}>
            <div className={cx('container')}>
                <div className={cx('main')}>
                    <div className={cx('main-avatar')}>
                        <Avatar big setting onClick={handleChangeAvatar} />
                        <span className={cx('check-in', { checkIn: true })}> Đã check in </span>
                    </div>
                    <div className={cx('main-info')}>
                        <div className={cx('main-info-title')}>Profile</div>
                        <div className={cx('main-info-content')}>
                            <Label title={'Tên đầy đủ'}>Kien Hoang</Label>
                            <Label title={'Email'}>KienHoang255@gmail.com</Label>
                            <Label title={'Số điện thoại'}>0967104479</Label>
                            <Label title={'Công việc'}>Bep truong</Label>
                            <Button onClick={handleOnRemove} className={cx('btn-auto-login')}>
                                Đã mặc định login
                            </Button>
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
        </StaffLayout>
    );
};

export default Info;
