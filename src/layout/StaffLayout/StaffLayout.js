import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './StaffLayout.module.scss';

import Avatar from '~/components/Avatar/Avatar';
import TextInput from '~/components/TextInput/TextInput';
import IconNotification from '~/components/IconNotification/IconNotification';
import Button from '~/components/Button/Button';

import { IoNotifications } from 'react-icons/io5';
import { RiMessageFill } from 'react-icons/ri';
import { AiOutlineSearch, AiOutlineTable } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { MdFastfood, MdOutlineRoomService, MdPeopleAlt } from 'react-icons/md';

const cx = classNames.bind(styles);

const StaffLayout = ({ children, roles }) => {
    const [isSideBar, setIsSideBar] = useState(false);
    const HandleOpenSideBar = () => {
        setIsSideBar(!isSideBar);
    };

    const allowedFunction = [
        { id: 1000, to: '/order-list', title: <MdFastfood />, notify: 'Danh sách những món ăn đã đặt' },
        { id: 2000, to: '/list-table', title: <AiOutlineTable />, notify: 'Danh sách bàn' },
        { id: 3000, to: '/list-employee', title: <MdPeopleAlt />, notify: 'Danh sách nhân viên' },
        { id: 4000, to: '/order-service', title: <MdOutlineRoomService />, notiy: 'Danh sách phục vụ' },
    ];

    const ROLES = [];

    const handleRoleAllow = () => {
        roles.forEach((role) => {
            allowedFunction.forEach((aRole) => {
                if (role === aRole.id) ROLES.push(aRole);
            });
        });
    };
    handleRoleAllow();

    return (
        <div className={cx('container')} style={{ gridTemplateColumns: isSideBar ? '250px 1fr' : '1fr' }}>
            <div className={cx('nav-bar')}>
                <div className={cx('nav-bar-right')}>
                    <Avatar />
                    <IconNotification icon={<IoNotifications />} />
                    <IconNotification icon={<RiMessageFill />} />
                </div>
                <div className={cx('nav-bar-left')}>
                    <div onClick={HandleOpenSideBar} className={cx('nav-bar-btn', isSideBar ? 'rotate' : 'rotated')}>
                        <FaBars />
                    </div>
                    <div className={cx('text-input')}>
                        <TextInput placeholder={'Search...'} notify={''} type="text" LeftIcon={<AiOutlineSearch />} />
                    </div>
                </div>
            </div>
            <div className={cx('side-bar', { animate__bounceInUp: true }, { openSideBar: isSideBar })}>
                <div className={cx('side-bar-content')}>
                    {ROLES.map((role) => {
                        return (
                            <Button key={role.id} to={role.to} variant={'none'} full className={cx('btn')}>
                                {role.title}
                            </Button>
                        );
                    })}
                </div>
            </div>
            <div className={cx('content')}>{children}</div>
        </div>
    );
};

export default StaffLayout;
