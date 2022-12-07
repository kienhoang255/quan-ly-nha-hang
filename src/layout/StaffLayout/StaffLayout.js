import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './StaffLayout.module.scss';

import Avatar from '~/components/Avatar/Avatar';
import TextInput from '~/components/TextInput/TextInput';
import IconNotification from '~/components/IconNotification/IconNotification';
import Button from '~/components/Button/Button';

import { IoNotifications } from 'react-icons/io5';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import { getToLocalStorage } from '~/utils/saveToBrowser';
import { useStore } from '~/store';
import { getFood } from '~/services/food';
import { getTable } from '~/services/table';

const cx = classNames.bind(styles);

const StaffLayout = () => {
    const [state, dispatch] = useStore();
    const [isSideBar, setIsSideBar] = useState(false);
    const HandleOpenSideBar = () => {
        setIsSideBar(!isSideBar);
    };

    const ROLES = [];

    const isRoles = getToLocalStorage('user')?.job;
    const handleRoleAllow = () => {
        isRoles?.forEach((role) => {
            state?.PAGES?.forEach((aRole) => {
                if (role === aRole.id) ROLES.push(aRole);
            });
        });
    };

    handleRoleAllow();
    const user = getToLocalStorage('user');
    const data = [
        {
            title: 'Oke',
            main: 'Hop',
            time: '9h30',
        },
        {
            title: 'Oke',
            main: 'Hop',
            time: '9h30',
        },
    ];

    const handleOnPage = (e) => {
        ROLES?.forEach((role) => {
            if (role.id === e.id) {
                role.active = true;
            } else {
                role.active = false;
            }
        });
        setIsSideBar(false);
    };

    useEffect(() => {
        //Check food
        if (state.FOODS[0] === undefined) getFood(dispatch);
        //Check table
        if (state.TABLES[0] === undefined) getTable(dispatch);
    });

    return (
        <div className={cx('container', isSideBar ? 'open-side-bar' : 'close-side-bar')}>
            <div className={cx('nav-bar')}>
                <div className={cx('nav-bar-right')}>
                    <Link to="/info" style={{ textDecoration: 'none' }}>
                        <Avatar name={user?.username} />
                    </Link>
                    <IconNotification data={data} icon={<IoNotifications />} />
                    {/* <IconNotification data={data} icon={<RiMessageFill />} /> */}
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
            <div className={cx('side-bar', { openSideBar: isSideBar })}>
                <div className={cx('side-bar-content')}>
                    {ROLES.map((role) => {
                        return (
                            <Button
                                key={role.id}
                                to={role.path}
                                variant={'none'}
                                full
                                className={cx('btn', role.active ? 'active' : '123')}
                                onClick={() => {
                                    handleOnPage(role);
                                }}
                                style={{ textDecoration: 'none' }}
                                leftIcon={role.title}
                            >
                                {role.notify}
                            </Button>
                        );
                    })}
                </div>
            </div>
            <div className={cx('content')}>
                <Outlet />
            </div>
        </div>
    );
};

export default StaffLayout;
