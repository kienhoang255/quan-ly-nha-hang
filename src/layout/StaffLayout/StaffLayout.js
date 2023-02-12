import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './StaffLayout.module.scss';

import { Link, Outlet } from 'react-router-dom';
import { actions, useStore } from '~/store';

import Avatar from '~/components/Avatar/Avatar';
import TextInput from '~/components/TextInput/TextInput';
import IconNotification from '~/components/IconNotification/IconNotification';
import Button from '~/components/Button/Button';

import { IoNotifications } from 'react-icons/io5';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { PAGES } from '~/routes';
import Toast from '~/components/Toast';
import Logo from '~/components/Logo/Logo';

const cx = classNames.bind(styles);

const StaffLayout = () => {
    const [state, dispatch] = useStore();

    const [isSideBar, setIsSideBar] = useState(false);
    const HandleOpenSideBar = () => {
        setIsSideBar(!isSideBar);
    };

    const ROLES = [];

    const handleRoleAllow = () => {
        state.USER.job?.forEach((role) => {
            PAGES.forEach((aRole) => {
                if (role === aRole.id) ROLES.push(aRole);
            });
        });
    };

    handleRoleAllow();
    const user = state.USER;

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

    const handleCheckIconNotification = (e) => {};

    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState();

    useEffect(() => {
        let toastId;
        const triggerToast = () => {
            toastId = setTimeout(() => {
                setShowToast(false);
                dispatch(actions.setMessage({ message: '' }));
            }, 4000);
        };
        var clear = () => {
            clearTimeout(toastId);
        };
        if (toastId !== null) {
            toastId = null;
        } else clear();
        if (state.MESSAGE.message) {
            setShowToast(true);
            setMessage(state?.MESSAGE);
            triggerToast();
        }
    }, [dispatch, state.MESSAGE]);
    return (
        <div className={cx('container', isSideBar ? 'open-side-bar' : 'close-side-bar')}>
            <div className={cx('nav-bar')}>
                <div className={cx('nav-bar-right')}>
                    <Link to="/info" style={{ textDecoration: 'none' }}>
                        <Avatar useName name={user?.username} img={state.USER.avatar} />
                    </Link>
                    <IconNotification
                        data={state.NOTIFICATION}
                        icon={<IoNotifications />}
                        handleCheckIconNotification={handleCheckIconNotification}
                    />
                    {/* <IconNotification data={data} icon={<RiMessageFill />} /> */}
                </div>
                <div className={cx('nav-bar-left')}>
                    <div onClick={HandleOpenSideBar} className={cx('nav-bar-btn', isSideBar ? 'rotate' : 'rotated')}>
                        <FaBars />
                    </div>
                    <Button to="/home" variant="">
                        <Logo className={cx('logo')} />
                    </Button>
                    {/* <div className={cx('text-input')}>
                        <TextInput placeholder={'Search...'} notify={''} type="text" LeftIcon={<AiOutlineSearch />} />
                    </div> */}
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
            {showToast && <Toast message={message?.message} type={message?.typeMes} />}
            <div className={cx('content')}>
                <Outlet />
            </div>
        </div>
    );
};

export default StaffLayout;
