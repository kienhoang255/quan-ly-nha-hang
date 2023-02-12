import React from 'react';
import classNames from 'classnames/bind';
import styles from './SelectPopup.module.scss';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

const SelectPopup = ({ children, usedAccount, onSelectAccount }) => {
    const accounts = [
        {
            name: 'admin',
            email: 'admin@gmail.com',
            password: '12341234',
        },
        {
            name: 'chef',
            email: 'chef@gmail.com',
            password: 'chef@gmail.com',
        },
    ];

    const usedAccountItems = usedAccount?.map((e, key) => (
        <div key={key} className={cx('accountItem')} onClick={() => onSelectAccount(e)}>
            <div>{e?.email}</div>
        </div>
    ));

    const accountItems = accounts.map((e, key) => (
        <div key={key} className={cx('accountItem')} onClick={() => onSelectAccount(e)}>
            <div className={cx('title')}>{e?.name}</div>
            <div>{e?.email}</div>
        </div>
    ));

    const contentTippy = (
        <div className={cx('content')}>
            <div className={cx('accountList')}>
                <div>Tài khoản gần đây</div>
                {usedAccountItems ? (
                    usedAccountItems
                ) : (
                    <div className={cx('accountItem')}>
                        <div>Trống</div>
                    </div>
                )}
            </div>
            <div className={cx('accountList')}>
                <div>Tài khoản mặc định</div>
                {accountItems}
            </div>
        </div>
    );

    return (
        <Tippy theme="main" interactive={true} placement="top-start" content={contentTippy}>
            {children}
        </Tippy>
    );
};

export default SelectPopup;
