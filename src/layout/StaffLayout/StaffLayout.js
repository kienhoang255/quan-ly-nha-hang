import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './StaffLayout.module.scss';

import { io } from 'socket.io-client';
import { Link, Outlet } from 'react-router-dom';
import { getToLocalStorage } from '~/utils/saveToBrowser';
import { actions, useStore } from '~/store';

import Avatar from '~/components/Avatar/Avatar';
import TextInput from '~/components/TextInput/TextInput';
import IconNotification from '~/components/IconNotification/IconNotification';
import Button from '~/components/Button/Button';

import { IoNotifications } from 'react-icons/io5';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { PAGES } from '~/routes';
import { getTableProvider } from '~/services/Table/tableProvider';

const cx = classNames.bind(styles);

const StaffLayout = () => {
    const [state, dispatch] = useStore();
    const [socket, setSocket] = useState();

    const [isSideBar, setIsSideBar] = useState(false);
    const HandleOpenSideBar = () => {
        setIsSideBar(!isSideBar);
    };

    const ROLES = [];

    const isRoles = getToLocalStorage('user')?.job;
    const handleRoleAllow = () => {
        state.USER.job?.forEach((role) => {
            PAGES.forEach((aRole) => {
                if (role === aRole.id) ROLES.push(aRole);
            });
        });
    };

    handleRoleAllow();
    const user = state.USER;
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
        setSocket(io('ws://localhost:8000', { autoConnect: false }));
    }, []);

    // useEffect(() => {
    //     socket?.on('table', (table) => {
    //         console.log(table);
    //     });
    // }, [socket]);
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
